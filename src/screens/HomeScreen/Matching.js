import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Matching = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [imageActive, setImageActive] = useState(0);
  const [showMatchingText, setShowMatchingText] = useState(true);

  const handleChangeImage = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    if (slide !== imageActive) {
      setImageActive(slide);
    }
  };

  const images = [
    'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  return (
    <View
      onTouchStart={() => setShowMatchingText(false)}
      style={styles.container}>
      <View style={styles.containerImage}>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={event => handleChangeImage(event)}
          scrollEventThrottle={event => console.log(event)}
          style={styles.wrapImage}
          showsHorizontalScrollIndicator={false}>
          {images.map((image, index) => (
            <Image key={index} source={{uri: image}} style={{width, height}} />
          ))}
        </ScrollView>
        {images.length > 1 && (
          <View style={styles.wrapProgressBar}>
            {images.map((image, index) => (
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

        {showMatchingText && (
          <Animatable.View
            animation="bounceIn"
            style={[styles.matchingContainer, styles.boxShadow]}>
            <View style={styles.matchingContent}>
              <Text style={[styles.matchingText, styles.matchingTextOne]}>
                IT'S A
              </Text>
              <Text style={[styles.matchingText, styles.matchingTextTwo]}>
                MATCH!
              </Text>
            </View>
          </Animatable.View>
        )}

        <LinearGradient
          colors={['#00000000', '#000000']}
          style={styles.imageOverlay}>
          <View style={styles.wrapInput}>
            <TextInput style={styles.input} placeholder="Say something nice" />
            <Pressable>
              <Text style={styles.buttonSend}>SEND</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.buttonClose, styles.boxShadow]}>
          <Feather name="x" size={32} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default Matching;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
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
    top: 60,
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
  buttonClose: {
    paddingHorizontal: 20,
    paddingVertical: 19,
    borderRadius: 50,
    position: 'absolute',
    left: 20,
    top: 65,
    zIndex: 2,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    padding: 14,
    width: '100%',
  },
  matchingContainer: {
    position: 'absolute',
    bottom: 0,
    top: '40%',
    right: 0,
    left: 0,
  },
  matchingContent: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  matchingText: {
    color: '#31fec7',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  matchingTextOne: {
    fontSize: 25,
  },
  matchingTextTwo: {
    fontSize: 65,
  },
  wrapInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    padding: 8,
    flexGrow: 1,
    fontSize: 16,
  },
  buttonSend: {
    color: '#309aff',
    fontWeight: '600',
    paddingHorizontal: 6,
  },
});
