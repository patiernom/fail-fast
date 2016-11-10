# fp-error-handling

[![GitHub version][fp-error-handling-fury-image]][fp-error-handling-fury-url]
[![Dependency Status][fp-error-handling-dependencies-image]][fp-error-handling-dependencies-url]
[![devDependency Status][fp-error-handling-devdependencies-image]][fp-error-handling-devdependencies-url]
[![Build Status][fp-error-handling-travis-image]][fp-error-handling-travis-url]
[![Coverage Status][fp-error-handling-coverage-image]][fp-error-handling-coverage-url]

# Functional Error Handling

A fail-fast module for idiomatic splitting error handling from successful continuation.

## Installation

The easiest way is to keep `fp-error-handling` as a devDependency in your `package.json`.
```json
{
  "devDependencies": {
    "fp-error-handling": "1.0.0"
  }
}
```

You can simple do it by:
```bash
npm install fp-error-handling --save-dev
```

## Example
```javascript
var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db) {
  if(err) {
    console.log(err);
    return;
  }
  
  console.log("Connected correctly to server");

  db.close();
});

```

... _becomes_ ...


```javascript
var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/myproject',
    failFast = require('fp-error-handling');

MongoClient.connect(url, failFast(
    function(err){
        console.log(err);
    },
    function(db){
        console.log("Connected correctly to server");
        db.close();
    }
));
```


## Usage
`fp-error-handling` is a function that takes the following arguments:

* callback - (optional) the callback function that `fp-error-handling` will split error handling for,
* continuation - (optional) a function where successful continuation proceeds,
* thisArg - (optional) an object that will be used as the continuation's this context.


## Release History

_(Nothing yet)_


## License

Licensed under the MIT license.

[fp-error-handling-fury-image]: https://badge.fury.io/js/fail-fast.svg
[fp-error-handling-fury-url]: https://badge.fury.io/js/fail-fast
[fp-error-handling-dependencies-image]: https://david-dm.org/patiernom/fp-error-handling.svg
[fp-error-handling-dependencies-url]: https://david-dm.org/patiernom/fp-error-handling
[fp-error-handling-devdependencies-image]: https://david-dm.org/patiernom/fp-error-handling/dev-status.svg
[fp-error-handling-devdependencies-url]: https://david-dm.org/patiernom/fp-error-handling#info=devDependencies
[fp-error-handling-peerdependencies-image]: https://david-dm.org/patiernom/fp-error-handling/peer-status.svg
[fp-error-handling-peerdependencies-url]: https://david-dm.org/patiernom/fp-error-handling#info=peerDependencies
[fp-error-handling-travis-image]: https://travis-ci.org/patiernom/fail-fast.svg?branch=master
[fp-error-handling-travis-url]: https://travis-ci.org/patiernom/fail-fast
[fp-error-handling-coverage-image]: https://coveralls.io/repos/github/patiernom/fail-fast/badge.svg?branch=master
[fp-error-handling-coverage-url]: https://coveralls.io/github/patiernom/fail-fast?branch=master
