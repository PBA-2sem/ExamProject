const { setUserSessionWithPayload } = require('../../dbFacades/redisFacade');

async function updateShoppingCart(data) {
    const result = await setUserSessionWithPayload(data);
    return result;
}

module.exports = {
    updateShoppingCart,
}