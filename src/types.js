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

  TINYINT: int(127),
  SMALLINT: int(32767),
  MEDIUMINT: int(8388607),
  INTEGER: int(2147483647),
  BIGINT: int(9223372036854775807),

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
