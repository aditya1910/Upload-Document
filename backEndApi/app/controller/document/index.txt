const express = require('express');
const Docuemnt = require('../../../lib/service/document');
const router = express.Router();
var path = require('path');
const Models = require('../../models');
/**
 * This is the controller class for the User functionality
 */
class DocumentController {
  /**
   * [updateDocument function to update the document]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  updateDocument(req, res) {
    const params = req.body;
    params.userId = req.decoded.userId;
    params.documentId = req.params.id || null;
    const documentObj = new Docuemnt();
    documentObj.updateDocument(params, (error, result) => {
      if (error) return res.status(500).json(error);

      return res.status(200).json({ msg: 'success' });
    });
  }

  /**
   * [getDocuemnt function to fetch the document]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getDocuemnt(req, res) {
    const params = {};
    //params.documentId = req.params.id;
    const documentObj = new Docuemnt();
    documentObj.getDocuemnt(params, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        msg: 'Success',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }
  /**
   * [lockDocument description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  lockDocument(req, res) {
    const params = {};
    params.documentId = req.params.id;
    params.userId = req.decoded.userId;
    const documentObj = new Docuemnt();
    documentObj.lockDocument(params, (error, result) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(result);
    });
  }
  /**
   * [unlockDocument description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  unlockDocument(req, res) {
    const params = {};
    params.documentId = req.params.id;
    params.userId = req.decoded.userId;
    const documentObj = new Docuemnt();
    documentObj.unlockDocument(params, (error, result) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(result);
    });
  }
  /**
   * [createDocument description]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  createDocument(req, res) {
    const params = {};
    const documentObj = new Docuemnt();
    documentObj.createDocument(params, (error, result) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(result);
    });
  }
}
const DocumentRoute = new DocumentController();

router.get('/', DocumentRoute.getDocuemnt);
router.post('/', DocumentRoute.createDocument);
router.put('/lock/:id', DocumentRoute.lockDocument);
router.put('/unlock/:id', DocumentRoute.unlockDocument);
router.put('/:id', DocumentRoute.updateDocument);

module.exports = router;
