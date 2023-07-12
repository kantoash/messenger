"use client";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { BsEmojiSmile, BsMic } from "react-icons/bs";
import Picker from 'emoji-picker-react';
import dynamic from 'next/dynamic';
const CaptureAudio = dynamic(() => import("../input/CaptureAudio"), { ssr: false });

const MessageForm = () => {
  const { conversationId } = useConversation();
  const [message, setMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAudioRecorder, setShowAudioRecorder] = useState(false);

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  const handleEmojiClick = (emoji: any) => {
    setMessage((prevMessage) => (prevMessage += emoji.emoji));
  };

  const messageSubmit = () => {
    if (!message.length) {
      return;
    }
    axios.post("/api/messages", {
      message,
      conversationId: conversationId,
    });
    setMessage("");
  };

  return (
  <>
    <div
      className="
      py-4 
      px-4 
      bg-white 
      border-t 
      border-gray-300
      flex 
      items-center 
      gap-2 
      lg:gap-4 
      w-full
      overflow-hidden
      relative
    "
    >
      <div className="flex items-center gap-x-4">
        <div onClick={() => setShowEmojiPicker(true)} className="cursor-pointer text-xl">
          <BsEmojiSmile />
        </div>
        <CldUploadButton
          options={{
            maxFiles: 1,
          }}
          onUpload={handleUpload}
          uploadPreset="wk0ukflg"
        >
          <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
        <div  onClick={() => setShowAudioRecorder(true)}>
          <BsMic
            className="cursor-pointer text-xl"/>
        </div>
      </div>
      <form
        onSubmit={messageSubmit}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <div className="relative w-full">
          <input
            type="text"
            className=" text-black
          font-light
          py-2
          px-4
          text-lg
          bg-neutral-100 
          w-full 
          rounded-full
          focus:outline-none"
          required
            placeholder="Write a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-16 z-40">
          <Picker
            height={300}
            width={300}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
      {showAudioRecorder && (
        <CaptureAudio
          onClose={() => setShowAudioRecorder(false)}
        />
      )}
    </div></>
  );
};

export default MessageForm;
