import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import ButtonPrimary from '../Button/ButtonPrimary';

const ModalCustom = ({active, title, desc, setActive}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={active}
        onRequestClose={() => {
          setActive(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDescription}>{desc}</Text>
            <Pressable onPress={() => setActive(!active)}>
              <ButtonPrimary title={'OK'} active={true} type="sm" />
            </Pressable>
          </View>
        </View>
      </Modal>
      <View></View>
    </View>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    width: 150,
    color: '#101010',
  },
  modalDescription: {
    textAlign: 'center',
    fontSize: 15,
    color: '#2D2D2D',
    fontWeight: '500',
    marginHorizontal: 30,
    width: 220,
    paddingBottom: 20,
    lineHeight: 18,
  },
});
