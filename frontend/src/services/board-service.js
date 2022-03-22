import { storageService } from './storage-service.js'
import { utilService } from './util-service.js'
import axios from 'axios'

const KEY = 'toy_db'
    // _createToys()

const TOY_URL = '//localhost:3030/api/toy/';
// const TOY_URL = (process.env.NODE_ENV !== 'development') ?
//     '/api/toy/' :
//     '//localhost:3030/api/toy/';


const board = {
    "_id": "b101",
    "title": "Robot dev proj",
    "createdAt": 1589983468418,
    // "createdBy": {
    //     "_id": "u101",
    //     "fullname": "Abi Abambi",
    //     "imgUrl": "http://some-img"
    // },
    "style": {},
    "labels": [{
            "id": "l101",
            "title": "Done",
            "color": "#61bd4f"
        },
        {
            "id": "l102",
            "title": "Progress",
            "color": "#61bd33"
        }
    ],
    "members": [{
        "_id": "u101",
        "fullname": "Tal Tarablus",
        "imgUrl": "https://www.google.com"
    }],
    "groups": [{
            "id": "g101",
            "title": "Group 1",
            "tasks": [{
                    "id": "c101",
                    "title": "Replace logo"
                },
                {
                    "id": "c102",
                    "title": "Add Samples"
                }
            ],
            "style": {}
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [{
                    "id": "c103",
                    "title": "Do that"
                },
                {
                    "id": "c104",
                    "title": "Help me",
                    "status": "in-progress",
                    "description": "description",
                    "comments": [{
                        "id": "ZdPnm",
                        "txt": "also @yaronb please CR this",
                        "createdAt": 1590999817436.0,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        }
                    }],
                    "checklists": [{
                        "id": "YEhmF",
                        "title": "Checklist",
                        "todos": [{
                            "id": "212jX",
                            "title": "To Do 1",
                            "isDone": false
                        }]
                    }],
                    "members": [{
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    }],
                    "labelIds": ["l101", "l102"],
                    "createdAt": 1590999730348,
                    "dueDate": 16156215211,
                    "byMember": {
                        "_id": "u101",
                        "username": "Tal",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "style": {
                        "bgColor": "#26de81"
                    }
                }
            ],
            "style": {}
        }
    ],
    "activitiesLog": [{
        "id": "a101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "task": {
            "id": "c101",
            "title": "Replace Logo"
        }
    }],
    // for monday
    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
}
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{
        "id": "m101",
        "boardId": "m101",
        "taskId": "t101"
    }]
}



export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}

function query(filterBy) {
    // console.log(filterBy);
    // return storageService.query(KEY)
    return axios.get(TOY_URL, { params: filterBy })
        .then(res => {
            // FOR CHECK LOCAL STORSAGE
            // localStorage.s
            storageService._save("toy_db", res.data)
            return res.data
        })
}

function getById(toyId) {
    return storageService.get(KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(KEY, toyId)
}

function save(toy) {
    //FIX TO _ID -
    if (toy._id) return storageService.put(KEY, toy)
    return storageService.post(KEY, toy)
}

function getEmptyToy() {
    return {
        name: "",
        price: 0,
        type: "",
        createdAt: new Date(),
        inStock: true
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(KEY)
    if (!toys || !toys.length) {
        toys = [
            { _id: utilService.makeId(), name: 'Fiat', price: 30, lables: ["Funny"], inStock: true, reviews: ['nice toy', 'bad toy'] },
            { _id: utilService.makeId(), name: 'Honda', price: 87, lables: ["Funny"], inStock: false, reviews: ['nice toy', 'bad toy'] },
            { _id: utilService.makeId(), name: 'Toyota', price: 54, lables: ["Sad"], inStock: true, reviews: ['nice toy', 'bad toy'] },
        ]
        utilService.saveToStorage(KEY, toys)
    }
    return toys
}