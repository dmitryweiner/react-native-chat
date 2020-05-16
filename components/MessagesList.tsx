import {ScrollView, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {IMessage} from '../interfaces/message';
import React from 'react';
import Message from './Message';

type MessagesListProps = {
  messages: Array<IMessage>;
};

const MessagesList: React.FC<MessagesListProps> = (
  props: MessagesListProps
) => {
  if (!props.messages) {
    return null;
  }

  return (
    <>
      {props.messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </>
  );
};

export default MessagesList;
