import { makeOptions } from '../utils/helperMethods'
const URL = "http://localhost:3001/api";

class Neo4jFacade {

    async registerProductAddedToShoppingCart(data) {
        const response = await fetch(URL + '/neo4j/registerAgeAndColor', makeOptions('POST', data)).then(res => {
            return res.json();
        });
        return response;
    }

    async getTop3Products(data) {
        let response = await fetch(URL + '/neo4j/top3', makeOptions('POST', data)).then(res => {
            return res.json();
        });
        return response;
    }

}
export default new Neo4jFacade();