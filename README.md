# zap:
#### a tiny testing tool for [node.js](http://nodejs.org)

zap was inspired by a conversation on the freenode #nodejs channel, in which ry told me that `require('assert')` was all the testing framework I needed. I was enlightened, and modelled this after a [small makefile](https://gist.github.com/836511) that ry wrote.

zap does a little more than that makefile. I wanted:

 - multiple tests per file, in the style of [expresso](http://github.com/visionmedia/expresso),
 - assurance that the tests actually finished (via `test.done()`),
 - pretty output.

## Example

#### test/winner.test.js

    var assert = require('assert')
    module.exports = {
      setup: function (test) {
        test.is_awesome = true
      },
      'test that thingy': function (test) {
        assert.ok(test.is_awesome, 'test passed!')
        test.done()
      }
      'test asynchronous things': function (test) {
        process.nextTick(function () {
          assert.ok(test.is_awesome)
          test.done()
        })
      }
    }

#### output

<pre style='background-color: black; color: white; border-color: black'>
<b>$</b> zap
<span style='color: #d338d3'>winner</span>/test that thingy... passed
<span style='color: #d338d3'>winner</span>/test asynchronous things... passed
</pre>

#### running just one test

<pre style='background-color: black; color: white; border-color: black'>
<b>$</b> zap --one test/winner.test.js "test that thingy"
<span style='color: #d338d3'>winner</span>/test that thingy... passed
</pre>

## Installing

Just `npm install -g zap`.

## Details

Each test is run in a separate node instance. zap `require()`s your module once to work out what tests are in it, then once for each test in a new node process. So it's a bad idea to connect to databases or do any real work in the top level of your test file&mdash;though defining helper functions and so on is fine.

Test module exports called `setup` or `teardown` are treated specially: `setup` will be called before your test runs, and `teardown` will be called after the test finishes.

Call `test.fail("a splode")` to escape the test early (though `assert.ok(false)` will do just fine).

If your tests are not in the form of `test/(subdir/)?name.test.js`, you can tell zap where your tests are by giving the locations on the command line:

<pre style='background-color: black; color: white; border-color: black'>
<b>$</b> zap spec/**/*.js
</pre>
