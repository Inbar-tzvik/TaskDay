import { storageService } from "./storage-service"
import Axios from 'axios'

const STORAGE_KEY = 'loggedinUser'
const AUTH_URL = '//localhost:3030/api/auth/';
var axios = Axios.create({ withCredentials: true })


export const authService = {
    getLoggedinUser,
    updateBalance,
    addOrder,
    changeOrderStatus,
    login
}


login()



async function login(userr) {
    const user = { username: 'mama', password: '123' }
        // storageService.store(STORAGE_KEY, user)
    try {
        const res = await axios.post(AUTH_URL + "login", user)
            // console.log('user logged in:', res.data);
            // currUser = res.data
        return res.data
    } catch (err) {
        // logger.error('Failed user LogIn, username/password problem', err)
        throw err
    }
}



async function getLoggedinUser() {
    try {
        const res = await axios.post(AUTH_URL + "loggedin")
            // console.log('getLoggedinUser in front: ', res);
        return res.data
    } catch (err) {

        throw err
    }

    // console.log(currUser);
    // return storageService.load(STORAGE_KEY)
}

function updateBalance(amount) {
    const user = getLoggedinUser();
    if (user.balance + amount < 0) return Promise.reject("No Money")
    user.balance += amount
    storageService.store(STORAGE_KEY, user)
    return Promise.resolve(user.balance)
}

function addOrder(order) {
    const user = getLoggedinUser();
    user.orders.unshift(order)
    debugger
    user.balance -= order.total
    storageService.store(STORAGE_KEY, user)
    return Promise.resolve(order)
}

function changeOrderStatus(orderId, status) {
    const user = getLoggedinUser();
    const order = user.orders.find(order => order._id === orderId)
    order.status = status
    storageService.store(STORAGE_KEY, user)
    return Promise.resolve(order)
}