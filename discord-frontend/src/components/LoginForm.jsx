import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tooltip, styled } from '@mui/material';
import PrimaryButton from './PrimaryButton';
import { validateEmail, validatePassword } from '../utils/formValidator';
import { connect } from 'react-redux';
import { getActions } from '../store/actions/authActions';

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#36393f',
});

const LoginForm = ({ login }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!data?.email || !data?.password) return;
    if (!validateEmail(data?.email)) return;
    if (!validatePassword(data?.password)) return;

    login(data, navigate);
  };

  return (
    <div>
      <Wrapper>
        <h1 className="text-white font-bold uppercase mb-5">Login</h1>
        <form className="flex flex-col justify-center" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="uppercase text-white font-bold mb-1"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              placeholder="Enter Email"
              className="mb-2 w-[300px] h-10 rounded-sm border-none bg-[#727985] text-white px-2 placeholder:text-gray-800 shadow-sm shadow-slate-200"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="uppercase text-white font-bold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
              placeholder="Enter Password"
              className="mb-2 w-[300px] h-10 rounded-sm border-none bg-[#727985] text-white px-2 placeholder:text-gray-800 shadow-sm shadow-slate-200"
            />
          </div>

          <div className="flex flex-row items-center justify-end mt-1">
            <Link
              to="/forgot-password"
              className="text-white font-bold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Tooltip
            title={
              !data?.email || !data?.password
                ? 'Please fill all fields'
                : !validateEmail(data?.email)
                ? 'Please Enter a valid Email'
                : !validatePassword(data?.password)
                ? 'Please enter 8 characters or more with at least 1 lowercase, 1 uppercase, 1 number, and 1 special character'
                : ''
            }
            placement="right"
          >
            <div className="flex">
              <PrimaryButton
                name="Login"
                type="submit"
                disabled={
                  !data.email ||
                  !data.password ||
                  !validateEmail(data?.email) ||
                  !validatePassword(data?.password)
                }
              />
            </div>
          </Tooltip>

          <div className="flex flex-row justify-center mt-7 text-white font-bold">
            <p>Don't have an account? </p>
            <Link
              to="/register"
              className="text-blue-600 font-bold hover:underline pl-2"
            >
              Register
            </Link>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginForm);
