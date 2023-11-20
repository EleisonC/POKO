import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';

type PokemonDetailsProps = {
  route: any;
};

const PokemonDetails = ({route}: PokemonDetailsProps) => {
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const {name} = route.params;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
        );
        const data = await response.json();
        data.external_url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#800080" />
      </View>
    );
  }

  if (!pokemonData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to fetch Pokemon details</Text>
      </View>
    );
  }

  const imageUrl = pokemonData.sprites?.front_default || 'fallback_image_url';

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Text style={styles.name}>{pokemonData.name}</Text>
      <Text style={styles.externalUrl}>{pokemonData.external_url}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  externalUrl: {
    color: '#0066CC',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default PokemonDetails;
