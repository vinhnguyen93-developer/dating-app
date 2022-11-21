import React, {useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ChatRow from '../../components/ChatRow';
import {getUserMatches} from '../../redux/actions/chats';
import {selectorProfile} from '../../redux/reducers/auth';
import {selectorUserMatches} from '../../redux/reducers/chats';

const ChatsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectorProfile);
  const usersMatches = useSelector(selectorUserMatches);

  const usersMatchNew = usersMatches.filter(user => user.isNewMatch === true);
  const usersHaveMessage = usersMatches.filter(
    user => user.isNewMatch === false,
  );

  useEffect(() => {
    dispatch(getUserMatches(profile?.uid));
  }, [profile, dispatch]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleMatches}>New Matches</Text>
      <ScrollView
        style={styles.containerSlideUser}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {usersMatchNew.length > 0 ? (
          usersMatchNew.map(user => (
            <Pressable
              onPress={() =>
                navigation.navigate('Message', {
                  userMatched: user,
                  profile: profile,
                })
              }
              key={user.uid}
              style={styles.containerImage}>
              <View style={styles.wrapImage}>
                <Image
                  source={{
                    uri: user?.photoUrl[0],
                  }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.userName}>{user.firstName}</Text>
            </Pressable>
          ))
        ) : (
          <View style={styles.wrapNoMatches}>
            <Image
              source={require('../../assets/images/broken-heart.png')}
              style={styles.imageNoMatches}
            />
            <Text style={styles.emptyMessageContent}>
              You don't have new matches
            </Text>
          </View>
        )}
      </ScrollView>
      <View>
        <Text style={styles.titleMatches}>Messages</Text>

        {usersHaveMessage.length > 0 ? (
          usersHaveMessage.map(user => (
            <ChatRow
              key={user.uid}
              userMatched={user}
              profile={profile}
              navigation={navigation}
            />
          ))
        ) : (
          <View style={styles.emptyMessageContainer}>
            <Image
              source={require('../../assets/images/chat.png')}
              style={styles.imageChatEmpty}
            />
            <Text style={styles.emptyMessageTitle}>Say Hello</Text>
            <Text style={styles.emptyMessageContent}>
              Tap on a new match above to send a message
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    width: '100%',
    paddingLeft: 14,
  },
  titleMatches: {
    color: '#fe3a85',
    fontWeight: '500',
  },
  containerSlideUser: {
    marginTop: 8,
    marginBottom: 20,
  },
  containerImage: {
    alignItems: 'center',
    marginRight: 12,
  },
  wrapImage: {
    width: 90,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  userName: {
    color: '#21262e',
    marginTop: 4,
    fontWeight: '600',
  },
  containerChat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapAvatar: {
    width: 74,
    height: 74,
    marginVertical: 8,
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  chatTitle: {
    flexGrow: 1,
    borderBottomWidth: 0.5,
    borderColor: '#d4d8de',
    height: 90,
  },
  chatName: {
    fontSize: 19,
    fontWeight: '600',
    paddingTop: 20,
    paddingBottom: 6,
  },
  message: {
    color: '#505965',
    fontSize: 17,
  },
  emptyMessageContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  imageChatEmpty: {
    width: 200,
    height: 200,
  },
  imageNoMatches: {
    width: 80,
    height: 80,
  },
  emptyMessageTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#21262e',
    marginTop: 10,
  },
  emptyMessageContent: {
    fontSize: 16,
    color: '#505965',
    marginTop: 5,
    width: 250,
    textAlign: 'center',
  },
  wrapNoMatches: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});
