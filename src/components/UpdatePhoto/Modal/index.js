import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ButtonPrimary from '../../Button/ButtonPrimary';
import ButtonOutline from '../../Button/ButtonOutline';

const ModalCustom = ({active, setActive, removeImage, indexImage}) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={active}
        onRequestClose={() => {
          setActive(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete this photo
            </Text>
            <Pressable
              style={styles.buttonDelete}
              onPress={() => {
                setActive(false);
                removeImage(indexImage);
              }}>
              <ButtonPrimary title={'Delete'} active={true} type="sm" />
            </Pressable>
            <TouchableOpacity onPress={() => setActive(!active)}>
              <ButtonOutline title={'Cancel'} active={false} type="sm" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    padding: 15,
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
    fontWeight: '700',
    fontSize: 16,
    width: 200,
    color: '#21262e',
  },
  buttonDelete: {
    marginBottom: 10,
    marginTop: 10,
  },
});
