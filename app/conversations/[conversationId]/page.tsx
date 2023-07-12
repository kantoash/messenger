import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import ConversationBody from "@/components/conversation/ConversationBody";
import ConversationForm from "@/components/conversation/ConversationForm";
import ConversationHeader from "@/components/conversation/ConversationHeader";
import React from "react";

interface IParams {
  conversationId: string;
}

const page = async ({ params }: { params: IParams }) => {

  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="hidden lg:block lg:pl-80 h-full">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full ">
        <div className="h-full flex flex-col pb-12 lg:pb-0">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages} />
        <ConversationForm/>
        </div>
    </div>
  )
};

export default page;
