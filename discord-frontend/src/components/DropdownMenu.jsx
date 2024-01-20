import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

export default function MenuIntroduction() {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
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
}
