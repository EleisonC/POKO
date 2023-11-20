import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pokemonName: string;
}

const PokemonCard = (props: Props) => {
  const {pokemonName} = props;
  const navigation = useNavigation();

  const handleNavigationToDetails = () => {
    navigation.navigate('pokemonDetails', {name: pokemonName});
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.pokemonName} onPress={handleNavigationToDetails}>
        Name: {pokemonName || 'Pokemon Name'}
      </Text>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 10,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
