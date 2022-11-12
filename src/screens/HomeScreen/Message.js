import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';

import RenderChatEmpty from '../../components/RenderChatEmpty';
import {updateReadMessage, updateUserHaveMessage} from '../../lib/message';
import {getMessage, sendMessage} from '../../redux/actions/message';
import {selectorMessage} from '../../redux/reducers/message';

const MessageScreen = ({route, navigation}) => {
  const dispatch = useDispatch();

  const messageFirebase = useSelector(selectorMessage);

  const {userMatched, profile, lastMessage} = route.params;
  const [messages, setMessages] = useState(messageFirebase);

  useEffect(() => {
    dispatch(getMessage(userMatched?.matchId));
  }, [dispatch, userMatched?.matchId]);

  useEffect(() => {
    setMessages(messageFirebase);
  }, [messageFirebase]);

  useMemo(() => {
    if (lastMessage?.user.received === true) {
      updateReadMessage(userMatched?.matchId, lastMessage?.messageId);
    } else {
      return;
    }
  }, [lastMessage, userMatched]);

  const onSend = useCallback(
    (message = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, message),
      );

      dispatch(sendMessage(userMatched?.matchId, message[0]));
      updateUserHaveMessage(userMatched?.matchId);
    },
    [dispatch, userMatched?.matchId],
  );

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
        alwaysShowSend={true}
        isLoadingEarlier
        messagesContainerStyle={styles.containerGiftedChat}
        messages={messages}
        onSend={message => onSend(message)}
        renderChatEmpty={() => <RenderChatEmpty userMatched={userMatched} />}
        onPressAvatar={() =>
          navigation.navigate('User view', {
            userMatched,
            profile,
          })
        }
        renderBubble={renderBubble}
        user={{
          _id: profile?.uid,
          name: profile?.firstName,
          avatar: profile?.photoUrl[0],
          sent: true,
          received: true,
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
