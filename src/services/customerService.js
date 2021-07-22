import httpService from "./httpService";
import { apiEndpoint } from "../config.json";

export function getCustomers() {
  return httpService.get(apiEndpoint + "customers");
}

export function getCustomer(cusomerId) {
  return httpService.get(apiEndpoint + "customers/" + cusomerId);
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return httpService.put(apiEndpoint + "customers/" + customer._id, body);
  }
  return httpService.post(apiEndpoint + "customers", customer);
}

export function deleteCustomer(cusomerId) {
  return httpService.delete(apiEndpoint + "customers/" + cusomerId);
}
