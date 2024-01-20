import { styled } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PrimaryButton from './PrimaryButton';
import { Tooltip } from '@mui/material';
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

const RegisterForm = ({ register }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle Register
  const handleRegister = (e) => {
    e.preventDefault();

    register(
      {
        username: data.username,
        email: data.email,
        password: data.password,
      },
      navigate
    );
  };

  return (
    <div>
      <Wrapper>
        <h1 className="text-white font-bold uppercase mb-5">Register</h1>
        <form
          className="flex flex-col justify-center"
          onSubmit={handleRegister}
        >
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="uppercase text-white font-bold mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
              placeholder="Enter Username"
              className="mb-2 w-[300px] h-10 rounded-sm border-none bg-[#727985] text-white px-2 placeholder:text-gray-800 shadow-sm shadow-slate-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="uppercase text-white font-bold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
              placeholder="Enter Email"
              className="mb-2 w-[300px] h-10 rounded-sm border-none bg-[#727985] text-white px-2 placeholder:text-gray-800 shadow-sm shadow-slate-200"
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="uppercase text-white font-bold mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              required
              placeholder="Enter Password again"
              className="mb-2 w-[300px] h-10 rounded-sm border-none bg-[#727985] text-white px-2 placeholder:text-gray-800 shadow-sm shadow-slate-200"
            />
          </div>

          {/* Button */}
          <Tooltip
            title={
              !data?.email || !data?.password
                ? 'Please fill all fields'
                : !validateEmail(data?.email)
                ? 'Please Enter a valid Email'
                : !validatePassword(data?.password)
                ? 'Please enter 8 characters or more with at least 1 lowercase, 1 uppercase, 1 number, and 1 special character'
                : data.password !== data.confirmPassword
                ? 'Passwords do not match'
                : ''
            }
            placement="right"
          >
            <div className="flex">
              <PrimaryButton
                name="Register"
                type="submit"
                disabled={
                  !data.email ||
                  !data.password ||
                  data.password !== data.confirmPassword ||
                  !validateEmail(data?.email) ||
                  !validatePassword(data?.password)
                }
              />
            </div>
          </Tooltip>

          <div className="flex flex-row justify-center mt-7 text-white font-bold">
            <p>Already have an account? </p>
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline pl-2"
            >
              Login
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

export default connect(null, mapActionsToProps)(RegisterForm);
