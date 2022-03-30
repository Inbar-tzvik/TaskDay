import { storageService } from './storage-service.js';
import { utilService } from './util-service.js';
import { httpService } from './http.service.js'
// import axios from 'axios';
import { socketService } from '@/services/socket.service.front';


const KEY = 'funday_db';
// _createToys()

const FUNDAY_URL = '//localhost:3030/api/';
// const FUNDAY_URL = (process.env.NODE_ENV !== 'development') ?
//     '/api/funday/' :
//     '//localhost:3030/api/funday/';

export const boardGroupService = {
    //Boards
    query,
    //board (saveBoard also create new board, just send it without _id!)
    getBoardById,
    saveBoard,
    removeBoard,
    //group
    getGroupById,
    saveGroup,
    removeGroup,

    //task
    getTaskById,
    saveTask,
    removeTask,

    //ASK INBAR  - this for local?? only when changed - send it to server
    createEmptyTask,
    createEmptyGroup,
    createNewBoard,
};

//************CHEKING AREA - can put on comment *********/
// storageService._save(KEY, boards);
check();
async function check() {
    // var boards = await query()
    // console.log('getBoardsFromQuery: ', boards);
    // var boardById = await getBoardById("62430dc81cdd644b3e5acabd")
    // console.log('getBoardById: ', boardById);
    // var groupById = await getGroupById('62430dc81cdd644b3e5acabd', 'g101')
    // console.log('getGroupById: ', groupById);
    // var taskById = await getTaskById('62430dc81cdd644b3e5acabd', 'g101', 't101')
    // console.log('getTaskById: ', taskById);
    // var boardIdRemoved = await removeBoard('6244348361f64dd3ad955758')
    // console.log('success removing board id:', boardIdRemoved);
    // await removeGroup('62430dc81cdd644b3e5acabe', 'g101')
    // await removeTask('62430dc81cdd644b3e5acabd', 'g201', 'c201')
    // await saveBoard((await createNewBoard()))
    // await createNewBoard()
    // var emptyTask = createEmptyTask()
    // var emptyGroup = await createEmptyGroup('b101')
    // console.log(emptyTask, emptyGroup);
    // var group = {
    //     id: 'g101',
    //     title: 'shivaaa'
    // }
    // await saveGroup('62430dc81cdd644b3e5acabe', group);
    // var task = {
    //     id: 't102check',
    //     title: 'checking!',
    // }
    // await saveTask('62430dc81cdd644b3e5acabd', 'g101', task);
}
//********** /CHECKING AREA FINISH *********/

async function query(filterBy = null) {
    //SERVER:
    try {
        return await httpService.get('board', filterBy)
    } catch (err) {
        console.log('Cannot get query', err);
    }
}

async function getBoardById(boardId, data = null) {
    //SERVER:
    try {
        return await httpService.get(`board/${boardId}`, data)
    } catch (err) {
        console.log('Cannot get boardById from server', err);
    }
}

//FOR NOW we'll get all the board from server, and then send back the group
async function getGroupById(boardId, groupId) {
    //SERVER:
    try {
        const board = await httpService.get(`board/${boardId}`)
        const group = board.groups.find((group) => group.id === groupId);
        return group;
    } catch (err) {
        console.log('Cannot get group from server', err);
    }
}

async function getTaskById(boardId, groupId, taskId) {
    try {
        const board = await httpService.get(`board/${boardId}`)
        const currGroup = board.groups.find((group) => group.id === groupId);
        const currTask = currGroup.tasks.find((task) => task.id === taskId);
        return currTask;
    } catch (err) {
        console.log('Cannot find task', err);
    }
}

async function removeBoard(boardId) {
    try {
        const boardIdRemoved = await httpService.delete(`board/${boardId}`)
            //TODO THIS REMOVE SOCKET!
        _emitToServerSocket('boardChanged', boardId)
        return boardIdRemoved;
    } catch (err) {
        console.log('Cannot find/remove board', err);
    }
}

