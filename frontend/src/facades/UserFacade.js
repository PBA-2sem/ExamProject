import { makeOptions } from '../utils/helperMethods'

const URL = "http://localhost:3001/api";

class UserFacade {

    async login(credentials) {
        const data = makeOptions("POST", credentials);
        const response = await fetch(URL + '/users/login', data).then(res => {
            return res.json();
        });
        console.log(response)
        return response;
    }

    async createUser(userData) {
        const data = makeOptions("POST", userData);
        const user = await fetch(URL + '/users', data).then(res => {
            console.log(res)
            return res.json();
        });
        return user;
    }

}
export default new UserFacade();