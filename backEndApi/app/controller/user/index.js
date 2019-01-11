const express = require('express');
const User = require('../../../lib/service/user');
const router = express.Router();
var path = require('path');
const Models = require('../../models');
/**
 * This is the controller class for the User functionality
 */
class UserController {
  /**
   * [getUser function to get the user data]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getUser(req, res) {
    const params = {};
    params.userId = req.params.id;
    const UserObj = new User();
    UserObj.getUser(params, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        msg: result.msg || 'Successfully got the desired User.',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }
  /**
   * [getAllUser function  to get all the users]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getAllUser(req, res) {
    const params = {};
    const UserObj = new User();
    UserObj.getAllUser(params, (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(result);
    });
  }

  searchUser(req,res){
    const params = {};
    params.search = req.params.id;
    const UserObj = new User();
    UserObj.searchUser(params, (err, result) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json(result);
    });
  }

}
const UserRoute = new UserController();

router.get('/search/:id', UserRoute.searchUser);
router.get('/', UserRoute.getAllUser);
router.get('/:id', UserRoute.getUser);

module.exports = router;
