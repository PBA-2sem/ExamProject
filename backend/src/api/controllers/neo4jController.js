const { registerAgeAndColor, findTop3Colors } = require('../../dbFacades/neo4jFacade');

async function registerProductAddedToShoppingCart(data) {
    const result = await registerAgeAndColor(data.age, data.color);
    if (!result) throw Error('A DB error occured');
    return result;
}

async function getTop3Colors(data) {
    const result = await findTop3Colors(data)
    if (!result) throw Error('A DB error occured');
    return result;
}

module.exports = {
    registerProductAddedToShoppingCart,
    getTop3Colors

}