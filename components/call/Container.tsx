import { CallType } from "@/app/types";
import { SET_END_CALL } from "@/store/storeSlices";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";
import { useDispatch } from "react-redux";

interface ContainerProps {
  data: CallType
}

const Container: React.FC<ContainerProps> = ({ data }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const dispatch = useDispatch();
  const endCall = () => {
    dispatch(SET_END_CALL({}))
  }
  return (
    <div className="absolute h-full w-full overflow-hidden bg-white z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-8">
        <span>{data?.user?.name}</span>
        <span>
          {callAccepted && data?.calltype !== "VIDEO"
            ? "On going call"
            : "calling"}
        </span>
      </div>
      {(!callAccepted || data?.calltype === "VOICE") && (
        <div className="my-24">
          <Image
            src={data?.user?.image || "/images/placeholder.jpg"}
            alt="avatar"
            height={300}
            width={300}
            className="rounded-full"
          />
        </div>
      )}
       <div
          onClick={endCall}
          className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full cursor-pointer text-white"
        >
          <MdOutlineCallEnd className="text-3xl" />
        </div>

    </div>
  );
};

export default Container;
