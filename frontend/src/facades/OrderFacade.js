import { makeOptions } from '../utils/helperMethods'
const URL = "http://localhost:3001/api";

class OrderFacade {

    async updateShoppingcart(data) {
        let response = await fetch(URL + '/orders/shoppingcart', makeOptions('PUT', data)).then(res => {
            return res.json();
        });
        return response;
    }

    async sendOrder(data) {
        let response = await fetch(URL + '/orders', makeOptions('POST', { order: data })).then(res => {
            return res.json();
        });
        return response;
    }

}
export default new OrderFacade();