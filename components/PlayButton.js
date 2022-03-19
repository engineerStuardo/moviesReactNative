import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../themes/colors';

const PlayButton = ({setIsModalVisible}) => {
  return (
    <Pressable style={styles.button} onPress={() => setIsModalVisible(true)}>
      <Icon size={30} name="caret-forward-outline" color={Colors.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: Colors.primary,
  },
});

export default PlayButton;
