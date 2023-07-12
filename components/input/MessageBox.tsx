"use client";

import { FullMessageType } from "@/app/types";
import { useSession } from "next-auth/react";
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import React, { useState } from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import ImageModal from "../modal/ImageModal";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const isOwn = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");
    const container = twMerge('flex gap-3 p-3', isOwn && 'justify-end')
    const avatar = twMerge(isOwn && 'order-2')
    const body = twMerge('flex flex-col gap-2', isOwn && 'items-end');
    const message = twMerge('text-sm w-fit overflow-hidden', isOwn ? 'bg-sky-500 text-white' : 'bg-gray-200', data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3')
    
  return (
    <div className={container}>
    <div className={avatar}>
      <Avatar user={data.sender} />
    </div>
    <div className={body}>
      <div className="flex items-center gap-1">
        <div className="text-sm text-gray-500">
          {data.sender.name}
        </div>
        <div className="text-xs text-gray-400">
          {format(new Date(data.createdAt), 'p')}
        </div>
      </div>
      <div className={message}>
        <ImageModal imageSrc={data.image!} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
        {data.image ? (
          <Image
            alt="Image"
            height="288"
            width="288"
            onClick={() => setImageModalOpen(true)} 
            src={data.image} 
            className="
              object-cover 
              cursor-pointer 
              hover:scale-110 
              transition 
              translate
            "
          />
        ) : (
          <div>{data.body}</div>
        )}
      </div>
      {isLast && isOwn && seenList.length > 0 && (
        <div 
          className="
          text-xs 
          font-light 
          text-gray-500
          "
        >
          {`Seen by ${seenList}`}
        </div>
      )}
    </div>
  </div>
  )
};

export default MessageBox;
