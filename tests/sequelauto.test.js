import { expect } from 'chai';
import isPlainObject from 'is-plain-object';
import sinon from 'sinon';
import * as sequelauto from '../src/sequelauto';
import './db';
import types from '../src/types';
import {
  Nulls,
  Strings,
  Booleans,
  Numbers,
  Enums,
  Datetimes,
  Uuids,
  Jsons,
  Blobs,
  Customs,
  WithDefaultValues,
  Profile,
  Car,
} from './models';


describe('Dont run on non-SQLite engine', () => {
  const initialDialect = Nulls.sequelize.options.dialect;
  beforeEach(() => { Nulls.sequelize.options.dialect = 'mysql'; });
  afterEach(() => { Nulls.sequelize.options.dialect = initialDialect; });

  it('Dont create on non-sqlite engine', () => {
    return sequelauto.create(Nulls)
      .catch(err => expect(err.message).to.eq('Engine has to be sqlite!'))
      .then(() => new Error('Should not run on non-sqlite engine'));
  });
});

describe('Runs on non-sqlite engine', () => {
  beforeEach(() => {
    sequelauto.configure('RUN_ONLY_ON_SQLITE', false);
    Nulls.sequelize.options.dialect = 'mysql';
  });

  afterEach(() => {
    sequelauto.configure('RUN_ONLY_ON_SQLITE', true);
    Nulls.sequelize.options.dialect = 'sqlite';
  });

  it('Can run on non-sqlite if configured to', () => sequelauto.create(Nulls));
});

