import {ScrollView, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {IMessage} from '../interfaces/message';
import React from 'react';

type MessagesListProps = {
  messages: Array<IMessage>;
};

const MessagesList: React.FC<MessagesListProps> = (
  props: MessagesListProps
) => {
  const Message = (message: IMessage) => (
    <View>
      <Text>{message.content}</Text>
    </View>
  );

  if (!props.messages) {
    return null;
  }

  return (
    <ScrollView>
      {props.messages.map((message) => (
        <Message {...message} />
      ))}
    </ScrollView>
  );
};

export default MessagesList;
