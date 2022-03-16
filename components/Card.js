import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const placeHolderImage = require('../assets/images/placeholder.png');

const Card = React.memo(({item, navigation}) => {
  const onPress = () => {
    navigation.navigate('Details', {movieId: item.id});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={
          item.poster_path
            ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
            : placeHolderImage
        }
      />
      {!item.poster_path && <Text style={styles.movieName}>{item.title}</Text>}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: 100,
    textAlign: 'center',
    top: 10,
  },
});

export default Card;
