import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Lottie from 'lottie-react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useLayoutEffect, useMemo, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import storage from '@react-native-firebase/storage';

import ButtonPrimary from '../../components/Button/ButtonPrimary';
import {updatePhoto} from '../../redux/actions/auth';
import {useAuthContext} from '../../context/AuthContext';
import {selectorLoading} from '../../redux/reducers/auth';
import ModalDeleteImage from './Modal';

const UpdatePhotoView = ({route, navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const {user} = useAuthContext();
  const {profile} = route.params;

  const loading = useSelector(selectorLoading);

  const [images, setImages] = useState(
    profile?.photoUrl.length === 3
      ? profile?.photoUrl
      : [...profile?.photoUrl, ''],
  );
  const [activeButton, setActiveButton] = useState(false);
  const [photosUrlUpload, setPhotosUrlUpload] = useState([]);
  const [upLoading, setUpLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [indexImageRemove, setIndexImageRemove] = useState(null);

  useMemo(() => {
    images.join('') !== '' ? setActiveButton(true) : setActiveButton(false);
    const photos = images.filter(image => image !== '');

    setPhotosUrlUpload(photos);
  }, [images]);

  const choosePhotoFromLibrary = index => {
    ImagePicker.openPicker({
      width: 400,
      height: 600,
      cropping: true,
    })
      .then(async image => {
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        let filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const extension = filename.split('.').pop();
        const name = filename.split('.').slice(0, -1).join('.');

        filename = name + Date.now() + '.' + extension;
        setUpLoading(true);
        const storageRef = storage().ref(`images/${filename}`);
        const uploadTask = storageRef.putFile(imageUri);

        await uploadTask;
        storageRef.getDownloadURL().then(url => {
          setUpLoading(false);
          setImages([
            ...images.map((itemImage, indexImage) =>
              indexImage === index ? url : itemImage,
            ),
          ]);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const removeImage = index => {
    setImages([
      ...images.map((itemImage, indexImage) =>
        indexImage !== index ? itemImage : '',
      ),
    ]);
  };

  const handleSubmit = async () => {
    await dispatch(updatePhoto({photos: photosUrlUpload, userId: user.uid}));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View animation="fadeIn">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5Icon name="angle-left" size={34} color="#A1A0A0" />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <View style={styles.wrapTile}>
        <Text style={styles.textTile}>Update your photos</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.containerPhoto}>
          {images.map((image, index) =>
            image !== '' ? (
              <View key={index} style={styles.wrapImage}>
                <Image
                  source={{
                    uri: image,
                  }}
                  style={styles.image}
                />
                <TouchableOpacity
                  onPress={() => {
                    setModalActive(true);
                    setIndexImageRemove(index);
                  }}
                  style={styles.buttonRemoveImage}>
                  <Feather name="x" size={21} color="#fe3a85" />
                </TouchableOpacity>
              </View>
            ) : (
              <View key={index} style={styles.wrapPhoto}>
                <TouchableOpacity onPress={() => choosePhotoFromLibrary(index)}>
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    colors={['#ff948f', '#fe3a85']}
                    style={styles.buttonPickImage}>
                    <Feather name="plus" size={22} color="white" />
                  </LinearGradient>
                </TouchableOpacity>
                {upLoading && (
                  <View style={styles.loadingLayer}>
                    <ActivityIndicator size="large" color="#fff" />
                  </View>
                )}
              </View>
            ),
          )}
        </View>
      </View>

      <TouchableOpacity
        disabled={!activeButton}
        onPress={handleSubmit}
        style={styles.buttonContinue}>
        <ButtonPrimary title={'UPDATE'} active={activeButton} />
      </TouchableOpacity>

      {loading && (
        <Lottie
          style={styles.loading}
          source={require('../../assets/animations/loader.json')}
          autoPlay
          loop
        />
      )}

      <ModalDeleteImage
        active={modalActive}
        setActive={setModalActive}
        removeImage={removeImage}
        indexImage={indexImageRemove}
      />
    </View>
  );
};

export default UpdatePhotoView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: '20%',
  },
  header: {
    marginLeft: 30,
    marginBottom: 20,
  },
  wrapTile: {
    width: '100%',
    marginHorizontal: 45,
  },
  contentDescription: {
    color: '#646464',
    fontSize: 14,
    marginTop: 5,
  },
  textTile: {
    fontSize: 32,
    fontWeight: '700',
  },
  contentContainer: {
    marginHorizontal: 30,
    marginTop: 40,
  },
  containerPhoto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingLayer: {
    backgroundColor: '#d4d8de',
    height: '100%',
    borderRadius: 8,
    opacity: 0.4,
    paddingTop: 55,
  },
  wrapPhoto: {
    width: 100,
    height: 150,
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
    position: 'relative',
  },
  wrapImage: {
    width: 100,
    height: 150,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  buttonPickImage: {
    alignSelf: 'flex-end',
    borderRadius: 14,
    padding: 2,
    position: 'absolute',
    top: 130,
    right: -5,
  },
  buttonRemoveImage: {
    position: 'absolute',
    bottom: -6,
    right: -5,
    alignSelf: 'flex-end',
    borderRadius: 14,
    padding: 3,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  buttonContinue: {
    marginHorizontal: 30,
    marginTop: '80%',
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
