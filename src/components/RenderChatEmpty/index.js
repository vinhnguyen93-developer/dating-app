import React from 'react';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import {Image, StyleSheet, Text, View} from 'react-native';

const RenderChatEmpty = ({userMatched}) => {
  const calculatorTime = () => {
    const date = new Date(userMatched.matchTime.seconds * 1000);

    return moment(date, 'YYYYMMDD').fromNow();
  };

  return (
    <Animatable.View animation={'bounceIn'} style={styles.container}>
      <Text style={[styles.text, styles.textTime]}>{calculatorTime()}</Text>
      <View style={styles.containerMatched}>
        <Text style={[styles.text, styles.textMatched]}>You Matched with</Text>
        <Text style={[styles.text, styles.textName]}>
          {userMatched.firstName}
        </Text>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: userMatched.photoUrl[0],
        }}
      />
    </Animatable.View>
  );
};

export default RenderChatEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    transform: [{scaleY: -1}],
    color: '#21262e',
  },
  textTime: {
    fontSize: 14,
  },
  containerMatched: {
    flexDirection: 'row',
    marginTop: 4,
  },
  textMatched: {
    fontSize: 18,
  },
  textName: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 3,
  },
  image: {
    width: 146,
    height: 146,
    borderRadius: 100,
    transform: [{scaleY: -1}],
    marginTop: 24,
  },
});
