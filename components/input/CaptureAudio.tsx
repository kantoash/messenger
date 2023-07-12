"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaPauseCircle, FaPlay, FaStop } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { MdSend } from "react-icons/md";
import { blob } from "stream/consumers";
import WaveSurfer from "wavesurfer.js";

interface CaptureAudioProps {
  onClose: () => void;
}

const CaptureAudio: React.FC<CaptureAudioProps> = ({ onClose }) => {
  const { conversationId } = useConversation();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false); //
  const [waveform, setWaveForm] = useState<WaveSurfer>();
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currentPlayBackTime, setCurrentPlayBackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [renderedAudio, setRenderedAudio] = useState<File | null>(null);

  const audioRef = useRef<any>(null);
  const mediaRecordedRed = useRef<any>(null);
  const waveFormRef = useRef<any>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveForm(wavesurfer);
    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });
    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveform) {
      handleStartRecording();
    }
  }, [waveform]);

  const handleStartRecording = () => {
    setRecordingDuration(0);
    setCurrentPlayBackTime(0);
    setTotalDuration(0);
    setIsRecording(true);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecordedRed.current = mediaRecorder;
        audioRef.current.srcOhject = stream;
        const chunks: any[] = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);
          waveform?.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecordedRed.current && isRecording) {
      mediaRecordedRed.current.stop();
      setIsRecording(false);
      waveform?.stop();
      const audioChunks: any[] = [];
      mediaRecordedRed.current.addEventListener(
        "dataavailable",
        (event: any) => {
          audioChunks.push(event.data);
        }
      );

      mediaRecordedRed.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrentPlayBackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform?.stop();
      waveform?.play();
      recordedAudio.play();
      setIsPlaying(true);
    }
  };

  const handlePauseRecording = () => {
    waveform?.stop();
    recordedAudio?.pause();
    setIsPlaying(false);
  };

  const sendRecording = async () => {
    if (!renderedAudio) {
      return;
    }
    const formdata = new FormData();
    formdata.append("audio", renderedAudio);

    
    const response = await axios.post("/api/messages", {
      message: formdata,
      conversationId: conversationId,
    });

    
  };

  const formatTime = (time: any) => {
    if (!time) {
      return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="absolute flex w-full h-full items-center justify-between z-40 px-5 py-2 bg-white text-black">
      <div onClick={onClose} className="cursor-pointer">
        <FiTrash className="text-xl" />
      </div>
      <div className="py-2 px-4 flex gap-x-3 justify-center items-center">
        {isRecording ? (
          <div className="text-red-400 animate-pulse text-center">
            Recording: <span>{recordingDuration}</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay
                    className="text-xl cursor-pointer"
                    onClick={handlePlayRecording}
                  />
                ) : (
                  <FaStop
                    className="text-xl cursor-pointer"
                    onClick={handlePauseRecording}
                  />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" ref={waveFormRef} hidden={isRecording} />
        {recordedAudio && isPlaying && (
          <span>{formatTime(currentPlayBackTime)}</span>
        )}
        {recordedAudio && !isPlaying && (
          <span>{formatTime(totalDuration)}</span>
        )}
        <audio ref={audioRef} hidden />
        <div className="mr-4">
          {!isRecording ? (
            <FaMicrophone
              className="text-red-500 text-xl"
              onClick={handleStartRecording}
            />
          ) : (
            <FaPauseCircle
              className="text-red-500 text-xl"
              onClick={handleStopRecording}
            />
          )}
        </div>
        <div
          className="bg-neutral-500 p-2 rounded-full
         hover:bg-neutral-600 text-white transition cursor-pointer"
        >
          <MdSend className="text-lg" onClick={sendRecording} />
        </div>
      </div>
    </div>
  );
};

export default CaptureAudio;
