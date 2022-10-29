import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');
const height = (width * 100) / 80;

const images = [
  'https://images.pexels.com/photos/6105851/pexels-photo-6105851.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6105874/pexels-photo-6105874.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/6105852/pexels-photo-6105852.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const UserDetail = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [imageActive, setImageActive] = useState(0);

  const handleChangeImage = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    if (slide !== imageActive) {
      setImageActive(slide);
    }
  };
  return (
    <View style={styles.container}>
      <Animatable.View animation="slideInUp" style={styles.containerImage}>
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
        <View style={styles.wrapProgressBar}>
          {images.map((image, index) => (
            <View
              key={index}
              style={[
                styles.progressBar,
                imageActive === index ? styles.barActive : styles.barNoneActive,
              ]}
            />
          ))}
        </View>
        <View>
          <Text>Ziên 22</Text>
        </View>
      </Animatable.View>
    </View>
  );
};

export default UserDetail;

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
});
