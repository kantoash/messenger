import {  Conversation, Message, User } from "@prisma/client";
import { String } from "lodash";

export type FullMessageType = Message & {
  sender: User, 
  seen: User[]
};

export type FullConversationType = Conversation & { 
  users: User[]; 
  messages: FullMessageType[]
};

export type CallType = {
  user: User;
  type: string;
  calltype: string;
  roomId: number;
} | undefined