import { useEffect, useState } from 'react';
import { validateEmail } from '../utils/formValidator';
import Dialog from '@mui/material/Dialog';
import { DialogTitle, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PrimaryButton from './PrimaryButton';

const AddFriendDialog = ({
  isDialogOpen,
  closeDialogHandler,
  sendFriendInvitation = () => {},
}) => {
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSendInvitation = (event) => {};

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
          <Typography>Invite a friend</Typography>
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
            onClick={handleSendInvitation}
            name="Send"
            disabled={!isFormValid}
            className="bg-green-500 hover:bg-green-500 transition-all duration-200 ease-in-out"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddFriendDialog;
