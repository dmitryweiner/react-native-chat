import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {IMessage} from '../interfaces/message';
import React from 'react';

type MessageProps = {
  message: IMessage;
};

const Message: React.FC<MessageProps> = (props: MessageProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.author}>{props.message.authorNickname}</Text>
      <Text style={styles.date}>
        {props.message.creationDate.toLocaleString()}
      </Text>
      <Text style={styles.content}>{props.message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 5
  },
  author: {
    fontSize: 14,
    fontWeight: '700',
    color: 'darkgrey'
  },
  content: {
    color: 'black'
  },
  date: {
    fontSize: 11,
    color: 'lightgrey',
    fontStyle: 'italic'
  }
});

export default Message;
