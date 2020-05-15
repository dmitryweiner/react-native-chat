import {IChat} from '../interfaces/chat';
import React from 'react';
import ChatItem from './ChatItem';
import {List} from '@ui-kitten/components';

export interface ChatsListProps {
  chats: Array<IChat>;
}

const ChatsList: React.FC<ChatsListProps> = (props: ChatsListProps) => {
  const renderItem = ({item}: {item: IChat}) => <ChatItem chat={item} />;

  if (!props.chats) {
    return null;
  }
  return <List data={props.chats} renderItem={renderItem} />;
};

export default ChatsList;
