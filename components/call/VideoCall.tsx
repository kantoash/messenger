"use client";

import { RootState } from "@/store";
import dynamic from "next/dynamic";
import React from "react";
import { useSelector } from "react-redux";
const Container = dynamic(() => import("./Container"), { ssr: false });

const VideoCall = () => {
  const { VIDEO_CALL } = useSelector((state: RootState) => state.counter);
  console.log(VIDEO_CALL);
  
  return (
    !!VIDEO_CALL && (
      <div>
        <Container data={VIDEO_CALL} />
      </div>
    )
  );
};

export default VideoCall;
