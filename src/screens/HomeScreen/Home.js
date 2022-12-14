import React, {useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-deck-swiper';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';

import {selectorProfile} from '../../redux/reducers/auth';
import {
  getUsers,
  getUsersSpecial,
  swipeLeft,
  swipeRight,
} from '../../redux/actions/user';
import {selectorUser} from '../../redux/reducers/user';
import Tag from '../../components/Tag';
import * as actionTypes from '../../redux/types';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const swipeRef = useRef(null);

  const profile = useSelector(selectorProfile);
  const {users} = useSelector(selectorUser);

  const [loading, setLoading] = useState(true);
  const [indexImage, setIndexImage] = useState(0);

  useEffect(() => {
    dispatch(getUsers(profile?.city, profile?.gender_expect, profile?.uid));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [dispatch, profile]);

  useEffect(() => {
    dispatch(
      getUsersSpecial(profile?.city, profile?.gender_expect, profile?.uid),
    );
  }, [dispatch, profile]);

  return (
    <>
      <View style={styles.container}>
        <Swiper
          ref={swipeRef}
          cards={users}
          renderCard={card =>
            card ? (
              <View key={card.uid} style={styles.card}>
                {card?.photoUrl.length !== 1 && (
                  <>
                    <View style={styles.wrapProgressBar}>
                      {card?.photoUrl.map((e, id) => (
                        <View
                          key={id}
                          style={[
                            styles.progressBar,
                            indexImage === id
                              ? styles.barActive
                              : styles.barNoneActive,
                          ]}
                        />
                      ))}
                    </View>
                    <View style={styles.wrapButtonNextImage}>
                      <Pressable
                        onPress={() => {
                          if (
                            indexImage ===
                            card?.photoUrl.length - card.photoUrl.length
                          ) {
                            setIndexImage(0);
                          } else {
                            setIndexImage(indexImage - 1);
                          }
                        }}
                        style={styles.buttonNextImage}>
                        <View />
                      </Pressable>

                      <Pressable
                        onPress={() => {
                          if (indexImage === card?.photoUrl.length - 1) {
                            setIndexImage(card?.photoUrl.length - 1);
                          } else {
                            setIndexImage(indexImage + 1);
                          }
                        }}
                        style={styles.buttonNextImage}>
                        <View />
                      </Pressable>
                    </View>
                  </>
                )}

                <View>
                  <Image
                    source={{uri: card?.photoUrl[indexImage]}}
                    style={styles.cardImage}
                  />
                </View>
                <LinearGradient
                  colors={['#00000000', '#000000']}
                  style={styles.imageOverlay}>
                  <View style={styles.userInfoContainer}>
                    <View>
                      <View style={styles.wrapName}>
                        <Text style={styles.name}>{card?.firstName}</Text>
                        <Text style={styles.age}>{card?.ages}</Text>
                      </View>
                      {indexImage === 0 && (
                        <>
                          <View style={styles.livingContainer}>
                            <FontAwesome5Icon
                              name={'home'}
                              size={12}
                              color={'#fff'}
                            />
                            <Text
                              style={
                                styles.city
                              }>{`Lives in ${card?.city}`}</Text>
                          </View>
                          {card?.jobTitle && (
                            <View style={styles.livingContainer}>
                              <FontAwesome5Icon
                                name={'suitcase'}
                                size={12}
                                color={'#fff'}
                              />
                              <Text
                                style={
                                  styles.city
                                }>{`${card?.jobTitle} at ${card?.company}`}</Text>
                            </View>
                          )}
                          {card?.school && (
                            <View style={styles.livingContainer}>
                              <FontAwesome5Icon
                                name={'graduation-cap'}
                                size={12}
                                color={'#fff'}
                              />
                              <Text style={styles.city}>{card?.school}</Text>
                            </View>
                          )}
                        </>
                      )}
                      {indexImage === 1 && card?.aboutMe ? (
                        <View style={styles.wrapAboutMe}>
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={4}
                            style={styles.textAboutMe}>
                            {card?.aboutMe}
                          </Text>
                        </View>
                      ) : (
                        indexImage !== 0 && (
                          <View style={styles.containerTags}>
                            {card?.tags.map(tag => (
                              <View key={tag.id} style={styles.wrapTag}>
                                <Tag
                                  tagName={tag.name}
                                  active={profile?.tags.some(
                                    item => item.id === tag.id,
                                  )}
                                  solid={true}
                                />
                              </View>
                            ))}
                          </View>
                        )
                      )}
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('User detail', {
                            partnerProfile: card,
                            myProfile: profile,
                            swipeRef: swipeRef,
                          })
                        }>
                        <Feather name="alert-circle" size={28} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => swipeRef.current.swipeLeft()}
                      style={styles.buttonNope}>
                      <Feather name={'x'} size={30} color={'#FF3985'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => swipeRef.current.swipeRight()}
                      style={styles.buttonLike}>
                      <FontAwesome5Icon
                        name={'heart'}
                        size={24}
                        color={'#14F68A'}
                        solid
                      />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.cardEmpty}>
                <Image
                  source={require('../../assets/images/sad.png')}
                  style={styles.imageEmpty}
                />
                <Text style={styles.textEmpty}>No more profile</Text>
              </View>
            )
          }
          onSwiped={cardIndex => {
            setIndexImage(0);
            dispatch(
              getUsersSpecial(
                profile?.city,
                profile?.gender_expect,
                profile?.uid,
              ),
            );
            dispatch({
              type: actionTypes.UPDATE_USER_LIKE_ME,
              payload: {
                data: [],
              },
            });

            console.log('update user like me');
          }}
          onSwipedAll={() => {
            console.log('swipe all');
          }}
          onSwipedLeft={cardIndex => {
            dispatch(swipeLeft(users[cardIndex], profile?.uid));
            dispatch(
              getUsersSpecial(
                profile?.city,
                profile?.gender_expect,
                profile?.uid,
              ),
            );
          }}
          onSwipedRight={cardIndex => {
            dispatch(swipeRight(users[cardIndex], profile, navigation));
          }}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  borderColor: '#FF3985',
                  color: '#FF3985',
                  borderWidth: 3,
                  borderRadius: 3,
                  letterSpacing: 3,
                  paddingVertical: 2,
                  transform: [{rotate: '10deg'}],
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  borderColor: '#14F68A',
                  color: '#14F68A',
                  borderWidth: 3,
                  borderRadius: 3,
                  letterSpacing: 4,
                  paddingVertical: 1,
                  paddingHorizontal: 3,
                  transform: [{rotate: '-10deg'}],
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
          stackSize={3}
          cardHorizontalMargin={4}
          cardVerticalMargin={10}
          verticalSwipe={false}
          cardIndex={indexImage}
          backgroundColor={'transparent'}
        />
      </View>
      {loading && (
        <Lottie
          style={styles.loading}
          source={require('../../assets/animations/fade-circle.json')}
          autoPlay
          loop
        />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: '77%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },
  cardEmpty: {
    height: '77%',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    padding: 14,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  wrapName: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  name: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 12,
  },
  age: {
    color: 'white',
    fontSize: 26,
  },
  livingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  city: {
    color: 'white',
    marginLeft: 5,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 3,
    marginTop: 30,
  },
  buttonLike: {
    borderColor: '#14F68A',
    borderRadius: 27,
    padding: 14,
    borderWidth: 1,
  },
  buttonNope: {
    borderColor: '#FF3985',
    borderRadius: 30,
    padding: 11,
    borderWidth: 1,
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
    borderColor: '#999',
  },
  wrapButtonNextImage: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
    width: '100%',
    height: '70%',
    top: 20,
  },
  buttonNextImage: {
    height: '100%',
    width: '50%',
  },
  loading: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  containerTags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    width: '95%',
    zIndex: 20,
  },
  wrapTag: {
    marginRight: 6,
    marginBottom: 8,
  },
  wrapAboutMe: {
    width: '90%',
    paddingBottom: 5,
  },
  textAboutMe: {
    color: 'white',
    fontSize: 18,
  },
  imageEmpty: {
    width: 220,
    height: 220,
    alignSelf: 'center',
  },
  textEmpty: {
    fontSize: 26,
    color: '#21262e',
    marginTop: 20,
    alignSelf: 'center',
  },
});
