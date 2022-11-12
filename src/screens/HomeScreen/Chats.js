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
      {usersMatchNew.length > 0 && (
        <Text style={styles.titleMatches}>New Matches</Text>
      )}
      <ScrollView
        style={styles.containerSlideUser}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {usersMatchNew.length > 0 &&
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
          ))}
      </ScrollView>
      <View>
        {usersHaveMessage.length > 0 && (
          <Text style={styles.titleMatches}>Messages</Text>
        )}
        {usersHaveMessage.length > 0 &&
          usersHaveMessage.map(user => (
            <ChatRow
              key={user.uid}
              userMatched={user}
              profile={profile}
              navigation={navigation}
            />
          ))}
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
});
