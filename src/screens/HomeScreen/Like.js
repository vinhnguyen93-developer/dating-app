import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {selectorUser} from '../../redux/reducers/user';
import {selectorProfile} from '../../redux/reducers/auth';
import {getUserLikeMe} from '../../redux/actions/user';

const LikeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const profile = useSelector(selectorProfile);
  const {users, userLikeMe} = useSelector(selectorUser);

  const [uniqueUsers, setUniqueUsers] = useState([]);

  useEffect(() => {
    dispatch(getUserLikeMe(users, profile?.uid));
  }, [users, profile, dispatch]);

  useEffect(() => {
    if (userLikeMe.length > 0) {
      const uniqueUser = userLikeMe.filter((user, index, self) => {
        return index === self.findIndex(item => item.uid === user.uid);
      });

      setUniqueUsers(uniqueUser);
    }
  }, [userLikeMe]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapLikeTitle}>
        <Text style={styles.textLike}>{`${userLikeMe.length} Likes`}</Text>
      </View>
      <ScrollView>
        {uniqueUsers.length > 0 ? (
          <View style={styles.contentContainer}>
            {uniqueUsers.map(user => (
              <Pressable
                onPress={() =>
                  navigation.navigate('User like detail', {
                    userLikeProfile: user,
                    myProfile: profile,
                  })
                }
                key={user.uid}
                style={styles.boxContainer}>
                <Image source={{uri: user.photoUrl[0]}} style={styles.image} />
                <View style={styles.wrapUserInfo}>
                  <Text
                    style={[
                      styles.textColor,
                      styles.textName,
                    ]}>{`${user.firstName},`}</Text>
                  <Text style={styles.textColor}>{user.ages}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <Text>Hello</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
  },
  wrapLikeTitle: {
    marginTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d4d8de',
  },
  textLike: {
    color: '#21262e',
    fontSize: 20,
    fontWeight: '600',
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  boxContainer: {
    width: 180,
    height: 225,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  wrapUserInfo: {
    position: 'absolute',
    bottom: 8,
    flexDirection: 'row',
    marginLeft: 10,
  },
  textColor: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  textName: {
    marginRight: 4,
  },
});
