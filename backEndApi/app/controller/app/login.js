const express = require('express');
const Models = require('../../models');
const router = express.Router();
const jwt = require('jsonwebtoken');
/**
 * [loginUser function is called when user logs in and a new session is created for that user]
 * @param  {Object} req [description]
 * @param  {Object} res [description]
 * @return {[type]}     [description]
 */
function loginUser(req, res) {
  const userName = req.body.userName; // required
  const password = req.body.password; // required
  Models.User.findOne(
    { userName: userName, password: password },
    (errorInFetch, userDetails) => {
      if (errorInFetch) return res.status(500).json(errorInFetch);
      if (userDetails === null)
        return res.status(400).json({ msg: 'no user found' });

      const token = jwt.sign(
        {
          userId: userDetails._id,
          userName: userDetails.userName,
          email: userDetails.email,
        },
        'SuperSecret',
        {
          expiresIn: '24h',
        },
      );

      req.session.userName = userDetails.userName;
      req.session.email = userDetails.email;
      req.session.timeZone = userDetails.timeZone;
      res.status(200).json({
        user: {
          timeZone: userDetails.timeZone,
          userName: userDetails.userName,
          email: userDetails.email,
          userId: userDetails._id,
        },
        token: token,
        isSessionActive: true,
        isLoggedIn: true,
      });
    },
  );
}

router.post('/', loginUser);

module.exports = router;
