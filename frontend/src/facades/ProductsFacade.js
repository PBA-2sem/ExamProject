import { makeOptions } from '../utils/helperMethods'
const URL = "http://localhost:3001/api";

class ProductsFacade {

    async getAllProducts() {
        let response = await fetch(URL + '/products').then(res => {
            return res.json();
        });
        return response;
    }

    async get3ProdByColor(data) {
        let response = await fetch(URL + '/products/color/'+data.color).then(res => {
            return res.json();
        });
        return response;
    }

}
export default new ProductsFacade();