describe('Creates One', () => {
  it('Nullable fields', () => {
    return sequelauto.create(Nulls).then(() => {
      return Nulls.findOne().then((record) => {
        expect(record.field_nullstring).to.equal(null);
        expect(record.field_nullchar).to.equal(null);
        expect(record.field_nulltext).to.equal(null);
        expect(record.field_nulltinyint).to.equal(null);
        expect(record.field_nullsmallint).to.equal(null);
        expect(record.field_nullmediumint).to.equal(null);
        expect(record.field_nullinteger).to.equal(null);
        expect(record.field_nullbigint).to.equal(null);
        expect(record.field_nullfloat).to.equal(null);
        expect(record.field_nulldouble).to.equal(null);
        expect(record.field_nulldecimal).to.equal(null);
        expect(record.field_nullreal).to.equal(null);
        expect(record.field_nullboolean).to.equal(null);
        expect(record.field_nullenum).to.equal(null);
        expect(record.field_nulldate).to.equal(null);
        expect(record.field_nulldateonly).to.equal(null);
        expect(record.field_nulltime).to.equal(null);
        expect(record.field_nulluuid).to.equal(null);
        expect(record.field_nulljson).to.equal(null);
        expect(record.field_nulljsonb).to.equal(null);
        expect(record.field_nullblob).to.equal(null);
      });
    });
  });

  it('String fields', () => {
    return sequelauto.create(Strings).then(() => {
      return Strings.findOne().then((record) => {
        expect(record.field_string).to.be.a('string');
        expect(record.field_char).to.be.a('string');
        expect(record.field_text).to.be.a('string');
      });
    });
  });

  it('Number fields', () => {
    return sequelauto.create(Numbers).then(() => {
      return Numbers.findOne().then((record) => {
        expect(record.field_tinyint).to.be.a('number');
        expect(record.field_smallint).to.be.a('number');
        expect(record.field_mediumint).to.be.a('number');
        expect(record.field_integer).to.be.a('number');
        expect(record.field_bigint).to.be.a('number');
        expect(record.field_float).to.be.a('number');
        expect(record.field_double).to.be.a('number');
        expect(record.field_decimal).to.be.a('number');
        expect(record.field_real).to.be.a('number');
      });
    });
  });

  it('Boolean fields', () => {
    return sequelauto.create(Booleans).then(() => {
      return Booleans.findOne().then((record) => {
        expect(record.field_boolean).to.be.a('boolean');
      });
    });
  });

  it('Enum fields', () => {
    return sequelauto.create(Enums).then(() => {
      return Enums.findOne().then((record) => {
        expect(record.field_enum).to.be.a('string');
      });
    });
  });

  it('Date/Time fields', () => {
    return sequelauto.create(Datetimes).then(() => {
      return Datetimes.findOne().then((record) => {
        expect(record.field_date).to.be.a('date');
        expect(record.field_dateonly).to.match(/^\d{4}-\d{2}-\d{2}$/); // year-month-day
        expect(record.field_time).to.match(/^\d{1,3}:\d{2}:\d{2}$/); // hours-minutes-seconds
      });
    });
  });

  it('UUID fields', () => {
    return sequelauto.create(Uuids).then(() => {
      return Uuids.findOne().then((record) => {
        expect(record.field_uuid).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
      });
    });
  });

  it('JSON fields', () => {
    return sequelauto.create(Jsons).then(() => {
      return Jsons.findOne().then((record) => {
        expect(isPlainObject(record.field_json)).to.equal(true);
        expect(isPlainObject(record.field_jsonb)).to.equal(true);
      });
    });
  });

  it('Blob fields', () => {
    return sequelauto.create(Blobs).then(() => {
      return Blobs.findOne().then((record) => {
        expect(record.field_blob).to.be.instanceOf(Buffer);
      });
    });
  });

  it('All fields (nullable and non-nullable)', () => {
    return sequelauto.create(Customs, {
      field_nullstring: 'string',
      field_nullchar: 'char',
      field_nulltext: 'text',
      field_nulltinyint: 1,
      field_nullsmallint: 2,
      field_nullmediumint: 3,
      field_nullinteger: 4,
      field_nullbigint: 5,
      field_nullfloat: 1.1,
      field_nulldouble: 1.2,
      field_nulldecimal: 1.3,
      field_nullreal: 1.4,
      field_nullboolean: true,
      field_nullenum: 'bar',
      field_nulldate: new Date(),
      field_nulldateonly: '2017-11-02',
      field_nulltime: '13:01:09',
      field_nulluuid: 'b81b3376-bfde-11e7-abc4-cec278b6b50a',
      field_nulljson: { foo: 'bar' },
      field_nulljsonb: { baz: 'qux' },
      field_nullblob: Buffer.alloc(4, 'quux'),

      field_string: 'string',
      field_char: 'char',
      field_text: 'text',
      field_tinyint: 1,
      field_smallint: 2,
      field_mediumint: 3,
      field_integer: 4,
      field_bigint: 5,
      field_float: 1.1,
      field_double: 1.2,
      field_decimal: 1.3,
      field_real: 1.4,
      field_boolean: true,
      field_enum: 'bar',
      field_date: new Date(),
      field_dateonly: '2017-11-02',
      field_time: '13:01:09',
      field_uuid: 'b81b3376-bfde-11e7-abc4-cec278b6b50a',
      field_json: { foo: 'bar' },
      field_jsonb: { baz: 'qux' },
      field_blob: Buffer.alloc(4, 'quux'),
    }).then(() => {
      return Customs.findOne().then((record) => {
        expect(record.field_nullstring).to.equal('string');
        expect(record.field_nullchar).to.equal('char');
        expect(record.field_nulltext).to.equal('text');
        expect(record.field_nulltinyint).to.equal(1);
        expect(record.field_nullsmallint).to.equal(2);
        expect(record.field_nullmediumint).to.equal(3);
        expect(record.field_nullinteger).to.equal(4);
        expect(record.field_nullbigint).to.equal(5);
        expect(record.field_nullfloat).to.equal(1.1);
        expect(record.field_nulldouble).to.equal(1.2);
        expect(record.field_nulldecimal).to.equal(1.3);
        expect(record.field_nullreal).to.equal(1.4);
        expect(record.field_nullboolean).to.equal(true);
        expect(record.field_nullenum).to.equal('bar');
        expect(record.field_nulldate).to.be.instanceOf(Date);
        expect(record.field_nulldateonly).to.equal('2017-11-02');
        expect(record.field_nulltime).to.equal('13:01:09');
        expect(record.field_nulluuid).to.equal('b81b3376-bfde-11e7-abc4-cec278b6b50a');
        expect(record.field_nulljson).to.eql({ foo: 'bar' });
        expect(record.field_nulljsonb).to.eql({ baz: 'qux' });
        expect(record.field_nullblob).to.be.instanceOf(Buffer);

        expect(record.field_string).to.equal('string');
        expect(record.field_char).to.equal('char');
        expect(record.field_text).to.equal('text');
        expect(record.field_tinyint).to.equal(1);
        expect(record.field_smallint).to.equal(2);
        expect(record.field_mediumint).to.equal(3);
        expect(record.field_integer).to.equal(4);
        expect(record.field_bigint).to.equal(5);
        expect(record.field_float).to.equal(1.1);
        expect(record.field_double).to.equal(1.2);
        expect(record.field_decimal).to.equal(1.3);
        expect(record.field_real).to.equal(1.4);
        expect(record.field_boolean).to.equal(true);
        expect(record.field_enum).to.equal('bar');
        expect(record.field_date).to.be.instanceOf(Date);
        expect(record.field_dateonly).to.equal('2017-11-02');
        expect(record.field_time).to.equal('13:01:09');
        expect(record.field_uuid).to.equal('b81b3376-bfde-11e7-abc4-cec278b6b50a');
        expect(record.field_json).to.eql({ foo: 'bar' });
        expect(record.field_jsonb).to.eql({ baz: 'qux' });
        expect(record.field_blob).to.be.instanceOf(Buffer);
      });
    });
  });

  it('Returns created record', () => {
    sequelauto.create(Uuids).then((record) => {
      expect(record.field_uuid).to.not.equal(undefined);
    });
  });

  it('Ignores fields with a default value', () => {
    const dummyUuid = '00000000-0000-0000-0000-000000000000';
    const dummyDate = new Date(1999, 1, 1);
    sinon.stub(types, 'UUID').returns(dummyUuid);
    sinon.stub(types, 'DATE').returns(dummyDate);

    return sequelauto.create(WithDefaultValues).then((record) => {
      expect(record.field_inlinedefault).to.equal('inline default');
      expect(record.field_functionaldefault).to.equal(7);
      expect(record.field_currentdatedefault.getFullYear()).to.not.equal(dummyDate.getFullYear());
      expect(record.field_uuidv1default).to.not.equal(dummyUuid);
      expect(record.field_uuidv4default).to.not.equal(dummyUuid);
      expect(record.field_boolean).to.be.false;

      types.UUID.restore();
      types.DATE.restore();
    });
  });
});

describe('Creates Many', () => {
  it('Returns all created records', () => {
    return sequelauto.createMany(Uuids, 4).then((records) => {
      const [record1, record2, record3, record4] = records;

      expect(record1.field_uuid === record2.field_uuid).to.equal(false);
      expect(record2.field_uuid === record3.field_uuid).to.equal(false);
      expect(record3.field_uuid === record4.field_uuid).to.equal(false);
      expect(record4.field_uuid === record1.field_uuid).to.equal(false);
    });
  });

  it('Fills with defined attributes', () => {
    return sequelauto.createMany(Uuids, 1, { field_uuid: 'foo' }).then((records) => {
      const [record] = records;
      expect(record.field_uuid).to.equal('foo');
    });
  });

  it('Creates one record by default', () => {
    return sequelauto.createMany(Uuids).then((records) => {
      expect(records.length).to.equal(1);
    });
  });
});

describe('Creates models across relationships', () => {
  it('Works on one-to-one', () => {
    return sequelauto.create(Profile).then((profile) => {
      expect(profile.personId).to.not.equal(undefined);
    });
  });

  it('Works on one-to-many', () => {
    return sequelauto.create(Car).then((car) => {
      expect(car.manufacturerId).to.not.equal(undefined);
    });
  });
});
