import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

export function getRentals() {
  return httpService.get(apiEndpoint + "rentals");
}

export function getRental(rentalId) {
  return httpService.get(apiEndpoint + "rentals/" + rentalId);
}

export function saveRental({customerId, movieId}) {
  return httpService.post(apiEndpoint + "rentals", {customerId, movieId});
}
