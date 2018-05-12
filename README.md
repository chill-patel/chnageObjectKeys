# KeyChange

Change you object Keys base on model you set

### Installing

```
npm install keychange-model
```

### Usage
```
 const key changekey = require('keychange-model');
 let data = {
     name: 'BOB',
     age: 25,
     address: {
         street:101
     }
 }

 let model = {
     username: 'name',
     age: 'age',
     'add.road': 'address.street'
 }

let changes = changekey(data, model);
changes will equal { username: 'BOB', age: 25, add: { road: 101 } } 

```



