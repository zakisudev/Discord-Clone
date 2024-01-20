import { Typography } from '@mui/material';

const FriendsTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      }}
    >
      {title}
    </Typography>
  );
};

export default FriendsTitle;
