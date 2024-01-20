import { Typography } from '@mui/material';
import AuthBox from '../../components/AuthBox';
import ForgotForm from '../../components/ForgotForm';

const ForgotPassword = () => {
  return (
    <div>
      <AuthBox>
        <Typography variant="h5" sx={{ color: '#fff' }} align="center">
          Reset Your Password
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff' }} align="center">
          Enter a valid registered email
        </Typography>
        <ForgotForm />
      </AuthBox>
    </div>
  );
};
export default ForgotPassword;
