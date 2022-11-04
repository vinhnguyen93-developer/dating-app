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
import {getUserMatches} from '../../redux/actions/chats';

import {selectorProfile} from '../../redux/reducers/auth';
import {selectorUserMatches} from '../../redux/reducers/chats';

const data = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Vân',
    message: 'Hello',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Phương',
    message: 'Nice too meet you',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Ngoc',
    message: 'Where do you live?',
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/902030/pexels-photo-902030.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Diệu Trúc',
    message: 'Hi :))',
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/884979/pexels-photo-884979.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Linda',
    message: 'How are you?',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/1557843/pexels-photo-1557843.jpeg?auto=compress&cs=tinysrgb&w=800',
    name: 'Linda',
    message: 'How are you?',
  },
];

const ChatsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(selectorProfile);
  const usersMatches = useSelector(selectorUserMatches);

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
        {usersMatches.length > 0 &&
          usersMatches.map(user => (
            <Pressable key={user.uid} style={styles.containerImage}>
              <View style={styles.wrapImage}>
                <Image
                  source={{
                    uri: user.photoUrl[0],
                  }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.userName}>{user.firstName}</Text>
            </Pressable>
          ))}
      </ScrollView>
      <View>
        <Text style={styles.titleMatches}>Messages</Text>
        {data.map(item => (
          <Pressable key={item.id} style={styles.containerChat}>
            <View style={styles.wrapAvatar}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.chatTitle}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </Pressable>
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
