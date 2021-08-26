const RESOURCE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'debec84baf21aecb2b217ff14f666989';

const OPTIONS = {};

function fetchMovies(endpoint, params, options = OPTIONS) {
  const searchParams = new URLSearchParams(params);

  const url = RESOURCE_URL + endpoint + '?' + searchParams;

  return fetch(url, options).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(
        `${response.status} -> Server failed to process URL: ${response.url}`,
      ),
    );
  });
}

function FetchTrendingMovies(page = 1, period = 'day') {
  const endpont = `/trending/movie/${period}`;
  const searchParams = {
    api_key: API_KEY,
    page,
  };

  return fetchMovies(endpont, searchParams);
}

function fetchMovieByID(movieId) {
  const endpont = `/movie/${movieId}`;
  const searchParams = {
    api_key: API_KEY,
  };

  return fetchMovies(endpont, searchParams);
}

function fetchMovieByKeyword(query, page = 1) {
  const endpont = '/search/movie';
  const searchParams = {
    api_key: API_KEY,
    query,
    page,
  };

  return fetchMovies(endpont, searchParams);
}

function fetchCreditsByID(movieId) {
  const endpont = `/movie/${movieId}/credits`;
  const searchParams = {
    api_key: API_KEY,
  };

  return fetchMovies(endpont, searchParams);
}

function fetchReviewsByID(movieId) {
  const endpont = `/movie/${movieId}/reviews`;
  const searchParams = {
    api_key: API_KEY,
  };

  return fetchMovies(endpont, searchParams);
}

export {
  FetchTrendingMovies,
  fetchMovieByID,
  fetchMovieByKeyword,
  fetchCreditsByID,
  fetchReviewsByID,
};
