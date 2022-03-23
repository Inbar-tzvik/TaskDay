import { storageService } from './storage-service.js';
import { utilService } from './util-service.js';
import axios from 'axios';

const KEY = 'funday_db';
// _createToys()

const FUNDAY_URL = '//localhost:3030/api/funday/';
// const TOY_URL = (process.env.NODE_ENV !== 'development') ?
//     '/api/funday/' :
//     '//localhost:3030/api/funday/';

//TODO - MAKE id for inner tasks/groups. like "t-"+makeId(4)
const board = [{
    _id: 'b101',
    title: 'Robot dev proj',
    createdAt: 1589983468418,
    // "createdBy": {
    //     "_id": "u101",
    //     "fullname": "Abi Abambi",
    //     "imgUrl": "http://some-img"
    // },
    style: { bgColor: 'red' },
    labels: [{
            id: 'l101',
            title: 'Done',
            color: '#61bd4f',
        },
        {
            id: 'l102',
            title: 'Progress',
            color: '#61bd33',
        },
    ],
    members: [{
            _id: 'u101',
            fullname: 'Tal Tarablus',
            imgUrl: 'https://www.google.com',
        },
        {
            _id: 'u102',
            fullname: 'Tl rablus',
            imgUrl: 'https://www.google.com',
        },
    ],
    groups: [{
            id: 'g101',
            title: 'Group 1',
            tasks: [{
                    id: 'c101',
                    title: 'Replace logo',
                },
                {
                    id: 'c102',
                    title: 'Add Samples',
                },
            ],
            style: { bgColor: 'green' },
        },
        {
            id: 'g102',
            title: 'Group 2',
            tasks: [{
                    id: 'c103',
                    title: 'Do that',
                },
                {
                    id: 'c104',
                    title: 'Help me',
                    status: 'in-progress',
                    description: 'description',
                    comments: [{
                        id: 'ZdPnm',
                        txt: 'also @yaronb please CR this',
                        createdAt: 1590999817436.0,
                        byMember: {
                            _id: 'u101',
                            fullname: 'Tal Tarablus',
                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                    }, ],
                    checklists: [{
                        id: 'YEhmF',
                        title: 'Checklist',
                        todos: [{
                            id: '212jX',
                            title: 'To Do 1',
                            isDone: false,
                        }, ],
                    }, ],
                    members: [{
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    }, ],
                    labelIds: ['l101', 'l102'],
                    createdAt: 1590999730348,
                    dueDate: 16156215211,
                    byMember: {
                        _id: 'u101',
                        username: 'Tal',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                    },
                    style: {
                        bgColor: '#26de81',
                    },
                },
            ],
            style: {},
        },
    ],
    activitiesLog: [{
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        task: {
            id: 'c101',
            title: 'Replace Logo',
        },
    }, ],
    // cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
}, ];

export const boardGroupService = {
    query,
    getBoardById,
    getGroupById,
    removeBoard,
    removeGroup,
    removeTask,
    saveBoard,
    saveTask,
    createEmptyTask,
    createEmptyGroup,
    createNewBoard,

    // EDIT TASk(boradid,groupid,taskid,task) / new task
    // EDIT GROUP(boradid,groupid,taskid,task) / new task
    //TODO

    // getEmptyToy,
};
storageService._save(KEY, board);

//CHEKING AREA
check();
async function check() {
    // var boardById = await getBoardById("b101")
    // console.log('getBoardById: ', boardById);
    // var groupById = await getGroupById('b101', 'g102')
    // console.log('getGroupById: ', groupById);
    // await removeBoard('b101')
    // await removeGroup('b101', 'g102')
    // await removeTask('b101', 'g102', 'c103')
    // await createNewBoard()

    // var emptyTask = createEmptyTask()
    // var emptyGroup = await createEmptyGroup('b101')
    // console.log(emptyTask, emptyGroup);

    // var group = {
    //     id: 'g101',
    //     title: 'shiva'
    // }
    // await saveGroup('b101', group);


    var task = {
        id: 'c102',
        title: 'hello',
    }
    await saveTask('b101', 'g101', task);


}

function query(filterBy) {
    return storageService.query(KEY) || [];

    //LOCAL STORAGE:
    // return storageService.query(KEY)

    //SERVER:
    // try {
    //     const res = await axios.get(TOY_URL, { params: filterBy })
    //     storageService._save(KEY, res.data)
    //     return res.data
    // } catch (err) {
    //     console.log('Cannot get query', err);
    // }
}

async function getBoardById(boardId) {
    //LOCAL STORAGE
    return storageService.get(KEY, boardId);
}

async function getGroupById(boardId, groupId) {
    //LOCAL STORAGE
    try {
        const board = await storageService.get(KEY, boardId);
        const group = board.groups.find((group) => group.id === groupId);
        return group;
    } catch (err) {
        console.log('Cannot find group', err);
    }
}

//TODO - do we need async here? "storageService.remove" returns nothing
async function removeBoard(boardId) {
    return storageService.remove(KEY, boardId);
}

async function removeGroup(boardId, groupId) {
    return storageService.remove(KEY, boardId, 'groups', groupId);
}

async function removeTask(boardId, groupId, taskId) {
    return storageService.remove(KEY, boardId, 'groups', groupId, 'tasks', taskId);
}

async function saveBoard(board) {
    if (board._id) {
        try {
            return storageService.put(KEY, board);
        } catch (err) {
            console.log('Cannot find group', err);
        }
    } else {
        return storageService.post(KEY, board);
    }
}

//ASK - THE FUNCTION RETURN THE NEW Board!!, or something else??
//WHAT SHULD DO WITH ERRORS?
async function saveGroup(boardId, updateGroup) {
    try {
        var currBoard = await getBoardById(boardId)
        var currGroup = currBoard.groups.find((group) => group.id === updateGroup.id)
        var currGroupIdx = currBoard.groups.indexOf(currGroup)

        if (currGroup) {
            currBoard.groups[currGroupIdx] = updateGroup
        } else currBoard.groups.push(updateGroup)
            // console.log(currBoard);
        await saveBoard(currBoard)
        return currBoard
    } catch (err) {
        console.log('Cannot update/save group', err);
    }

}
async function saveTask(boardId, groupId, updateTask) {

    try {
        var currGroup = await getGroupById(boardId, groupId)
        var currTask = currGroup.tasks.find((task) => task.id === updateTask.id)
        var currTaskIdx = currGroup.tasks.indexOf(currTask)
            // console.log(currTaskIdx);

        if (currTask) {
            currGroup.tasks[currTaskIdx] = updateTask
        } else {
            currGroup.tasks.push(updateTask)
        }
        console.log(currGroup);
        var currBoard = await saveGroup(boardId, currGroup)
        console.log(currBoard);
        // var currBoard = await getBoardById(boardId)
    } catch {}


}

//DONT SAVE TO STORAGE!
function createEmptyTask(title = '') {
    return {
        id: 't' + utilService.makeId(3),
        title,
    };
}

//TODO QUALITY CHECK
async function createEmptyGroup(boardId) {
    var board = await getBoardById(boardId);
    var newGroup = {
        id: 'g' + utilService.makeId(3),
        title: 'New Group',
        tasks: [createEmptyTask()],
        style: {},
    };
    // console.log(board);
    board['groups'].unshift(newGroup);
    saveBoard(board);
    return board;
}
//SAVE TO STORAGE! (MOST OF THIGNS NOW HARD CODE)
async function createNewBoard() {
    var emptyBoard = {
        // _id: 'b' + utilService.makeId(3),
        title: 'New Board',
        createdAt: new Date(),
        createdBy: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        style: {},
        labels: [{
                id: 'l101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 'l102',
                title: 'Progress',
                color: '#61bd33',
            },
        ],
        members: [{
            _id: 'u101',
            fullname: 'Tal Tarablus',
            imgUrl: 'https://www.google.com',
        }, ],
        groups: [createEmptyGroup(), createEmptyGroup()],
        // "status":{}
        activitiesLog: [{
            id: 'a101',
            txt: 'Changed Color',
            createdAt: 154514,
            byMember: {
                _id: 'u101',
                fullname: 'Abi Abambi',
                imgUrl: 'http://some-img',
            },
            task: {
                id: 'c101',
                title: 'Replace Logo',
            },
        }, ],
        // for monday
        cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
    };

    storageService.post(KEY, emptyBoard);
}

function _createBoard() {
    let boards = utilService.loadFromStorage(KEY);
    if (!boards || !boards.length) {
        boards = [{
                _id: utilService.makeId(),
                name: 'Fiat',
                price: 30,
                lables: ['Funny'],
                inStock: true,
                reviews: ['nice board', 'bad board'],
            },
            {
                _id: utilService.makeId(),
                name: 'Honda',
                price: 87,
                lables: ['Funny'],
                inStock: false,
                reviews: ['nice board', 'bad board'],
            },
            {
                _id: utilService.makeId(),
                name: 'Toyota',
                price: 54,
                lables: ['Sad'],
                inStock: true,
                reviews: ['nice board', 'bad board'],
            },
        ];
        utilService.saveToStorage(KEY, boards);
    }
    return boards;
}