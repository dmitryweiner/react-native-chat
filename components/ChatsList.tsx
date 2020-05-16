import {IChat} from '../interfaces/chat';
import React from 'react';
import ChatItem from './ChatItem';
import {Layout, List} from '@ui-kitten/components';
import {IUser} from '../interfaces/user';

export interface ChatsListProps {
  chats: Array<IChat>;
  viewHandler: Function;
  joinHandler?: Function;
  user: IUser | undefined;
}

const ChatsList: React.FC<ChatsListProps> = (props: ChatsListProps) => {
  const renderItem = ({item}: {item: IChat}) => (
    <ChatItem
      chat={item}
      viewHandler={props.viewHandler}
      joinHandler={props.joinHandler}
      user={props.user}
    />
  );

  if (!props.chats) {
    return null;
  }
  return (
    <Layout level="1">
      <List data={props.chats} renderItem={renderItem} />
    </Layout>
  );
};

export default ChatsList;
