export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
  _save,
};

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return Promise.resolve(entities);
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => entities.find((entity) => entity._id === entityId));
}

function post(entityType, newEntity) {
  newEntity._id = 'b' + _makeId(3);
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function postMany(entityType, newEntities) {
  return query(entityType).then((entities) => {
    entities.push(...newEntities);
    _save(entityType, entities);
    return entities;
  });
}

function put(entityType, updatedEntity, entitySubGroup = null) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

async function remove(
  entityType,
  entityId,
  firstGroupsName = null,
  firstGroupId = null,
  secondGroupsName = null,
  secondGroupId = null
) {
  try {
    console.log(entityType, entityId, firstGroupsName, firstGroupId, secondGroupId);
    var entities = await query(entityType);
    const currEntityIdx = entities.findIndex((entity) => entity._id === entityId);
    const currEntity = entities[currEntityIdx];
    if (firstGroupsName) {
      var firstGroups = currEntity[firstGroupsName];
      const firstGroupIdx = firstGroups.findIndex((subGroup) => subGroup.id === firstGroupId);
      const firstGroup = firstGroups[firstGroupIdx];
      if (secondGroupId) {
        var secondGroups = firstGroup[secondGroupsName];
        const secondGroup = secondGroups.findIndex((item) => item.id === secondGroupId);
        secondGroups.splice(secondGroup, 1);
      } else firstGroups.splice(firstGroupIdx, 1);
      //TO CHECK-->CHECKED - it works cause its poiner
    } else {
      entities.splice(currEntityIdx, 1);
    }
    _save(entityType, entities);
  } catch (err) {
    console.log('Cannot find group', err);
  }
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 3) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
