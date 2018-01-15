import Sequelize from 'sequelize';
import db from './db';


export const Nulls = db.define('nulls', {
  field_nullstring: { type: Sequelize.STRING, allowNull: true },
  field_nullchar: { type: Sequelize.CHAR(32), allowNull: true },
  field_nulltext: { type: Sequelize.TEXT, allowNull: true },
  field_nulltinyint: { type: Sequelize.TINYINT, allowNull: true },
  field_nullsmallint: { type: Sequelize.SMALLINT, allowNull: true },
  field_nullmediumint: { type: Sequelize.MEDIUMINT, allowNull: true },
  field_nullinteger: { type: Sequelize.INTEGER, allowNull: true },
  field_nullbigint: { type: Sequelize.BIGINT, allowNull: true },
  field_nullfloat: { type: Sequelize.FLOAT, allowNull: true },
  field_nulldouble: { type: Sequelize.DOUBLE, allowNull: true },
  field_nulldecimal: { type: Sequelize.DECIMAL, allowNull: true },
  field_nullreal: { type: Sequelize.REAL, allowNull: true },
  field_nullboolean: { type: Sequelize.BOOLEAN, allowNull: true },
  field_nullenum: { type: Sequelize.ENUM, allowNull: true, values: ['foo', 'bar', 'baz'] },
  field_nulldate: { type: Sequelize.DATE, allowNull: true },
  field_nulldateonly: { type: Sequelize.DATEONLY, allowNull: true },
  field_nulltime: { type: Sequelize.TIME, allowNull: true },
  field_nulluuid: { type: Sequelize.UUID, allowNull: true },
  field_nulljson: { type: Sequelize.JSON, allowNull: true },
  field_nulljsonb: { type: Sequelize.JSONB, allowNull: true },
  field_nullblob: { type: Sequelize.BLOB, allowNull: true },
}, {
  timestamps: false,
});

export const Strings = db.define('strings', {
  field_string: { type: Sequelize.STRING, allowNull: false },
  field_char: { type: Sequelize.CHAR(32), allowNull: false },
  field_text: { type: Sequelize.TEXT, allowNull: false },
}, {
  timestamps: false,
});

export const Numbers = db.define('numbers', {
  field_tinyint: { type: Sequelize.TINYINT, allowNull: false },
  field_smallint: { type: Sequelize.SMALLINT, allowNull: false },
  field_mediumint: { type: Sequelize.MEDIUMINT, allowNull: false },
  field_integer: { type: Sequelize.INTEGER, allowNull: false },
  field_bigint: { type: Sequelize.BIGINT, allowNull: false },
  field_float: { type: Sequelize.FLOAT, allowNull: false },
  field_double: { type: Sequelize.DOUBLE, allowNull: false },
  field_decimal: { type: Sequelize.DECIMAL, allowNull: false },
  field_real: { type: Sequelize.REAL, allowNull: false },
}, {
  timestamps: false,
});

export const Booleans = db.define('boolean', {
  field_boolean: { type: Sequelize.BOOLEAN, allowNull: false },
}, {
  timestamps: false,
});

export const Enums = db.define('enum', {
  field_enum: { type: Sequelize.ENUM, allowNull: false, values: ['foo', 'bar', 'baz'] },
}, {
  timestamps: false,
});

export const Datetimes = db.define('datetime', {
  field_date: { type: Sequelize.DATE, allowNull: false },
  field_dateonly: { type: Sequelize.DATEONLY, allowNull: false },
  field_time: { type: Sequelize.TIME, allowNull: false },
}, {
  timestamps: false,
});

export const Uuids = db.define('uuid', {
  field_uuid: { type: Sequelize.UUID, allowNull: false },
}, {
  timestamps: false,
});

export const Jsons = db.define('json', {
  field_json: { type: Sequelize.JSON, allowNull: false },
  field_jsonb: { type: Sequelize.JSONB, allowNull: false },
}, {
  timestamps: false,
});

export const Blobs = db.define('blob', {
  field_blob: { type: Sequelize.BLOB, allowNull: false },
}, {
  timestamps: false,
});

