import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import {
  getUpcomingMovies,
  getPopularMovies,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';
import List from '../components/List';
import Card from '../components/Card';
import Error from '../components/Error';

const dimentions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [popularTvs, setPopularTvs] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  const getMoviesData = async () => {
    try {
      const [
        upcomingMoviesData,
        popularMoviesData,
        popularTvData,
        familyMoviesData,
        documentaryMoviesData,
      ] = await getData();
      const moviesArray = [];
      upcomingMoviesData.forEach(movie => {
        moviesArray.push(`https://image.tmdb.org/t/p/w500${movie.poster_path}`);
      });
      setMoviesImages(moviesArray);
      setPopularMovies(popularMoviesData);
      setPopularTvs(popularTvData);
      setFamilyMovies(familyMoviesData);
      setDocumentaryMovies(documentaryMoviesData);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMoviesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => <Card item={item} navigation={navigation} />;

  return (
    <>
      {isLoading && <ActivityIndicator size="large" />}
      {isError && <Error />}
      {!isLoading && !isError && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                sliderBoxHeight={dimentions.height / 1.5}
                dotStyle={styles.sliderStyle}
                autoplay
                circleLoop
              />
            </View>
          )}
          {popularMovies && (
            <View style={styles.carouselContainer}>
              <List
                title="Popular Movies"
                content={popularMovies}
                renderItem={renderItem}
              />
            </View>
          )}
          {popularTvs && (
            <View style={styles.carouselContainer}>
              <List
                title="Popular Tv Shows"
                content={popularTvs}
                renderItem={renderItem}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carouselContainer}>
              <List
                title="Family Movies"
                content={familyMovies}
                renderItem={renderItem}
              />
            </View>
          )}
          {documentaryMovies && (
            <View style={styles.carouselContainer}>
              <List
                title="Documentary Movies"
                content={documentaryMovies}
                renderItem={renderItem}
              />
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
