import Axios from "axios";

const API = "https://ancient-island-11320.herokuapp.com/v1";

export const addUser = async (data) => {
  try {
    const response = await Axios.post(`${API}/users`, data);
    return response;
  } catch (error) {
    console.log(error);
    return "Server Error!!";
  }
};

export const getAllUsers = async (limit, skip, sort) => {
  try {
    const response = await Axios.get(`${API}/users`);
    return response;
  } catch (error) {
    console.log(error);
    return "Server Error!!";
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await Axios.delete(`${API}/users/${id}`);
    return response;
  } catch (error) {
    return "Server Error";
  }
};

export const updateUser = async (data, id) => {
  try {
    const response = await Axios.put(`${API}/users/${id}`, data);
    return response;
  } catch (error) {
    return "Server Error";
  }
};
