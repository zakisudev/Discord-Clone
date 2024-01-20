import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthBox from '../../components/AuthBox';
import LoginForm from '../../components/LoginForm';
import AlertNotification from '../../components/AlertNotification';
import { setUserInfo } from '../../store/actions/authActions';

const Login = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('user');

  useEffect(() => {
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <AuthBox>
        <Typography variant="h5" sx={{ color: '#fff' }} align="center">
          Welcome
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff' }} align="center">
          We're excited to have you here!
        </Typography>
        <LoginForm />
        <AlertNotification />
      </AuthBox>
    </div>
  );
};

export default Login;
