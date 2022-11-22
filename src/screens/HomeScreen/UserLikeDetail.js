import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LogBox,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';

import Tag from '../../components/Tag';
import {swipeLeft, swipeRight} from '../../redux/actions/user';

const {width} = Dimensions.get('window');
const height = (width * 100) / 80;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const UserLikeDetail = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const {userLikeProfile, myProfile} = route.params;

  const [imageActive, setImageActive] = useState(0);

  const handleChangeImage = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    if (slide !== imageActive) {
      setImageActive(slide);
    }
  };

  const handleSwipeLeft = () => {
    dispatch(swipeLeft(userLikeProfile, myProfile.uid));
    navigation.goBack();
  };

  const handleSwipeRight = () => {
    dispatch(swipeRight(userLikeProfile, myProfile, navigation));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Animatable.View animation="slideInUp" style={styles.containerImage}>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={event => handleChangeImage(event)}
          scrollEventThrottle={event => console.log(event)}
          style={styles.wrapImage}
          showsHorizontalScrollIndicator={false}>
          {userLikeProfile.photoUrl.map((image, index) => (
            <Image key={index} source={{uri: image}} style={{width, height}} />
          ))}
        </ScrollView>
        {userLikeProfile?.photoUrl.length > 1 && (
          <View style={styles.wrapProgressBar}>
            {userLikeProfile.photoUrl.map((image, index) => (
              <View
                key={index}
                style={[
                  styles.progressBar,
                  imageActive === index
                    ? styles.barActive
                    : styles.barNoneActive,
                ]}
              />
            ))}
          </View>
        )}

        <Pressable onPress={() => navigation.goBack()}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#ff948f', '#fe3a85']}
            style={styles.buttonClose}>
            <FontAwesome5Icon
              name="arrow-down"
              size={18}
              color={'#fff'}
              solid
            />
          </LinearGradient>
        </Pressable>
      </Animatable.View>
      <View style={styles.contentContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textName}>{userLikeProfile.firstName}</Text>
            <Text style={styles.textAge}>{userLikeProfile.ages}</Text>
          </View>
        </View>

        <View style={styles.boxContainer}>
          <View style={[styles.rowContainer, styles.mb]}>
            <FontAwesome5Icon name={'home'} size={16} color={'#505965'} />
            <Text style={[styles.textColor, styles.ml_4, styles.textSize18]}>
              {`Live in ${userLikeProfile.city}`}
            </Text>
          </View>

          {userLikeProfile?.jobTitle && (
            <View style={[styles.rowContainer, styles.mb]}>
              <FontAwesome5Icon name={'suitcase'} size={16} color={'#505965'} />
              <Text style={[styles.textColor, styles.ml_4, styles.textSize18]}>
                {`${userLikeProfile.jobTitle} ${
                  userLikeProfile?.company ? 'at' : ''
                } ${userLikeProfile?.company}`}
              </Text>
            </View>
          )}

          {userLikeProfile?.school && (
            <View style={styles.rowContainer}>
              <FontAwesome5Icon
                name={'graduation-cap'}
                size={14}
                color={'#505965'}
              />
              <Text style={[styles.textColor, styles.ml_4, styles.textSize18]}>
                {userLikeProfile?.school}
              </Text>
            </View>
          )}

          {userLikeProfile?.jobTitle && (
            <View style={[styles.rowContainer, styles.mb]}>
              <FontAwesome5Icon name={'suitcase'} size={16} color={'#505965'} />
              <Text style={[styles.textColor, styles.ml_4, styles.textSize18]}>
                {`${userLikeProfile.jobTitle} ${
                  userLikeProfile?.company ? 'at' : ''
                } ${userLikeProfile?.company}`}
              </Text>
            </View>
          )}

          {userLikeProfile?.school && (
            <View style={styles.rowContainer}>
              <FontAwesome5Icon
                name={'graduation-cap'}
                size={14}
                color={'#505965'}
              />
              <Text style={[styles.textColor, styles.ml_4, styles.textSize18]}>
                {userLikeProfile?.school}
              </Text>
            </View>
          )}
        </View>

        {userLikeProfile?.aboutMe && (
          <>
            <View style={styles.boxContainer}>
              <View>
                <Text style={[styles.textTitle, styles.mt_10]}>About Me</Text>
                <Text style={styles.textContent}>
                  {userLikeProfile.aboutMe}
                </Text>
              </View>
            </View>

            <View style={styles.line} />
          </>
        )}

        <View style={styles.boxContainer}>
          <View>
            <Text style={[styles.textTitle, styles.mt_10]}>My Interests</Text>
            <View style={styles.containerTags}>
              {userLikeProfile?.tags.map(tag => (
                <View key={tag.id} style={styles.wrapTag}>
                  <Tag
                    tagName={tag.name}
                    active={myProfile?.tags.some(item => item.id === tag.id)}
                    solid={false}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.line} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSwipeLeft}
            style={[styles.buttonNope, styles.boxShadow]}>
            <Feather name={'x'} size={30} color={'#FF3985'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSwipeRight}
            style={[styles.buttonLike, styles.boxShadow]}>
            <FontAwesome5Icon
              name={'heart'}
              size={24}
              color={'#14F68A'}
              solid
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserLikeDetail;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: '12%',
  },
  containerImage: {
    width,
    height,
  },
  wrapImage: {
    width,
    height,
  },
  wrapProgressBar: {
    position: 'absolute',
    top: 10,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  progressBar: {
    borderWidth: 1.4,
    marginHorizontal: 4,
    borderRadius: 4,
    width: 100,
  },
  barActive: {
    borderColor: '#fff',
  },
  barNoneActive: {
    borderColor: '#333',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  boxContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  textName: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  textAge: {
    fontSize: 26,
    marginLeft: 8,
    color: '#21262e',
  },
  textColor: {
    color: '#505965',
  },
  ml_4: {
    marginLeft: 10,
  },
  mb: {
    marginBottom: 4,
  },
  textSize18: {
    fontSize: 18,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  textContent: {
    marginTop: 10,
    fontSize: 18,
    color: '#505965',
    lineHeight: 26,
  },
  mt_10: {
    marginTop: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d8de',
  },
  buttonClose: {
    paddingHorizontal: 20,
    paddingVertical: 19,
    borderRadius: 50,
    position: 'absolute',
    right: 15,
    bottom: -10,
    zIndex: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 3,
    marginTop: 30,
  },
  buttonLike: {
    backgroundColor: '#fff',
    borderRadius: 27,
    padding: 14,
  },
  buttonNope: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 11,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  containerTags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },
  wrapTag: {
    marginRight: 8,
    marginBottom: 8,
  },
});
