import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ButtonPrimary from '../Button/ButtonPrimary';
import Tag from '../Tag';
import ModalCustom from '../Modal';
import {selectorTags} from '../../redux/reducers/tags';
import {getTags} from '../../redux/actions/tags';
import {selectorProfile} from '../../redux/reducers/auth';
import {updateInterestTag} from '../../lib/user';

const UpdateInterest = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const dispatch = useDispatch();
  const tagsData = useSelector(selectorTags);
  const profile = useSelector(selectorProfile);

  const [tags, setTags] = useState(profile?.tags);
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

  const handleSubmit = async data => {
    await updateInterestTag(profile?.uid, data, navigation);
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

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
        <Text style={styles.textTitle}>Edit interests</Text>
        <Text style={styles.contentDescription}>
          Select interest that you'd like to share with the people you connect
          with. Choose minimum of 5.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
        onPress={() => handleSubmit(tags)}
        style={styles.buttonContinue}>
        <ButtonPrimary
          title={`UPDATE ${tags.length}/5`}
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

export default UpdateInterest;

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
