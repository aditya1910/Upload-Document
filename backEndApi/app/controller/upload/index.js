const express = require('express');
const Upload = require('../../../lib/service/upload');
const multer = require('multer');
const router = express.Router();
var path = require('path');
var Excel = require('exceljs');
var fs = require('fs');
var csv = require('fast-csv');
const Models = require('../../models');
const base64 = require('file-base64');
/**
 * This is the controller class for the Upload functionality
 */
class UploadController {
  /**
   * [createUpload this is the controller function which take care of the new Upload and also change the status of an upload]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  createUpload(req, res) {
    let fileName = Date.now().toString();
    let originalFileName = '';
    const storage = multer.diskStorage({
      destination: function(req, file, callback) {
        callback(null, __dirname + '/');
      },
      filename: function(req, file, callback) {
        originalFileName = file.originalname;
        fileName = fileName + path.extname(file.originalname);
        callback(null, fileName);
      },
    });

    const upload = multer({ storage: storage }).single('csvFile');

    upload(req, res, function(err, result) {
      if (err) {
        return res.status(500).json({ msg: 'Error uploading file.' });
      }
      // Insert he Status of the file here

      Models.FileUpload.create(
        { fileName: originalFileName },
        (uploadErr, uploadResult) => {
          if (uploadErr)
            return res
              .status(500)
              .json({ msg: 'unable to process your require try again' });
          res.status(201).json({ msg: 'Success' });

          var stream = fs.createReadStream(__dirname + '/' + fileName);
          var csvStream = csv()
            .on('data', function(data) {
              const objectToInsert = {
                userId: data[0] ? data[0] : '',
                platform: data[1] ? data[1] : '',
              };
              Models.UserData.create(
                objectToInsert,
                (insertErr, insertResult) => {
                  //console.log(insertErr, insertResult);
                },
              );
            })
            .on('end', function() {
              Models.FileUpload.updateOne(
                { _id: uploadResult._id },
                { status: 'completed' },
                (updateErr, updateResult) => {
                  console.log(updateErr, updateResult);
                },
              );
            });

          stream.pipe(csvStream);
        },
      );
    });
  }

  /**
   * [getUpload this function is called when the client request for the Upload details]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getUpload(req, res) {
    const params = {};
    params.platform = req.params.id;
    const UploadObj = new Upload();
    UploadObj.getMyUpload(params, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        msg: result.msg || 'Successfully got the desired Upload.',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }
  /**
   * [getAll this is the controller to get the desired download in excel format]
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getAll(req, res) {
    const params = {};
    const UploadObj = new Upload();
    UploadObj.getAllUpload(params, (err, result) => {
      if (err) return res.status(500).json(err);
      const { workbook } = result;
      let fileName = Date.now().toString() + '.xlsx';
      console.log(workbook);
      workbook.xlsx
        .writeFile(__dirname + '/' + fileName)
        .then(file => {
          const extension = 'vnd.ms-excel';
          const options = {
            'Content-Type': `application/${extension}`,
            'Content-disposition': `attachment; filename="${fileName}"`,
          };
          const base64String = new Buffer(
            fs.readFileSync(__dirname + '/' + fileName),
          ).toString('base64');

          const download = Buffer.from(
            base64String.toString('utf-8'),
            'base64',
          );
          res.writeHead(200, options);
          res.end(download);
        })
        .catch(error => {
          return res.status(500).json({
            isError: true,
            msg: 'unable to process your request try again.',
            error: error,
          });
        });
    });
  }
  /**
   * [getUploadStatus function to get the upload status of all the files which is been uploaded]
   * @param  {[type]} res [description]
   * @param  {[type]} req [description]
   * @return {[type]}     [description]
   */
  getUploadStatus(req, res) {
    const params = {};
    const UploadObj = new Upload();
    UploadObj.getUploadStatus(params, (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({
        msg: result.msg || 'Successfully got the desired Upload.',
        isError: false,
        isFetched: true,
        data: result,
      });
    });
  }
}
const UploadRoute = new UploadController();

router.post('/', UploadRoute.createUpload);
router.get('/download', UploadRoute.getAll);
router.get('/status', UploadRoute.getUploadStatus);
router.get('/:id', UploadRoute.getUpload);
module.exports = router;