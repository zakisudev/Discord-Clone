import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthBox from '../../components/AuthBox';
import RegisterForm from '../../components/RegisterForm';
import { setUserInfo } from '../../store/actions/authActions';

const Register = () => {
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
          Join now!
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff' }} align="center">
          Start your social adventure
        </Typography>
        <RegisterForm />
      </AuthBox>
    </div>
  );
};

export default Register;
