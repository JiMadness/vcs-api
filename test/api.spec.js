const app = require('../app')
const fs = require('fs')
const request = require('supertest')

describe('CSV API', function() {
  describe('POST /csv', function() {
    describe('if no/invalid file was attached', function() {
      it('returns status code 400', function(done) {
        request(app)
          .post('/csv')
          .expect(400, done)
      })
    })

    it('returns expected csv file', function(done) {
      request(app)
        .post('/csv')
        .attach('csv', 'test/fixtures/sample.csv')
        .expect(200, fs.readFileSync('test/fixtures/output.csv', 'utf8'), done)
    })
  })
})
