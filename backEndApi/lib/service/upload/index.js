const Models = require('../../../app/models');
const async = require('async');
const Excel = require('exceljs');
/**
 * This is the service class for the Upload functionalist all core business logic is defined here
 */
class Upload {
  /**
   * [getMyUpload function to get the filtered data in a desired format]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getMyUpload(params, callback) {
    if (!params.platform)
      return callback({ msg: 'Incorrect payload', success: false });

    const aggregate = Models.UserData.aggregate();
    aggregate.match({});
    aggregate.append({
      $group: {
        _id: '$platform',
        count: { $sum: 1 },
        userId: { $push: '$userId' },
      },
    });

    const distinctQuery = Models.UserData.distinct('userId');

    async.parallel(
      [
        cb => {
          aggregate.exec(cb);
        },
        cb => {
          distinctQuery.exec(cb);
        },
      ],
      (error, result) => {
        if (error) return callback(result);

        const searchPlatform = result[0].filter(item => {
          return item._id === params.platform;
        });
        const totalCount = result[0].reduce((sum = 0, item) => {
          return (sum = sum + item.count);
        }, 0);
        const responseObj = {
          totalUid: totalCount,
          uniqueUid: result[1] ? result[1].length : totalCount,
          sharedPercentage:
            ((searchPlatform[0] ? searchPlatform[0].count : 0) / totalCount) *
            100,
        };

        return callback(null, responseObj);
      },
    );
  }
  /**
   * [getAllUpload function to get all the upload data]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getAllUpload(params, callback) {
    const query = Models.UserData.find();
    query.where({});
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      const workbook = new Excel.Workbook();
      workbook.creator = 'Aditya';
      workbook.lastModifiedBy = 'Aditya';
      workbook.created = new Date();
      workbook.modified = new Date();
      const sheet = workbook.addWorksheet('Sheet' + new Date());
      sheet.columns = [
        { header: 'userId', key: 'UID', width: 30 },
        { header: 'platform', key: 'platform', width: 30 },
      ];
      const row = [];
      result.forEach(element => {
        const arr = [element.userId, element.platform];
        row.push(arr);
      });
      sheet.addRows(row);
      return callback(null, { workbook: workbook });
    });
  }
  /**
   * [getUploadStatus function to get all upload status]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getUploadStatus(params, callback) {
    const query = Models.FileUpload.find();
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      return callback(null, result);
    });
  }
}

module.exports = Upload;
