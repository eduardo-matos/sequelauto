import Sequelize from 'sequelize';
import {
  str,
  int,
  float,
  boolean,
  enumm,
  datetime,
  time,
  uuid,
  json,
  blob,
} from './generators';


export default [
  [Sequelize.STRING, str],
  [Sequelize.CHAR, str],
  [Sequelize.TEXT, str],

  [Sequelize.TINYINT, int],
  [Sequelize.SMALLINT, int],
  [Sequelize.MEDIUMINT, int],
  [Sequelize.INTEGER, int],
  [Sequelize.BIGINT, int],

  [Sequelize.FLOAT, float],
  [Sequelize.DOUBLE, float],
  [Sequelize.DECIMAL, float],
  [Sequelize.REAL, float],

  [Sequelize.BOOLEAN, boolean],

  [Sequelize.ENUM, enumm],

  [Sequelize.DATE, datetime],
  [Sequelize.DATEONLY, datetime],
  [Sequelize.TIME, time],

  [Sequelize.UUID, uuid],

  [Sequelize.JSON, json],
  [Sequelize.JSONB, json],

  [Sequelize.BLOB, blob],
];
