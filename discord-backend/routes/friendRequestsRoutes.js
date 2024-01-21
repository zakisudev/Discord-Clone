const express = require('express');
const Joi = require('joi');
const verifyToken = require('../middlewares/auth');
const validator = require('express-joi-validation').createValidator({});
const router = express.Router();
const {
  postInvite,
  acceptFriendRequest,
  rejectFriendRequest,
} = require('../controllers/friendInvitationControllers');

const postFriendRequestSchema = Joi.object({
  requestReceiverEmail: Joi.string().email().required(),
});

const requestDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  '/invite',
  verifyToken,
  validator.body(postFriendRequestSchema),
  postInvite
);

router.post(
  '/accept',
  verifyToken,
  validator.body(requestDecisionSchema),
  acceptFriendRequest
);

router.post(
  '/reject',
  verifyToken,
  validator.body(requestDecisionSchema),
  rejectFriendRequest
);

module.exports = router;
