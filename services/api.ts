const apiKey = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: apiKey,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  }
}

export const fetchMovies = async ({query} : {query: string}) => {

  const endpoint= query ? 
   `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
  `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  })

  if(!response.ok){
    //@ts-ignore
    throw new Error('Failed to fetch movies', response.statusText);
  }

  const data = await response.json();

  //@ts-ignore
  return data.results;
}

// Call the function in an async IIFE
(async () => {
  try {
    const movies = await fetchMovies({ query: "" }); // <-- Call the function!
    console.log('Movies:', movies);
  } catch (error) {
    console.error(error);
  }
})();

