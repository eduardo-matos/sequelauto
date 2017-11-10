const { expect } = require('chai');
const _ = require('lodash');
const {
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
} = require('../src/generators');


describe('Generators', () => {
  describe('String', () => {
    it('Generates string with length 10 by default', () => {
      expect(str()).to.be.a('string');
      expect(str()).to.have.length(10);
    });

    it('Generates string with a custom length', () => {
      expect(str(44)).to.have.length(44);
    });

    it('Generates string with custom chars', () => {
      expect(str(100, '!&%$#@')).to.not.match(/[^!&%$#@]/g);
    });
  });

  describe('Integer', () => {
    it('Returns a function', () => {
      expect(int()).to.be.a('function');
    });

    it('Returns 0 or 1 by default', () => {
      range(100).forEach(() => {
        expect(int()()).to.be.within(0, 1);
      });
    });

    it('Accepts max value', () => {
      const max = 887452;
      range(100).forEach(() => {
        expect(int(max)()).to.be.within(0, max);
      });
    });
  });

  describe('Float', () => {
    it('Generates a floating point number', () => {
      expect(float()).to.be.a('number');
      expect(float().toString()).to.match(/\d+\.\d+/);
    });

    it('Generates a number between 0 and 2 by default', () => {
      range(100).forEach(() => {
        expect(float()).to.within(0, 2);
      });
    });

    it('Generates a number between 0 and max', () => {
      const max = 1000;
      const values = range(100).map(() => float(max));
      const hasValuesGreaterThanTwo = !!values.filter(value => value > 2).length;

      values.forEach(value => expect(value).to.be.within(0, max));
      expect(hasValuesGreaterThanTwo).to.equal(true);
    });
  });

  describe('Boolean', () => {
    it('Generates a boolean', () => {
      range(100).forEach(() => expect(boolean()).to.be.a('boolean'));
    });

    it('Generates true and false', () => {
      const values = range(100).map(() => boolean());
      expect(values).to.include.members([true, false]);
    });
  });

  describe('Enum', () => {
    it('Gets a value from list', () => {
      const list = ['foo', 'bar', 'baz', 'qux', 'quux'];
      range(100).forEach(() => expect(enumm(list)).to.be.oneOf(list));
    });
  });

  describe('Datetime', () => {
    it('Generates datetime as string', () => {
      expect(datetime()).to.be.a('string');
    });

    it('Generates datetime as year-month-day hour:minute:second', () => {
      expect(datetime()).to.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('Time', () => {
    it('Generates time as string', () => {
      expect(time()).to.be.a('string');
    });

    it('Generates time as hour:minute:second', () => {
      expect(time()).to.match(/^\d{2,3}:\d{2}:\d{2}$/);
    });

    it('Pads only minutes and seconds with zero', () => {
      const hours = range(1000).map(() => time().split(':')[0]);
      const minutes = range(1000).map(() => time().split(':')[1]);
      const seconds = range(1000).map(() => time().split(':')[2]);

      const anyGeneratedHourStartsWithZero = !!hours.filter(val => val[0] === '0').length;
      const anyGeneratedMinuteStartsWithZero = !!minutes.filter(val => val[0] === '0').length;
      const anyGeneratedSecondStartsWithZero = !!seconds.filter(val => val[0] === '0').length;

      expect(anyGeneratedHourStartsWithZero).to.equal(false);
      expect(anyGeneratedMinuteStartsWithZero).to.equal(true);
      expect(anyGeneratedSecondStartsWithZero).to.equal(true);
    });
  });

  describe('UUID', () => {
    it('Generates UUID with correct format', () => {
      expect(uuid()).to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
    });

    it('Generates UUID with correct chars', () => {
      range(100).forEach(() => expect(uuid()).to.not.match(/[g-zA-Z]/g));
    });
  });

  describe('JSON', () => {
    it('Generates plain object', () => {
      expect(_.isPlainObject(json())).to.equal(true);
    });

    it('Generates object with 1 key', () => {
      const keys = _.keys(json());
      expect(keys).to.have.length(1);
    });

    it('Generates object value as string', () => {
      _.values(json()).forEach(value => expect(value).to.be.a('string'));
    });
  });

  describe('Blob', () => {
    it('Returns buffer', () => {
      expect(blob()).to.be.instanceof(Buffer);
    });
  });
});


function range(max) {
  const list = [];
  for (let i = 0; i < max; i += 1) {
    list.push(i);
  }

  return list;
}
