import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

export function likedMovie(movie) {
  const body = { ...movie }
  body.genreId = movie.genre._id
  return httpService.put(apiEndpoint + "movies/movie/" + movie._id, body);
}

export function getMovies() {
    return httpService.get(apiEndpoint + "movies");
}

export function getMovie(movieId) {
  return httpService.get(apiEndpoint + "movies/" + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return httpService.put(apiEndpoint + "movies/" + movie._id, body);
  }
  return httpService.post(apiEndpoint + "movies", movie)
}

export function deleteMovie(movieId) {
    return httpService.delete(apiEndpoint + "movies/" + movieId)
}