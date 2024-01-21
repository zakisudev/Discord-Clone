import axios from 'axios';
import {
  FRIENDS_URL,
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
} from '../constants/urls';
import store from '../store/store';

// Auth APIS
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

// Protected APIS
export const logoutUser = async () => {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.token
    : store.getState()?.auth?.userInfo
    ? store.getState()?.auth?.userInfo?.token
    : null;

  try {
    const res = await axios.post(`${LOGOUT_URL}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const sendFriendRequests = async (data) => {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.token
    : store.getState()?.auth?.userInfo
    ? store.getState()?.auth?.userInfo?.token
    : null;

  try {
    const res = await axios.post(`${FRIENDS_URL}/invite`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const acceptFriendRequest = async (data) => {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.token
    : store.getState()?.auth?.userInfo
    ? store.getState()?.auth?.userInfo?.token
    : null;

  try {
    const res = await axios.post(`${FRIENDS_URL}/accept`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const rejectFriendRequest = async (data) => {
  const token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))?.token
    : store.getState()?.auth?.userInfo
    ? store.getState()?.auth?.userInfo?.token
    : null;

  try {
    const res = await axios.post(`${FRIENDS_URL}/reject`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error?.response?.data;
  }
};
