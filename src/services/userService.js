import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

export function register(user) {
    return httpService.post(apiEndpoint + "users", {
        email: user.username,
        password: user.password,
        name: user.name
    })
}

export function getUser() {
  return httpService.get(apiEndpoint + "users/me");
}