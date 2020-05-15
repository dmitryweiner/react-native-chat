import {IChat} from '../interfaces/chat';
import {ScrollView, Text} from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';

export interface ChatsListProps {
  chats: Array<IChat>;
}

const ChatsList: React.FC<ChatsListProps> = (props: ChatsListProps) => {
  return (
    <ScrollView>
      {props.chats &&
        props.chats.map((chat: IChat) => <ChatItem chat={chat} />)}
    </ScrollView>
  );
};

export default ChatsList;
