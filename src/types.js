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


export default {
  STRING: str,
  CHAR: str,
  TEXT: str,

  TINYINT: int,
  SMALLINT: int,
  MEDIUMINT: int,
  INTEGER: int,
  BIGINT: int,

  FLOAT: float,
  DOUBLE: float,
  DECIMAL: float,
  REAL: float,

  BOOLEAN: boolean,

  ENUM: enumm,

  DATE: datetime,
  DATEONLY: datetime,
  TIME: time,

  UUID: uuid,

  JSONTYPE: json,
  JSONB: json,

  BLOB: blob,
};
