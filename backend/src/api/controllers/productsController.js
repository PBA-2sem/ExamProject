const { getProducts, get3ProdByColor, getProduct } = require('../../dbFacades/mysqlFacade');

async function getAllProducts() {
    const result = await getProducts();
    return result;
}

async function getThreeProdByColor(color) {
    const result = await get3ProdByColor(color);
    return result;
}

async function getProductById(id) {
    const result = await getProduct(id);
    return result;
}


module.exports = {
    getAllProducts,
    get3ProdByColor:getThreeProdByColor,
    getProductById
}