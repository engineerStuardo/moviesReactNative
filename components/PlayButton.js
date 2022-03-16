import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayButton = ({setIsModalVisible}) => {
  return (
    <Pressable style={styles.button} onPress={() => setIsModalVisible(true)}>
      <Icon size={30} name="caret-forward-outline" color={'#fff'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FC',
  },
});

export default PlayButton;
