import {useDispatch} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {setUserInfo} from '../../redux/actions/auth';
import ButtonPrimary from '../../components/Button/ButtonPrimary';
import Tag from '../../components/Tag';
import ModalCustom from '../../components/Modal';

const tagsData = [
  {
    id: 1,
    name: 'Gym',
  },
  {
    id: 2,
    name: 'Running',
  },
  {
    id: 3,
    name: 'Reading',
  },
  {
    id: 4,
    name: 'Travel',
  },
  {
    id: 5,
    name: 'Walking',
  },
  {
    id: 6,
    name: 'Coffee',
  },
  {
    id: 7,
    name: 'Road Trips',
  },
  {
    id: 8,
    name: 'Tattoos',
  },
  {
    id: 9,
    name: 'Language exchange',
  },
  {
    id: 10,
    name: 'K-pop',
  },
  {
    id: 11,
    name: 'Films',
  },
];

const Interests = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSelectedTag = tag => {
    const isTag = tags.some(item => item.id === tag.id);

    if (tags.length < 5) {
      if (isTag) {
        setTags(prevState => prevState.filter(item => item.id !== tag.id));
      } else {
        setTags(prevState => [...prevState, tag]);
      }
    } else {
      if (isTag) {
        setTags(prevState => prevState.filter(item => item.id !== tag.id));
      } else {
        setShowModal(true);
      }
    }
  };

  const handleSubmit = data => {
    dispatch(
      setUserInfo({
        gender_expect: data,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View animation="fadeIn" style={styles.iconBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5Icon name="angle-left" size={34} color="#A1A0A0" />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      <View style={styles.wrapTitle}>
        <Text style={styles.textTitle}>Interests</Text>
        <Text style={styles.contentDescription}>
          Let everyone know what your interested in by adding it to your
          profile.
        </Text>
      </View>

      <ScrollView>
        <View style={styles.contentContainer}>
          {tagsData.map(tag => (
            <TouchableOpacity
              onPress={() => handleSelectedTag(tag)}
              key={tag.id}
              style={styles.tag}>
              <Tag
                tagName={tag.name}
                active={tags.some(item => item.id === tag.id)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        disabled={tags.length === 5 ? false : true}
        onPress={() => handleSubmit()}
        style={styles.buttonContinue}>
        <ButtonPrimary
          title={`CONTINUE ${tags.length}/5`}
          active={tags.length === 5 ? true : false}
        />
      </TouchableOpacity>

      <ModalCustom
        active={showModal}
        setActive={setShowModal}
        title={'Max Selection Reached'}
        desc={
          "You've reached the maximum number of the selections. To add more, please remove some from your list."
        }
      />
    </View>
  );
};

export default Interests;

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
    marginBottom: 5,
  },
  wrapTitle: {
    marginHorizontal: 45,
  },
  textTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  contentContainer: {
    marginHorizontal: 35,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentDescription: {
    color: '#646464',
    fontSize: 14,
    marginTop: 10,
    paddingBottom: 15,
  },
  wrapButton: {
    marginBottom: 10,
  },
  buttonSub: {
    marginVertical: 10,
  },
  buttonContinue: {
    marginHorizontal: 30,
    marginBottom: 70,
    marginTop: 15,
  },
  tag: {
    marginVertical: 4,
    marginRight: 6,
  },
});
