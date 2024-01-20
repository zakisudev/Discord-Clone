import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

const BoxWrapper = styled('div')({
  display: 'flex',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#5865f2',
});

const AuthBox = (props) => {
  return (
    <BoxWrapper>
      <Box
        sx={{
          width: '500px',
          height: 'fit-content',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          background: '#36393f',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};

export default AuthBox;
