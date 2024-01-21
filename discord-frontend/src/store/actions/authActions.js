import * as api from '../../services/apis';
import { openAlertMessage } from './alertActions';

export const authActions = {
  SET_USER_INFO: 'AUTH.SET_USER_INFO',
  RESET_USER_INFO: 'AUTH.RESET_USER_INFO',
};

export const getActions = (dispatch) => {
  return {
    login: (userInfo, navigate) => dispatch(login(userInfo, navigate)),
    register: (userInfo, navigate) => dispatch(register(userInfo, navigate)),
    logout: (userInfo, navigate) => dispatch(logout(userInfo, navigate)),
  };
};

export const setUserInfo = (userInfo) => {
  return {
    type: authActions.SET_USER_INFO,
    payload: userInfo,
  };
};

export const resetUser = () => {
  return {
    type: authActions.RESET_USER_INFO,
  };
};

const logout = (navigate) => {
  return async (dispatch) => {
    const res = await api.logoutUser();
    if (!res || res?.status === false) {
      dispatch(openAlertMessage(res?.message));
      return;
    }

    if (res?.status === true) {
      localStorage.clear();
      dispatch(resetUser());
      window.location.pathname = '/login';
    }
  };
};

const login = (userInfo, navigate) => {
  return async (dispatch) => {
    const res = await api.loginUser(userInfo);
    if (!res || res?.status === false) {
      dispatch(openAlertMessage(res?.message));
      return;
    }

    if (res?.status === true) {
      localStorage.setItem('user', JSON.stringify(res?.userInfo));
      dispatch(setUserInfo(res?.userInfo));
      navigate('/dashboard');
    }
  };
};

const register = (userInfo, navigate) => {
  return async (dispatch) => {
    const res = await api.registerUser(userInfo);
    if (!res || res.status === false) {
      dispatch(openAlertMessage(res?.message));
    }

    if (res?.status === true) {
      localStorage.setItem('user', JSON.stringify(res?.userInfo));
      dispatch(setUserInfo(res?.userInfo));
      navigate('/dashboard');
    }
  };
};

export default authActions;
