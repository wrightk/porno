
# porno [![npm version](https://badge.fury.io/js/porno.svg)](https://badge.fury.io/js/porno)
(to view parameters for each function, refer to the [API Page](http://api.porn.com)) 
## Main Functions
All functions return a promise

### videoSearch
Example:
```js
var porno = require('porno');
porno.videoSearch({
search: 'Random video'
}).then(response => {
console.log(response.result);
}).catch(console.log)
```
### videoIsActive
Example:
```js
var porno = require('porno');
porno.videoIsActive(28).then(response => {
console.log(response.result.active);
}).catch(console.log)
```
