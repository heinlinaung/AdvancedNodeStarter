const AWS = require('aws-sdk')
const S3 = require('aws-sdk/clients/s3')
const uuid = require('uuid/v1')
const keys = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')
const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
  app.get('/api/upload', requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`
    s3.getSignedUrl('putObject', {
      Bucket: 'werkztech-dev',
      ContentType: 'jpeg',
      Key: key
    }, (err, url) => {
      console.log('gg', url)
      res.send({ key, url })
    })
  })
}
