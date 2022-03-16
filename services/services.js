import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '949eb751d5ca24f1d34b3041669ce02f';

export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  return resp.data.results;
};

export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
  return resp.data.results;
};

export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`);
  return resp.data.results;
};

export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};

export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};

export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
  return resp.data;
};
