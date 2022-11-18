import React, {useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';

import Preview from '../../components/Preview';
import {updateProfileInfo} from '../../lib/user';
import {selectorProfile} from '../../redux/reducers/auth';

const EditInfoScreen = ({navigation}) => {
  const profile = useSelector(selectorProfile);

  const [active, setActive] = useState(true);
  const [aboutMe, setAboutMe] = useState(
    profile?.aboutMe ? profile?.aboutMe : '',
  );
  const [jobTitle, setJobTitle] = useState(
    profile?.jobTitle ? profile?.jobTitle : '',
  );
  const [company, setCompany] = useState(
    profile?.company ? profile?.company : '',
  );
  const [school, setSchool] = useState(profile?.school ? profile?.school : '');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerTitle: 'Edit Info',
      headerBackVisible: false,
      headerRight: () => (
        <Button
          title="Done"
          onPress={() => {
            const data = {
              aboutMe: aboutMe,
              jobTitle: jobTitle,
              company: company,
              school: school,
            };

            updateProfileInfo(profile?.uid, data, navigation);
          }}
          color="#D6002F"
        />
      ),
    });
  }, [navigation, aboutMe, jobTitle, company, school, profile]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapButtonTop}>
        <Pressable
          onPress={() => setActive(true)}
          style={[styles.wrapTextButton, styles.textButtonLeft]}>
          <Text
            style={[styles.textButton, active === true && styles.buttonActive]}>
            Edit
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActive(false)}
          style={styles.wrapTextButton}>
          <Text
            style={[
              styles.textButton,
              active === false && styles.buttonActive,
            ]}>
            Preview
          </Text>
        </Pressable>
      </View>

      {active ? (
        <ScrollView style={styles.contentContainer}>
          <View>
            <Text style={styles.label}>ABOUT ME</Text>
            <TextInput
              style={[styles.input, styles.bg]}
              maxLength={300}
              multiline
              value={aboutMe}
              onChangeText={setAboutMe}
            />
            <Text style={[styles.textCount, styles.bg]}>
              {300 - aboutMe.length}
            </Text>
          </View>

          <View style={styles.mt}>
            <Text style={styles.label}>INTERESTS</Text>
            <Pressable
              onPress={() => navigation.navigate('Update interest')}
              style={[styles.wrapInterest, styles.bg]}>
              <View style={styles.wrapTag}>
                {profile?.tags.map((tag, index) => (
                  <Text key={tag.id} style={styles.tag}>{`${tag.name} ${
                    index === 4 ? '' : ','
                  }`}</Text>
                ))}
              </View>
              <View>
                <FontAwesome5Icon
                  name="angle-right"
                  size={24}
                  color="#d4d8de"
                />
              </View>
            </Pressable>
          </View>

          <View style={styles.mt}>
            <Text style={styles.label}>JOB TITLE</Text>
            <TextInput
              style={[styles.input, styles.bg]}
              value={jobTitle}
              onChangeText={setJobTitle}
            />
          </View>

          <View style={styles.mt}>
            <Text style={styles.label}>COMPANY</Text>
            <TextInput
              style={[styles.input, styles.bg]}
              value={company}
              onChangeText={setCompany}
            />
          </View>

          <View style={styles.mt}>
            <Text style={styles.label}>SCHOOL</Text>
            <TextInput
              style={[styles.input, styles.bg]}
              value={school}
              onChangeText={setSchool}
            />
          </View>

          <View style={styles.mt}>
            <Text style={styles.label}>LIVING IN</Text>
            <Pressable
              onPress={() => navigation.navigate('Update location', {profile})}
              style={[styles.wrapInterest, styles.bg]}>
              <View style={styles.wrapTag}>
                <Text style={styles.tag}>{profile?.city}</Text>
              </View>
              <View>
                <FontAwesome5Icon
                  name="angle-right"
                  size={24}
                  color="#d4d8de"
                />
              </View>
            </Pressable>
          </View>

          <View style={styles.mt}>
            <Text style={styles.label}>GENDER</Text>
            <Pressable
              onPress={() => navigation.navigate('Edit gender', {profile})}
              style={[styles.wrapInterest, styles.bg]}>
              <View style={styles.wrapTag}>
                <Text style={[styles.tag, styles.textTransform]}>
                  {profile?.gender === 'male' ? 'Man' : 'Woman'}
                </Text>
              </View>
              <View>
                <FontAwesome5Icon
                  name="angle-right"
                  size={24}
                  color="#d4d8de"
                />
              </View>
            </Pressable>
          </View>

          <View style={[styles.mt, styles.mb]}>
            <Text style={styles.label}>GENDER EXPECT</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Edit gender expect', {profile})
              }
              style={[styles.wrapInterest, styles.bg]}>
              <View style={styles.wrapTag}>
                <Text style={[styles.tag, styles.textTransform]}>
                  {profile?.gender_expect === 'male' ? 'Man' : 'Woman'}
                </Text>
              </View>
              <View>
                <FontAwesome5Icon
                  name="angle-right"
                  size={24}
                  color="#d4d8de"
                />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <View>
          <Preview profile={profile} navigation={navigation} />
        </View>
      )}
    </View>
  );
};

export default EditInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignContent: 'center',
    backgroundColor: '#f0f2f4',
  },
  mt: {
    marginTop: 20,
  },
  mb: {
    marginBottom: 90,
  },
  bg: {
    backgroundColor: 'white',
  },
  wrapButtonTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapTextButton: {
    alignItems: 'center',
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  textButton: {
    paddingVertical: 12,
    fontWeight: '500',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  textButtonLeft: {
    borderRightWidth: 1,
    borderRightColor: '#d4d8de',
    paddingHorizontal: 14,
  },
  buttonActive: {
    color: '#D6002F',
  },
  contentContainer: {
    paddingTop: 20,
  },
  label: {
    marginLeft: 10,
    marginBottom: 6,
    fontWeight: '700',
    color: '#505965',
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 14,
    height: 'auto',
    color: '#21262e',
  },
  textCount: {
    textAlign: 'right',
    paddingRight: 12,
    paddingBottom: 8,
    fontWeight: '700',
    color: '#505965',
  },
  wrapInterest: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  wrapTag: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: 16,
    fontWeight: '400',
    color: '#21262e',
    marginRight: 5,
  },
  textTransform: {
    textTransform: 'capitalize',
  },
});
