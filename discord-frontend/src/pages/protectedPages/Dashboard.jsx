import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlertNotification from '../../components/AlertNotification';
import AppBar from './AppBar';
import FriendsSideBar from './FriendsSideBar';
import Messenger from './Messenger';
import SideBar from './SideBar';
import { setUserInfo } from '../../store/actions/authActions';
import { connectWithSocketServer } from '../../webRTC/socketConnection';

const Dashboard = ({ setUserInfo }) => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('user');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setUserInfo(JSON.parse(userInfo));
      connectWithSocketServer(JSON.parse(userInfo));
    }
  }, [navigate, userInfo, setUserInfo]);

  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      <AlertNotification />
    </div>
  );
};

const mapActionsToProps = {
  setUserInfo,
};

export default connect(null, mapActionsToProps)(Dashboard);
