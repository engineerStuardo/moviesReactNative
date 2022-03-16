import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Error = React.memo(
  ({
    errorText1 = 'Oops! Something wen wrong.',
    errorText2 = 'Make sure you are online and restart the App',
  }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{errorText1}</Text>
        <Text style={styles.text}>{errorText2}</Text>
        <Image source={require('../assets/images/errorPlaceholder.gif')} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Error;
