import {IChat} from '../interfaces/chat';
import React from 'react';
import {Button, ListItem} from '@ui-kitten/components';

export interface ChatItemProps {
  chat: IChat;
  viewHandler: any;
}

const ChatItem: React.FC<ChatItemProps> = (props: ChatItemProps) => {
  const renderItemAccessory = () => (
    <Button size="tiny" onPress={() => props.viewHandler(props.chat.id)}>
      view
    </Button>
  );

  return (
    <ListItem title={props.chat.title} accessoryRight={renderItemAccessory} />
  );
};

export default ChatItem;
