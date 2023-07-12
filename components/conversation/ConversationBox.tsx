'use client'


import React, { useCallback, useMemo } from 'react'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import AvatarGroup from '../input/AvatarGroup'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { User } from '@prisma/client'
import Avatar from '../input/Avatar'
import { format } from 'date-fns'

interface ConversationBoxProps {
  conversation: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  conversation,
  selected
}) => {
  const otherUser = useOtherUser(conversation);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${conversation.id}`);
  }, [conversation.id, router]);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];
    return messages[messages.length - 1];
  }, [conversation.messages]);

  const userEmail = useMemo(() => session.data?.user?.email,
  [session.data?.user?.email]);
  
  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray
      .filter((user:User) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image';
    }

    if (lastMessage?.body) {
      return lastMessage?.body
    }

    return 'Started a conversation';
  }, [lastMessage]);


  return ( 
    <div
      onClick={handleClick}
      className={twMerge(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-200
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? 'bg-neutral-200' : 'bg-white'
      )}
    >
      {conversation.isGroup ? (
        <AvatarGroup users={conversation.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {conversation.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={twMerge(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox