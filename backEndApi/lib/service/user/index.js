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
  /**
   * [searchUser search any user]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  searchUser(params, callback) {
    const start = new Date().getTime();
    if (params.search && params.search.length < 3)
      return callback({ msg: 'search string is too small' });

    const query = Models.UserData.aggregate();

    const search = new RegExp(params.search, 'ig');
    query.match({
      $or: [
        { firstName: search },
        { middleName: search },
        { lastName: search },
      ],
    });
    query.exec((error, result) => {
      if (error) return callback(error);

      // mapping fields which matched with the query and giving a rank 1
      // higher to the name which start with the search string
      result = result
        .map(item => {
          if (item.firstName.match(search)) {
            if (item.firstName.match(new RegExp('^' + params.search, 'i')))
              return { sortItem: item.firstName, rank: 1, ...item };
            else return { sortItem: item.firstName, rank: 0, ...item };
          } else if (item.middleName.match(search)) {
            if (item.middleName.match(new RegExp('^' + params.search, 'i')))
              return { sortItem: item.middleName, rank: 1, ...item };
            else return { sortItem: item.middleName, rank: 0, ...item };
          } else {
            if (item.lastName.match(new RegExp('^' + params.search, 'i')))
              return { sortItem: item.lastName, rank: 1, ...item };
            else return { sortItem: item.lastName, rank: 0, ...item };
          }
        })
        .sort((a, b) => {
          return b.rank - a.rank;
        });

      // Filtering and sorting the documents based on the rank and the length of the string
      result = result
        .filter(element => {
          return element.rank === 1;
        })
        .sort((a, b) => {
          return a.sortItem.length - b.sortItem.length;
        })
        .concat(
          result
            .filter(element => {
              return element.rank === 0;
            })
            .sort((a, b) => {
              return a.sortItem.length - b.sortItem.length;
            }),
        );

      console.log(new Date().getTime() - start, 'total time is this');
      return callback(null, result);
    });
  }
}

module.exports = User;
