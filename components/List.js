import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const List = React.memo(({title, content, renderItem}) => {
  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <FlatList data={content} renderItem={renderItem} horizontal />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

export default List;
