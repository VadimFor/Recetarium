import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { images } from "@/constants/images";
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {

  const router = useRouter(); //para ir a otra página usando código


  const [searchQuery, setSearchQuery] = React.useState('');

  const {
    data : movies, 
    loading, 
    error,
    refetch: loadMovies, 
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false); //false para que no se ejecute al cargar la página

  useEffect(() => {

    if (movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }

    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

      } else {
        reset(); // Resetea los datos si la búsqueda está vacía
      }
    }, 500); // Espera 500ms antes de hacer la búsqueda

    return () => clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta o cambia la búsqueda

  }, [searchQuery]); //esta función se ejecuta cada vez que cambia searchQuery


  useEffect(() => {
    if(movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]); // Actualiza el conteo de búsqueda
    }
  }, [movies]); // Se ejecuta cuando movies cambia


  return (
    <View className="flex-1 bg-primary" >
      
      <Image 
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList

        data={movies}
        renderItem={({ item }) => (
          <MovieCard 
            {...item} //envia todas las props del item a los argumento de MovieCard
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center', gap:16, marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image 
                source={images.bg} // Replace 'logo' with a valid key, e.g., 'bg'
                className="w-12 h-10"
              />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text:string) => setSearchQuery(text)}
              />

              { loading && (
                <ActivityIndicator 
                  size="large"
                  color="#0000ff"
                  className="my-3"
                />
              )}

              { error && (
                <Text className="text-red-500 px-5 my-3">
                  Error: {error.message}
                </Text>
              )}

                {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
                  <Text className="text-white text-xl font-bold">
                    Search Results for{' '}
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                )}


            </View>
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <Text className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ?
                  `No results found for "${searchQuery}".` : 'Search for a movie'
                }
              </Text>
            </Text>
          ) : null
        }



      />

    </View>
  )
}
export default Search