import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import Colors from '../themes/colors';

const Navbar = ({main = false}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {main ? (
        <View style={styles.mainContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/movies.png')}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Icon name="search-outline" size={40} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-back" size={40} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 30,
    marginLeft: 10,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Navbar;
