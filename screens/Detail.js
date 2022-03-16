import React, {useState, useEffect} from 'react';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
// import VideoPlayer from 'react-native-video-controls';

import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  Modal,
  Pressable,
} from 'react-native';

import {getMovie} from '../services/services';
import PlayButton from '../components/PlayButton';

const placeHolderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {movieId} = route.params;

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setDetail(movieData);
      setIsLoading(false);
    });
  }, [movieId]);

  return (
    <>
      <Modal animationType="slide" visible={isModalVisible}>
        <View style={styles.videoModal}>
          {/* <VideoPlayer source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}} /> */}
        </View>
      </Modal>
      {isLoading && <ActivityIndicator size="large" />}
      {!isLoading && (
        <ScrollView>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              detail.poster_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500${detail.poster_path}`,
                  }
                : placeHolderImage
            }
          />
          <View style={styles.container}>
            <View style={styles.playButton}>
              <PlayButton setIsModalVisible={setIsModalVisible} />
            </View>
            <Text style={styles.title}>{detail.title}</Text>
            {detail.genres && (
              <>
                <View style={styles.genresContainer}>
                  {detail.genres.map(genre => (
                    <Text key={genre.id} style={styles.genre}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
                <StarRating
                  maxStars={5}
                  rating={detail.vote_average / 2}
                  fullStarColor={'gold'}
                  starSize={30}
                  disabled
                />
                <Text style={styles.overview}>{detail.overview}</Text>
                <Text style={styles.release}>
                  Release date:{' '}
                  {dateFormat(detail.release_date, 'mmmm dS, yyyy')}
                </Text>
              </>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
