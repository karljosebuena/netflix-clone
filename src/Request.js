// Typically we would store in {process.enc.API_KEY}
const API_KEY = "1edc45bd05e7841639db6472f4190611";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-USE`,
  fetchNetflixOriginal: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-USE`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumetaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export default requests