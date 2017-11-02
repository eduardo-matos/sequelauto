import types from './types';


export function getForeignKeys(model, ignore = {}) {
  const attributes = model.tableAttributes;
  const allModels = model.sequelize.models;

  const models = Object.keys(attributes).map((attr) => {
    if (attributes[attr].references && !(attr in ignore)) {
      const tableName = attributes[attr].references.model;
      const modelName = Object.keys(allModels).find(name => allModels[name].tableName === tableName);
      const referenceKey = attributes[attr].references.key;
      return [attr, referenceKey, allModels[modelName]];
    }
  }).filter(v => v);

  return models;
}

export function hasToFillForeignKeys(model, attributes) {
  return Object.keys(model.tableAttributes).some((attr) => {
    return model.tableAttributes[attr].references && !(attr in attributes);
  });
}

export function fillAttribute(model, attribute) {
  let attributeValue;

  types.every(([type, func]) => {
    if (model.tableAttributes[attribute].type instanceof type) {
      const { options } = model.tableAttributes[attribute].type;
      if (options && options.values) {
        attributeValue = func(options.values); // enum
      } else if (options && options.length) {
        attributeValue = func(options.length); // string, char...
      } else {
        attributeValue = func();
      }
      return false; // break
    }
    return true; // continue
  });

  return attributeValue;
}

export function fillAttributes(model, attributes) {
  const filledAttributes = {};

  Object.keys(model.tableAttributes).forEach((attr) => {
    const isAutoIncrement = model.tableAttributes[attr].autoIncrement;
    const allowsNull = model.tableAttributes[attr].allowNull;
    const hasUsedDefinedValue = attr in attributes;

    if (isAutoIncrement || allowsNull || hasUsedDefinedValue) {
      return;
    }

    filledAttributes[attr] = fillAttribute(model, attr);
  });

  return { ...filledAttributes, ...attributes };
}

