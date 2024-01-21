/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { resetFriends } from '../store/actions/friendsActions';
import { connect } from 'react-redux';
import { getActions } from '../store/actions/authActions';

const MenuIntroduction = ({ resetFriends, logout }) => {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleLogout = () => {
    logout(navigate);
    resetFriends();
    localStorage.clear();
  };

  const handleClickOutside = (event) => {
    if (
      dropDown &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDown]);

  return (
    <div
      className="flex flex-col relative cursor-pointer"
      onClick={toggleDropDown}
      ref={dropdownRef}
    >
      <ArrowDropDownCircleIcon />
      {dropDown && (
        <div
          id="dropdown"
          className="flex flex-col absolute top-7 right-0 bg-white rounded-md px-3 py-1"
        >
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
    resetFriends,
  };
};

export default connect(null, mapActionsToProps)(MenuIntroduction);
