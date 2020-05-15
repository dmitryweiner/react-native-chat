import {IChat} from '../interfaces/chat';
import {View, Text} from 'react-native';
import React from 'react';

export interface ChatItemProps {
  chat: IChat;
}

const ChatItem: React.FC<ChatItemProps> = (props: ChatItemProps) => {
  return (
    <View>
      {/* Here should be link to chat or something */}
      <Text>{props.chat.title}</Text>
    </View>
  );
};

export default ChatItem;
