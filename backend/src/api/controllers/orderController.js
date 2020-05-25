const { setUserSessionWithPayload } = require('../../dbFacades/redisFacade');

async function updateShoppingCart(data) {
    const result = await setUserSessionWithPayload(data.user.id, data);
    if (!result) throw Error('A DB error occured');
    return result;
}

module.exports = {
    updateShoppingCart,
}