const { getProducts, getProdByCategory, getProduct } = require('../../dbFacades/mysqlFacade');

async function getAllProducts() {
    const result = await getProducts();
    return result;
}

async function getProductByCategory(category) {
    const result = await getProdByCategory(category);
    return result;
}

async function getProductById(id) {
    const result = await getProduct(id);
    return result;
}


module.exports = {
    getAllProducts,
    getProductByCategory,
    getProductById
}