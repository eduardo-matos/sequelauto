import { hasToFillForeignKeys, fillAttributes, getForeignKeys } from './helper';


/**
 * Create entry on database from a sequelize model and return that instance.
 * @param {Sequelize.Model} model
 * @param {Object} attributes Attributes you'd pass to Model.create
 * @return {Promise}
 */
function create(model, attributes = {}) {
  if (hasToFillForeignKeys(model, attributes)) {
    return createWithForeignKeys(model, attributes);
  }

  return model.create(fillAttributes(model, attributes));
}

/**
 * Create many entries on database from a sequelize model and return all their instances.
 * @param {Sequelize.Model} model
 * @param {Integer} quantity How many entries will be created
 * @param {Object} attributes Attributes you'd pass to Model.create
 * @return {Promise}
 */
function createMany(model, quantity = 1, attributes) {
  const promises = [];
  for (let i = 0; i < quantity; i += 1) {
    promises.push(create(model, attributes));
  }
  return Promise.all(promises);
}

function createWithForeignKeys(model, attributes) {
  const attrs = { ...attributes };
  const foreignKeys = getForeignKeys(model, attributes);

  return Promise
    .all(foreignKeys.map(([,, ForeignModel]) => {
      return create(ForeignModel);
    }))
    .then((foreignInstances) => {
      foreignInstances.forEach((foreignInstance, index) => {
        const myFieldName = foreignKeys[index][0];
        const referenceKeyName = foreignKeys[index][1];
        attrs[myFieldName] = foreignInstance[referenceKeyName];
      });

      return create(model, attrs);
    });
}

export default {
  create,
  createMany,
};
