import React, {useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMessage} from '../../redux/actions/message';
import {selectorMessage} from '../../redux/reducers/message';

const ChatRow = ({userMatched, profile, navigation}) => {
  const dispatch = useDispatch();

  const messages = useSelector(selectorMessage);

  useEffect(() => {
    dispatch(getMessage(userMatched?.matchId));
  }, [dispatch, userMatched?.matchId]);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Message', {
          userMatched: userMatched,
          profile: profile,
          lastMessage: messages[0],
        })
      }
      key={userMatched.uid}
      style={styles.containerChat}>
      <View style={styles.wrapAvatar}>
        <Image
          source={{
            uri: userMatched?.photoUrl[0],
          }}
          style={styles.avatar}
        />
        <View
          style={
            messages[0]?.user._id !== profile?.uid &&
            messages[0]?.user.received === true &&
            styles.unRead
          }
        />
      </View>
      <View style={styles.chatTitle}>
        <Text style={styles.chatName}>{userMatched.firstName}</Text>
        <Text style={styles.message}>{messages[0]?.text}</Text>
      </View>
    </Pressable>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  containerChat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapAvatar: {
    width: 74,
    height: 74,
    marginVertical: 8,
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  unRead: {
    padding: 6,
    backgroundColor: '#ff4458',
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    right: -6,
    top: 26,
  },
  chatTitle: {
    flexGrow: 1,
    borderBottomWidth: 0.5,
    borderColor: '#d4d8de',
    height: 90,
  },
  chatName: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 6,
    color: '#21262e',
  },
  message: {
    color: '#505965',
    fontSize: 16,
  },
});
