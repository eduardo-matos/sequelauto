# Sequelauto

[![Build Status](https://travis-ci.org/eduardo-matos/sequelauto.svg?branch=master)](https://travis-ci.org/eduardo-matos/sequelauto)
[![npm version](https://badge.fury.io/js/sequelauto.svg)](https://badge.fury.io/js/sequelauto)
[![Coverage Status](https://coveralls.io/repos/github/eduardo-matos/sequelauto/badge.svg?branch=master)](https://coveralls.io/github/eduardo-matos/sequelauto?branch=master)

Automatically generate records on database for Sequelize's model.

## Usage

Let's say you have the following model:

```js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('sqlite://');

module.exports = User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  birth: Sequelize.DATE,
  height: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});
```

It would be a pain in the ass to create dummy entries on the database manually.
That's when sequelauto comes in handy:

```js
const User = require('./models');
const sequelauto = require('sequelauto');

sequelauto.create(User).then(user => {
  // "user" is a sequelize model instance!
  console.log(user.dataValues); // {id: 1, name: "bjda2sghat", "birth": null, "height": 1.3}
});
```

You can also create many instances at once:

```js
sequelauto.createMany(User, 10).then(users => {
  // "users" is an array of all created users
  console.log(users.map(u => u.dataValues)); // [{id: 1, name: "bjda2sghat", "birth": null, "height": 1.3}, ...]
});
```

There is also a possibility to define your own values:

```js
sequelauto.create(User, { name: 'John Doe', height: 5.8 }).then(user => {
  console.log(user.dataValues); // [{id: 1, name: "John Doe", "height": 5.8, "birth": null}, ...]
});
```

By default nullable fields remain null.

## Supported field types

1. `STRING`
1. `CHAR`
1. `TEXT`
1. `TINYINT`
1. `SMALLINT`
1. `MEDIUMINT`
1. `INTEGER`
1. `BIGINT`
1. `FLOAT`
1. `DOUBLE`
1. `DECIMAL`
1. `REAL`
1. `BOOLEAN`
1. `ENUM`
1. `DATE`
1. `DATEONLY`
1. `TIME`
1. `UUID`
1. `JSON`
1. `JSONB`
1. `BLOB`
