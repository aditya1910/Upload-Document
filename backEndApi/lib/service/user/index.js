const Models = require('../../../app/models');

/**
 * This is the service class for the Upload functionalist all core business logic is defined here
 */
class User {
  /**
   * [getUser description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getUser(params, callback) {
    if (!params.userId)
      return callback({ msg: 'Incorrect payload', success: false });

    const query = Models.User.findOne();
    query.where({ _id: params.userId });
    query.select({ password: 0 });
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
  /**
   * [getUser description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getAllUser(params, callback) {
    const query = Models.User.find();
    query.where({});
    query.select({ password: 0 });
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
}

module.exports = User;
