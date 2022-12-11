import { userType } from "../types/user";
import axios from "./api";

export default {
  getAll() {
    return axios
      .get("/users")
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(id: string) {
    return axios
      .delete(`/users/${id}`)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  edit(user: userType) {
    return axios
      .patch(`/users/${user.id}`, user)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  create(user: userType) {
    return axios
      .post(`/users/`, user)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
