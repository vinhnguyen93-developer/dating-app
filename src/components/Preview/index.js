import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import Tag from '../Tag';

const {width} = Dimensions.get('window');
const height = (width * 100) / 65;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Preview = ({profile, navigation}) => {
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Animatable.View animation="slideInRight" style={styles.containerImage}>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={event => handleChangeImage(event)}
          scrollEventThrottle={event => console.log(event)}
          style={styles.wrapImage}
          showsHorizontalScrollIndicator={false}>
          {profile.photoUrl.map((image, index) => (
            <Image key={index} source={{uri: image}} style={{width, height}} />
          ))}
        </ScrollView>
        {profile.photoUrl.length > 1 && (
          <View style={styles.wrapProgressBar}>
            {profile.photoUrl.map((image, index) => (
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
      </Animatable.View>
      <LinearGradient
        colors={['#00000000', '#000000']}
        style={styles.imageOverlay}>
        <View style={styles.userInfoContainer}>
          <View>
            <View style={styles.wrapName}>
              <Text style={styles.name}>{profile?.firstName}</Text>
              <Text style={styles.age}>{profile?.ages}</Text>
            </View>
            {imageActive === 0 && (
              <>
                <View style={styles.livingContainer}>
                  <FontAwesome5Icon name={'home'} size={12} color={'#fff'} />
                  <Text style={styles.city}>{`Lives in ${profile?.city}`}</Text>
                </View>
                {profile.jobTitle && (
                  <View style={styles.livingContainer}>
                    <FontAwesome5Icon
                      name={'suitcase'}
                      size={12}
                      color={'#fff'}
                    />
                    <Text
                      style={
                        styles.city
                      }>{`${profile?.jobTitle} at ${profile?.company}`}</Text>
                  </View>
                )}
                {profile.school && (
                  <View style={styles.livingContainer}>
                    <FontAwesome5Icon
                      name={'graduation-cap'}
                      size={12}
                      color={'#fff'}
                    />
                    <Text style={styles.city}>{profile.school}</Text>
                  </View>
                )}
              </>
            )}
            {imageActive === 1 && profile?.aboutMe ? (
              <View style={styles.wrapAboutMe}>
                <Text
                  style={styles.textAboutMe}
                  ellipsizeMode="tail"
                  numberOfLines={4}>
                  {profile?.aboutMe}
                </Text>
              </View>
            ) : (
              imageActive !== 0 && (
                <View style={styles.containerTags}>
                  {profile?.tags.map(tag => (
                    <View key={tag.id} style={styles.wrapTag}>
                      <Tag tagName={tag.name} active={false} solid={true} />
                    </View>
                  ))}
                </View>
              )
            )}
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Preview detail', {
                  profile,
                })
              }
              style={styles.buttonInfo}>
              <Feather name="alert-circle" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Preview;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30,
    borderRadius: 6,
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
    paddingLeft: 10,
  },
  wrapName: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  wrapAboutMe: {
    width: '90%',
    paddingBottom: 5,
  },
  textAboutMe: {
    color: 'white',
    fontSize: 18,
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
  containerTags: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    width: '98%',
  },
  wrapTag: {
    marginRight: 6,
    marginBottom: 8,
  },
  buttonInfo: {
    position: 'absolute',
    bottom: 20,
    right: 8,
  },
});
