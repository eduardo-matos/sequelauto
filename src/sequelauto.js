import { hasToFillForeignKeys, fillAttributes, getForeignKeys } from './helper';


function create(model, attributes = {}) {
  if (hasToFillForeignKeys(model, attributes)) {
    return createWithForeignKeys(model, attributes);
  }

  return model.create(fillAttributes(model, attributes));
}

function createMany(model, attributes, quantity = 1) {
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
