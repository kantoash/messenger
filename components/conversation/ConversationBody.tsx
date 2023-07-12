"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "../input/MessageBox";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { find } from "lodash";

interface ConversationBodyProps {
  initialMessages: FullMessageType[];
}

const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages,
}) => {
  const { conversationId } = useConversation()
  const [messages, setMessages] = useState<FullMessageType[] | []>(
    initialMessages
  );
  const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      axios.post(`/api/conversations/${conversationId}/seen`)
    },[conversationId])

    useEffect(() => {
      pusherClient.subscribe(conversationId)
      bottomRef?.current?.scrollIntoView();
  
      const messageHandler = (message: FullMessageType) => {
        axios.post(`/api/conversations/${conversationId}/seen`);
  
        setMessages((current) => {
          if (find(current, { id: message.id })) {
            return current;
          }
  
          return [...current, message]
        });
        
        bottomRef?.current?.scrollIntoView();
      };
  
      const updateMessageHandler = (newMessage: FullMessageType) => {
        setMessages((current) => current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }
    
          return currentMessage;
        }))
      };
    
  
      pusherClient.bind('messages:new', messageHandler)
      pusherClient.bind('message:update', updateMessageHandler);
  
      return () => {
        pusherClient.unsubscribe(conversationId)
        pusherClient.unbind('messages:new', messageHandler)
        pusherClient.unbind('message:update', updateMessageHandler)
      }
    }, [conversationId]);
    
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox data={message} key={i} isLast={i === messages.length - 1} />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default ConversationBody;
