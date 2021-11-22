const async = require('async')
const fs = require('fs')
const request = require('request')

describe('CSV API - Load Test', function() {
  it('returns expected response 100 times', function(done) {
    const task = function(next) {
      request.post({
        url: 'http://localhost:3000/csv',
        formData: {
          csv: fs.createReadStream('./test/fixtures/sample.csv')
        }
      }, function(err, body) {
        expect(err).toBe(null)
        expect(body.status).toBe(200)

        next()
      })
    }
    const tasks = []

    for (let i = 0; i < 100; i++) {
      tasks.push(task)
    }

    async.parallel(tasks, done)
  })
})
