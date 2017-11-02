import types from './types';


function create(model, attributes = {}) {
  const newAttributes = Object.assign({}, attributes);

  Object.keys(model.tableAttributes).forEach((attr) => {
    if (!model.tableAttributes[attr].allowNull && !(attr in attributes)) {

      types.every(([type, func]) => {
        if (model.tableAttributes[attr].type instanceof type) {
          const { options } = model.tableAttributes[attr].type;
          if (options && options.values) {
            newAttributes[attr] = func(options.values); // enum
          } else if (options && options.length) {
            newAttributes[attr] = func(options.length); // string, char...
          } else {
            newAttributes[attr] = func();
          }
          return false;
        }
        return true;
      });
    }
  });

  return model.create(newAttributes);
}

function createMany(model, attributes, quantity = 1) {
  const promises = [];
  for (let i = 0; i < quantity; i += 1) {
    promises.push(create(model, attributes));
  }
  return Promise.all(promises);
}

export default {
  create,
  createMany,
};
