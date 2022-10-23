import React, {useState} from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const images = [
  {
    images: [
      'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    images: [
      'https://images.pexels.com/photos/884979/pexels-photo-884979.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1382730/pexels-photo-1382730.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
  {
    images: [
      'https://images.pexels.com/photos/672444/pexels-photo-672444.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
  },
];

const Home = () => {
  const [indexImage, setIndexImage] = useState(0);
  const [likeActive, setLikeActive] = useState(false);

  return (
    <View style={styles.container}>
      <Swiper
        cards={images}
        renderCard={(card, index) => {
          return (
            <View key={index} style={styles.card}>
              {card.images.length !== 1 && (
                <>
                  <View style={styles.wrapProgressBar}>
                    {card.images.map((e, index) => (
                      <View
                        key={index}
                        style={[
                          styles.progressBar,
                          indexImage === index
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
                          card.images.length - card.images.length
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
                        if (indexImage === card.images.length - 1) {
                          setIndexImage(card.images.length - 1);
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
                  source={{uri: card.images[indexImage]}}
                  style={styles.cardImage}
                />
              </View>
              <LinearGradient
                colors={['#00000000', '#000000']}
                style={styles.imageOverlay}>
                <View style={styles.userInfoContainer}>
                  <View>
                    <View style={styles.wrapName}>
                      <Text style={styles.name}>Enny Huỳnh</Text>
                      <Text style={styles.age}>24</Text>
                    </View>
                    <View style={styles.livingContainer}>
                      <FontAwesome5Icon
                        name={'home'}
                        size={12}
                        color={'#fff'}
                      />
                      <Text style={styles.city}>Lives in Hồ Chí Minh</Text>
                    </View>
                  </View>
                  <View>
                    <TouchableOpacity>
                      <Feather name="alert-circle" size={28} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttonNope}>
                    <Feather name={'x'} size={30} color={'#FF3985'} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonLike}>
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
          );
        }}
        onSwiped={cardIndex => {
          setIndexImage(0);
          console.log(cardIndex);
        }}
        onSwipedAll={() => {
          console.log('swipe all');
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
        showSecondCard={true}
        stackSize={5}
        cardHorizontalMargin={4}
        cardVerticalMargin={10}
        cardIndex={indexImage}
        backgroundColor={'transparent'}
      />
    </View>
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
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 12,
  },
  age: {
    color: 'white',
    fontSize: 22,
  },
  livingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  city: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
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
});
