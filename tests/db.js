import Sequelize from 'sequelize';

const db = new Sequelize('sqlite://', { logging: false });

// Clean database
before(() => db.sync());
beforeEach(() => db.truncate()); // Truncating is faster than droping/creating tables

export default db;
