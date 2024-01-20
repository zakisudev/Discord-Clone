import axios from 'axios';
import { LOGIN_URL, REGISTER_URL } from '../constants/urls';

export const loginUser = async (data) => {
  try {
    const res = await axios.post(LOGIN_URL, data);
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const registerUser = async (data) => {
  try {
    const res = await axios.post(REGISTER_URL, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};
