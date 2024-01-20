import * as api from '../../services/apis';
import { openAlertMessage } from './alertActions';

export const authActions = {
  SET_USER_INFO: 'AUTH.SET_USER_INFO',
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: authActions.SET_USER_INFO,
    payload: userInfo,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const res = await api.loginUser(userDetails);
    if (!res || res?.status === false) {
      dispatch(openAlertMessage(res?.message));
      return;
    }

    if (res?.userInfo) {
      localStorage.setItem('user', JSON.stringify(res?.userInfo));
      dispatch(setUserInfo(res?.userInfo));
      navigate('/dashboard');
    }
  };
};

const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const res = await api.registerUser(userDetails);
    if (!res || res.status === false) {
      dispatch(openAlertMessage(res?.message));
    }

    if (res?.userInfo) {
      localStorage.setItem('user', JSON.stringify(res?.userInfo));
      dispatch(setUserInfo(res?.userInfo));
      navigate('/dashboard');
    }
  };
};

export default authActions;
