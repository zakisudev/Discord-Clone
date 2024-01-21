import { useEffect, useState } from 'react';
import { validateEmail } from '../utils/formValidator';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PrimaryButton from './PrimaryButton';
import { getActions } from '../store/actions/friendsActions';
import { connect } from 'react-redux';

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendRequests = () => {},
}) => {
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendRequests = () => {
    sendFriendRequests(
      {
        requestReceiverEmail: email,
      },
      handleCloseDialog
    );
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setEmail('');
  };

  useEffect(() => {
    setIsFormValid(validateEmail(email));
  }, [email, setIsFormValid]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography variant="h6" className="font-semibold">
            Invite a friend
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              Enter your friend's email address to send them an invitation to
              join.
            </Typography>
          </DialogContentText>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Email Address"
              className="
                border-2
                border-gray-300
                rounded-lg
                p-2
                mb-2
                focus:outline-none
                focus:ring-2
                focus:ring-gray-300
              "
            />
          </div>
        </DialogContent>
        <DialogActions>
          <PrimaryButton
            onClick={handleSendRequests}
            name="Send"
            disabled={!isFormValid}
            className="bg-green-500 hover:bg-green-500 transition-all duration-200 ease-in-out"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AddFriendDialog);
