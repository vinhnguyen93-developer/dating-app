import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';

import RenderChatEmpty from '../../components/RenderChatEmpty';

const MessageScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const {userMatched} = route.params;

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const onSend = useCallback((message = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#e9ebee',
        },
      }}
      textStyle={{
        left: {
          color: '#21262e',
        },
      }}
    />
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        wrapInSafeArea={false}
        messagesContainerStyle={styles.containerGiftedChat}
        messages={messages}
        onSend={message => onSend(message)}
        renderChatEmpty={() => <RenderChatEmpty userMatched={userMatched} />}
        renderBubble={renderBubble}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  containerGiftedChat: {
    backgroundColor: '#fff',
  },
});
