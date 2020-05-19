import {IChat} from '../interfaces/chat';
import React from 'react';
import {Button, ListItem} from '@ui-kitten/components';
import {IUser} from '../interfaces/user';

export interface ChatItemProps {
  chat: IChat;
  viewHandler: any;
  joinHandler: any;
  user: IUser | undefined;
}

const ChatItem: React.FC<ChatItemProps> = (props: ChatItemProps) => {
  const renderItemAccessory = () => {
    if (props.chat.participants.find((user) => props.user?.id === user.id)) {
      return (
        <Button size="tiny" onPress={() => props.viewHandler(props.chat.id)}>
          view
        </Button>
      );
    } else {
      return (
        <Button
          size="tiny"
          status="success"
          onPress={() => props.joinHandler(props.chat.id)}>
          join
        </Button>
      );
    }
  };

  return (
    <ListItem title={props.chat.title} accessoryRight={renderItemAccessory} />
  );
};

export default ChatItem;
