import { expect } from 'chai';
import Sequelize from 'sequelize';
import { make } from '../src/sequelauto';
import db from './db';


const User = db.define('user', {name: Sequelize.STRING});

beforeEach(() => db.sync());

it('Works', () => {
    return make(User, {name: 'Eduardo'}).then(() => {
      return User.findAll().then((records) => {
        expect(records[0]).to.not.be.undefined;
      });
    });
});
