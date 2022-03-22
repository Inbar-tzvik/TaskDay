export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    _save
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType).then((entities) =>
        entities.find((entity) => entity._id === entityId)
    )
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType).then((entities) => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function postMany(entityType, newEntities) {
    return query(entityType).then((entities) => {
        entities.push(...newEntities)
        _save(entityType, entities)
        return entities
    })
}

function put(entityType, updatedEntity, entitySubGroup = null) {
    return query(entityType).then((entities) => {
        const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

// entitySubGroup = "groups"
async function remove(entityType, entityId, subGroupName = null, entitySubGroupId = null, itemId = null) {
    try {
        var entities = await query(entityType)
        if (subGroupName) {
            subGroup = entities.subGroupName
            const idx = subGroup.findIndex((subGroup) => subGroup.id === entitySubGroupId)
            if (itemId) {
                var currGroupTasks = subGroup[idx].tasks
                const task = currGroupTasks.findIndex((item) => item.id === itemId)
                currGroupTasks.splice(idx, 1)
            } else subGroup.splice(idx, 1)
                //TO CHECK - its should work cause its poiner, but m aybe need "entities.subGroupName"
        } else {
            const idx = entities.findIndex((entity) => entity._id === entityId)
            entities.splice(idx, 1)
        }
        _save(entityType, entities)
    } catch (err) {
        console.log('Cannot find group', err);
    }
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 4) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}