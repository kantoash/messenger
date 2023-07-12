"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import Toast from "./Toast";
import { SessionProvider } from "next-auth/react";
import VoiceCall from "./call/VoiceCall";
import VideoCall from "./call/VideoCall";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Toast />
       <VideoCall/>
       <VoiceCall/>
        {children}
      </SessionProvider>
    </Provider>
  );
}
