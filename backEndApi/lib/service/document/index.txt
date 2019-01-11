const Models = require('../../../app/models');
/**
 * This is the service class for the Document functionalist all core business logic is defined here
 */
class Document {
  /**
   * [getAllDocument function to get all the Document data]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  getDocuemnt(params, callback) {
    const query = Models.Document.findOne();
    query.where({});
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);
      return callback(null, result);
    });
  }
  /**
   * [getDocumentStatus function to get all Document status]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  updateDocument(params, callback) {
    const query = Models.Document.findOne();
    query.where({
      _id: params.documentId,
      lockedBy: params.userId,
      status: 'locked',
    });
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);

      if (result === null)
        return callback({ msg: 'not authorized to edit this document' });

      Models.Document.updateOne(
        { _id: params.documentId },
        { text: params.text },
        (error, result) => {
          if (error) return callback(error);

          return callback(null, result);
        },
      );
    });
  }
  /**
   * [lockDocument description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  lockDocument(params, callback) {
    const query = Models.Document.findOne();
    query.where({ _id: params.documentId, status: 'unlocked', lockedBy: null });
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);
      if (result === null)
        return callback({ msg: 'document is already locked' });

      Models.Document.updateOne(
        { _id: params.documentId },
        { lockedBy: params.userId, status: 'locked' },
        (error, result) => {
          if (error) return callback(error);

          return callback(null, result);
        },
      );
    });
  }
  /**
   * [unlockDocument description]
   * @param  {[type]}   params   [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  unlockDocument(params, callback) {
    const query = Models.Document.findOne();
    query.where({
      _id: params.documentId,
      status: 'locked',
      lockedBy: params.userId,
    });
    query.lean();
    query.exec((error, result) => {
      if (error) return callback(error);
      if (result === null)
        return callback({ msg: 'document is not locked by you' });

      Models.Document.updateOne(
        { _id: params.documentId },
        { lockedBy: null, status: 'unlocked' },
        (error, result) => {
          if (error) return callback(error);

          return callback(null, result);
        },
      );
    });
  }
  /**
   * [createDocument description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  createDocument(params, callback) {
    Models.Document.create(
      { status: 'unlocked', lockedBy: null },
      (error, result) => {
        if (error) return callback(error);

        return callback(null, result);
      },
    );
  }
}

module.exports = Document;
