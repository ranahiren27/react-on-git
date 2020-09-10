import Axios from "axios";

const API = "http://127.0.0.1:8000/v1";

export const addUser = async (data) => {
  try {
    const response = await Axios.post(`${API}/users`, data);
    return response;
  } catch (error) {
    console.log(error);
    return "Server Error!!";
  }
};
