import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {searchMovieTv} from '../services/services';
import Card from '../components/Card';
import Error from '../components/Error';

const Search = () => {
  const [text, setText] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [error, setError] = useState();

  const navigation = useNavigation();

  const onSubmit = async query => {
    try {
      const [movies, tv] = await Promise.all([
        searchMovieTv(query, 'movie'),
        searchMovieTv(query, 'tv'),
      ]);
      setSearchResults([...movies, ...tv]);
      setError(false);
    } catch (e) {
      setError(e);
      setSearchResults();
    }
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder={'Search Movie or Tv Show'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              onSubmit(text);
            }}>
            <Icon name="search-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchItems}>
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {searchResults && searchResults.length === 0 && (
            <View style={styles.noResults}>
              <Text>No results matching your criteria.</Text>
              <Text>Try different keywords.</Text>
            </View>
          )}
          {!searchResults && (
            <View style={styles.empty}>
              <Text>Type something to start searching</Text>
            </View>
          )}
          {error && (
            <View style={styles.errorContainer}>
              <Error />
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: 15,
    borderWidth: 0.5,
    height: 50,
    padding: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
  },
  searchItems: {
    padding: 8,
  },
  noResults: {
    paddingTop: 20,
  },
  errorContainer: {
    marginTop: 300,
  },
});

export default Search;
