var assert = require('assert')

module.exports = {
 'test that thingy': function (test) {
   test.fail("should end...")
   test.finish()
 }
}
