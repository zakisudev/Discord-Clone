import React from 'react';
import { Tooltip, styled } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import { validateEmail } from '../utils/formValidator';

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#36393f',
});

const ForgotForm = () => {
  const [email, setEmail] = React.useState('');

  const handleForgotLogin = (e) => {
    e.preventDefault();
    console.log('Forgot login');
  };

  return (
    <Wrapper>
      <form
        onSubmit={handleForgotLogin}
        className="flex flex-col gap-2 justify-center items-center mt-3"
      >
        <div className="flex flex-col gap-2 justify-center mt-3">
          <label htmlFor="email" className="uppercase text-white font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-2 w-[300px] h-10 rounded-sm border-none bg-[#727985] text-white px-2 placeholder:text-gray-800 shadow-sm shadow-slate-200"
          />
        </div>
        <Tooltip
          title={!validateEmail(email) ? 'Enter a valid Email' : ''}
          placement="right"
        >
          <div className="flex w-full">
            <PrimaryButton name="Send Email" disabled={!validateEmail(email)} />
          </div>
        </Tooltip>
      </form>
    </Wrapper>
  );
};

export default ForgotForm;
