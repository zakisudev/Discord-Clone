import { Typography } from '@mui/material';
import { connect } from 'react-redux';

const ChosenOptionLabel = ({ name }) => {
  return (
    <Typography
      sx={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#fff',
        marginRight: '1rem',
      }}
    >
      {name ? name : ''}
    </Typography>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.chat.chosenChatDetails?.friend?.username,
  };
};

export default connect(mapStateToProps)(ChosenOptionLabel);
