'use client'

import { RootState } from "@/store";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const Container = dynamic(() => import("./Container"), { ssr: false });

const VoiceCall = () => {
  const { VOICE_CALL } = useSelector((state: RootState) => state.counter);
  
  return !!VOICE_CALL && (
    <Container data={VOICE_CALL} />
  )
}

export default VoiceCall