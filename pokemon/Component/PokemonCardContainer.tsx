import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import PokemonCard from './PokemonCard';

interface Props {
  data?: any[];
}

const PokemonCardContainer = (props: Props) => {
  const {data} = props;

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.cardContainer}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <PokemonCard pokemonName={item?.name} />}
      />
    </View>
  );
};

export default PokemonCardContainer;

const styles = StyleSheet.create({
  cardContainer: {
    padding: 25,
    paddingTop: 5,
    paddingBottom: 100,
    justifyContent: 'center',
    // height: '80%',
    // flex: 1,
    // backgroundColor: 'black',
  },
});
