import { makeOptions } from '../utils/helperMethods'
const URL = "http://localhost:3001/api";

class ProductsFacade {

    async getAllProducts() {
        let response = await fetch(URL + '/products').then(res => {
            return res.json();
        });
        return response;
    }

}
export default new ProductsFacade();