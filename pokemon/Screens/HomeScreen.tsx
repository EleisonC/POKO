import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  Button,
} from 'react-native';
import React, {useEffect} from 'react';
import PokemonCardContainer from '../Component/PokemonCardContainer';

type Props = {};

const NoPokemonAvailable = () => {
  return (
    <View style={styles.noPokemonContainer}>
      <Text style={styles.noPokemonText}>
        No Pokemon available with that name
      </Text>
    </View>
  );
};

const HomeScreen = (_props: Props) => {
  let searchTimeout: any = React.useRef(null);

  const [pokemonData, setPokemonData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [nextPage, setNextPage] = React.useState('');
  const [prevPage, setPrevPage] = React.useState('');
  const [page, setPage] = React.useState(1);

  const handleSearch = async (searchText: string) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      setLoading(true);
      if (searchText.length > 3) {
        console.log('Search text is greater than 1 character.');
        const result = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`,
        );
        console.log('result 4040404', result.status);
        if (result.status === 404) {
          setPokemonData([]);
          setLoading(false);
          return;
        }
        const data = await result.json();
        if (data.name) {
          const item = {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`,
          };
          console.log('item 4040404', item);
          setPokemonData([item]);
          setLoading(false);
        }
      } else if (searchText.length === 0 || searchText.length < 3) {
        console.log('Search text is empty.');
        fetchPokemonData();
        setLoading(false);
      }
    }, 1500);
  };

  const fetchPokemonData = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/'); // Replace with the actual API endpoint
      const data = await response.json();
      setPokemonData(data.results); // Assuming the API returns an array of Pokemon objects with a 'results' property
      setNextPage(data.next);
      setPrevPage(data.previous);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  const fetchPokemonDataPaginated = async (nextPrevURL: string) => {
    try {
      const response = await fetch(nextPrevURL); // Replace with the actual API endpoint
      const data = await response.json();
      setPokemonData(data.results); // Assuming the API returns an array of Pokemon objects with a 'results' property
      setNextPage(data.next);
      setPrevPage(data.previous);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    fetchPokemonDataPaginated(nextPage);
  };

  const handlePrevPage = () => {
    fetchPokemonDataPaginated(prevPage);
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContiner}>
      <View style={styles.searchContainer}>
        <TextInput
          keyboardType="default"
          onChangeText={text => handleSearch(text.trimStart())}
          placeholder="Search pokemon name"
          placeholderTextColor="#200E32"
          style={styles.searchInput}
        />
      </View>
      {!loading ? (
        pokemonData.length > 0 ? (
          <>
            <View style={styles.navigationButtonsContainer}>
              <Button
                title="Previous"
                onPress={handlePrevPage}
                disabled={!prevPage}
              />
              <Button
                title="Next"
                onPress={handleNextPage}
                disabled={!nextPage}
              />
            </View>
            <PokemonCardContainer data={pokemonData} />
          </>
        ) : (
          <NoPokemonAvailable />
        )
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#800080" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  textstyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContiner: {
    // flex: 1,
  },
  loadingContainer: {
    // flwex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d4d4d8',
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 5,
    color: '#000',
  },
  noPokemonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPokemonText: {
    fontSize: 16,
    color: '#800080',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 4,
    paddingHorizontal: 20,
  },
});