async function removeGroup(boardId, groupId, removedIndex = null) {
    //SERVER:
    try {
        const board = await httpService.get(`board/${boardId}`)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId);
        board.groups.splice(groupIdx, 1)
            // console.log('groupIdx', groupIdx);
        saveBoard(board)
        return board;
    } catch (err) {
        console.log('Cannot get group from server', err);
    }
}

async function removeTask(boardId, groupId, taskId) {
    try {
        const board = await httpService.get(`board/${boardId}`)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId);
        const taskIdx = board.groups[groupIdx].tasks.findIndex((task) => task.id === taskId);
        board.groups[groupIdx].tasks.splice(taskIdx, 1)
        console.log('board', board);
        saveBoard(board)
        socketService.emit('boardChanged', board._id)
        return board;
    } catch (err) {
        console.log('Cannot get group from server', err);
    }
}

async function saveBoard(board) {
    if (board._id) {
        try {
            const addedBoard = await httpService.put(`board`, board)
            console.log('addedBoard', addedBoard);
            socketService.emit('boardChanged', board._id)
        } catch (err) {
            console.log('Cannot find group', err);
        }
    } else {
        const addedBoard = await httpService.post(`board`, board)
        return addedBoard
    }
} else {
    return storageService.post(KEY, board);
}
}

//ASK - THE FUNCTION RETURN THE NEW Board!!, or something else??
//WHAT SHULD DO WITH ERRORS?
async function saveGroup(boardId, updateGroup, addedIdxForDrop = null) {

    try {
        const board = await httpService.get(`board/${boardId}`)
        const groupIdx = board.groups.findIndex((group) => group.id === updateGroup.id);
        if (groupIdx >= 0) {
            board.groups.splice(groupIdx, 1, updateGroup)
        } else board.groups.splice(0, 0, updateGroup)
            // console.log('board', board);
            //THIS SEND TO SERVER TWICE, IF WILL BE TIME, NEED TO FIX TO SEND ONCE!(in backend api...)
        await saveBoard(board)
        _emitToServerSocket('boardChanged', board._id)
            // socketService.on('boardChanged', this.addMsg)

        return board;
    } catch (err) {
        console.log('Cannot get group from server', err);
    }
    await saveBoard(currBoard);
    return currBoard;
} catch (err) {
    console.log('Cannot update/save group', err);
}
}
async function saveTask(boardId, groupId, updateTask, fromIdx = null) {
    try {
        const board = await httpService.get(`board/${boardId}`)
        const groupIdx = board.groups.findIndex((group) => group.id === groupId);
        // var currGroup = board.groups[groupIdx]
        const taskIdx = board.groups[groupIdx].tasks.findIndex((task) => task.id === updateTask.id);
        // console.log('taskIdx', taskIdx);
        // console.log('groupIdx,taskIdx', groupIdx, taskIdx);

        if (groupIdx >= 0) {
            if (taskIdx >= 0) {
                board.groups[groupIdx].tasks.splice(taskIdx, 1, updateTask)
            } else board.groups[groupIdx].tasks.push(updateTask)
                // console.log('board', board);
            saveBoard(board)
            return board;
        }
    } catch (err) {
        console.log('Cannot get group from server', err);
    }



}

async function _emitToServerSocket(eventName, data = null) {
    socketService.emit(eventName, data)
}

//DONT SAVE TO STORAGE!
function createEmptyTask(title = '') {
    return {
        id: 't' + utilService.makeId(3),
        title,
        status: '-',
        dates: { startDate: '', endDate: '' },

        members: [],
    };
}

//TODO QUALITY CHECK
async function createEmptyGroup(boardId) {
    var board = await getBoardById(boardId);
    var newGroup = {
        id: 'g' + utilService.makeId(3),
        title: 'New Group',
        tasks: [],
        style: {
            color: utilService.randomColor(),
        },
    };
    board['groups'].unshift(newGroup);
    saveBoard(board);
    return newGroup;
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
                    cmpsOrder: ['status-picker', 'members-picker', 'date-picker'],
                };

                // storageService.post(KEY, emptyBoard);
                return emptyBoard
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