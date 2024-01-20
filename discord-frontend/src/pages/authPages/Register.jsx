import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import AuthBox from '../../components/AuthBox';
import RegisterForm from '../../components/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
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
