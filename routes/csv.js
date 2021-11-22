const express = require('express')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const pythonShell = require('python-shell').PythonShell
const router = express.Router()
const fileFilter = function (req, file, next) {
  if (file?.mimetype !== 'text/csv') {
    return next(null, false)
  } else {
    next(null, true)
  }
}
const upload = multer({
  dest: path.join(__dirname, '/..', 'temp'),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
})

router.post('/', upload.single('csv'), function (req, res, next) {
  if (!req.file) {
    res.status(400).send('Invalid file.')
  } else {
    pythonShell.run(
      'lib/process_file.py',
      {
        args: [req.file.path]
      },
      function (err, results) {
        fs.unlink(req.file.path, function () {})
        if (err) {
          next(err)
        } else {
          res.set('content-type', 'text/csv')
          res.send(results.join('\n'))
        }
      }
    )
  }
})

module.exports = router