export const Customs = db.define('customs', {
  field_nullstring: { type: Sequelize.STRING, allowNull: true },
  field_nullchar: { type: Sequelize.CHAR(32), allowNull: true },
  field_nulltext: { type: Sequelize.TEXT, allowNull: true },
  field_nulltinyint: { type: Sequelize.TINYINT, allowNull: true },
  field_nullsmallint: { type: Sequelize.SMALLINT, allowNull: true },
  field_nullmediumint: { type: Sequelize.MEDIUMINT, allowNull: true },
  field_nullinteger: { type: Sequelize.INTEGER, allowNull: true },
  field_nullbigint: { type: Sequelize.BIGINT, allowNull: true },
  field_nullfloat: { type: Sequelize.FLOAT, allowNull: true },
  field_nulldouble: { type: Sequelize.DOUBLE, allowNull: true },
  field_nulldecimal: { type: Sequelize.DECIMAL, allowNull: true },
  field_nullreal: { type: Sequelize.REAL, allowNull: true },
  field_nullboolean: { type: Sequelize.BOOLEAN, allowNull: true },
  field_nullenum: { type: Sequelize.ENUM, allowNull: true, values: ['foo', 'bar', 'baz'] },
  field_nulldate: { type: Sequelize.DATE, allowNull: true },
  field_nulldateonly: { type: Sequelize.DATEONLY, allowNull: true },
  field_nulltime: { type: Sequelize.TIME, allowNull: true },
  field_nulluuid: { type: Sequelize.UUID, allowNull: true },
  field_nulljson: { type: Sequelize.JSON, allowNull: true },
  field_nulljsonb: { type: Sequelize.JSONB, allowNull: true },
  field_nullblob: { type: Sequelize.BLOB, allowNull: true },

  field_string: { type: Sequelize.STRING, allowNull: false },
  field_char: { type: Sequelize.CHAR(32), allowNull: false },
  field_text: { type: Sequelize.TEXT, allowNull: false },
  field_tinyint: { type: Sequelize.TINYINT, allowNull: false },
  field_smallint: { type: Sequelize.SMALLINT, allowNull: false },
  field_mediumint: { type: Sequelize.MEDIUMINT, allowNull: false },
  field_integer: { type: Sequelize.INTEGER, allowNull: false },
  field_bigint: { type: Sequelize.BIGINT, allowNull: false },
  field_float: { type: Sequelize.FLOAT, allowNull: false },
  field_double: { type: Sequelize.DOUBLE, allowNull: false },
  field_decimal: { type: Sequelize.DECIMAL, allowNull: false },
  field_real: { type: Sequelize.REAL, allowNull: false },
  field_boolean: { type: Sequelize.BOOLEAN, allowNull: false },
  field_enum: { type: Sequelize.ENUM, allowNull: false, values: ['foo', 'bar', 'baz'] },
  field_date: { type: Sequelize.DATE, allowNull: false },
  field_dateonly: { type: Sequelize.DATEONLY, allowNull: false },
  field_time: { type: Sequelize.TIME, allowNull: false },
  field_uuid: { type: Sequelize.UUID, allowNull: false },
  field_json: { type: Sequelize.JSON, allowNull: false },
  field_jsonb: { type: Sequelize.JSONB, allowNull: false },
  field_blob: { type: Sequelize.BLOB, allowNull: false },
}, {
  timestamps: false,
});

export const WithDefaultValues = db.define('with_default_values', {
  field_inlinedefault: { type: Sequelize.STRING, allowNull: false, defaultValue: 'inline default' },
  field_functionaldefault: { type: Sequelize.INTEGER, allowNull: false, defaultValue: () => 7 },
  field_currentdatedefault: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  field_uuidv1default: { type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV1 },
  field_uuidv4default: { type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4 },
  field_boolean: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  timestamps: false,
});

export const Person = db.define('person', {
  name: Sequelize.STRING,
}, {
  timestamps: false,
});

export const Profile = db.define('profile', {
  birth: Sequelize.DATE,
}, {
  timestamps: false,
});

Profile.belongsTo(Person);

export const Manufacturer = db.define('manufacturer', {
  name: Sequelize.STRING,
}, {
  timestamps: false,
});

export const Car = db.define('car', {
  model: Sequelize.STRING,
}, {
  timestamps: false,
});

Manufacturer.hasMany(Car);
