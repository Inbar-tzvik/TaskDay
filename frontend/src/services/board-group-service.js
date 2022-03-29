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
const boards = [{
        _id: "b101",
        title: "GaneshUpdate12",
        createdAt: 1589983468418,
        style: {
            bgColor: "blue"
        },
        labels: [{
                id: "l101",
                title: "Done",
                color: "#61bd4f"
            },
            {
                id: "l102",
                title: "Progress",
                color: "#61bd33"
            }
        ],
        members: [{
                _id: "u101",
                fullname: "Inbari Tzvik",
                imgUrl: "https://www.google.com"
            },
            {
                _id: "u102",
                fullname: "Zohar Ganesh",
                imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
            },
            {
                _id: "u103",
                fullname: "Baba Ninja",
                imgUrl: "https://cdn.myimgstock.com/myimgstock/preview/sri-sai-baba-face-images-photos-2-11609604164xclnpdmkfv.jpg"
            }
        ],
        groups: [{
                id: "g101",
                title: "this group updated by Taskday",
                tasks: [{
                        id: "t101",
                        title: "this task updated by Taskday",
                        status: "Working on it",
                        priority: "Medium",
                        members: [{
                                _id: "u101",
                                fullname: "Inbari Tzvik",
                                imgUrl: "https://st.depositphotos.com/1491329/3629/i/950/depositphotos_36297389-stock-photo-beauty-portrait-beautiful-spa-woman.jpg"
                            },
                            {
                                _id: "u102",
                                fullname: "Zohar Ganesh",
                                imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
                            },
                            {
                                _id: "u104",
                                fullname: "Erez Tal",
                                imgUrl: "https://pbs.twimg.com/media/DxwB0a_WoAEQShC.jpg"
                            }
                        ]
                    },
                    {
                        id: "t102",
                        title: "Add Samples",
                        status: "Stuck",
                        priority: "High",
                        members: [{
                                _id: "u102",
                                fullname: "Ganesh Shiva",
                                imgUrl: ""
                            },
                            {
                                _id: "u104",
                                fullname: "Erez Tal",
                                imgUrl: "https://pbs.twimg.com/media/DxwB0a_WoAEQShC.jpg"
                            }
                        ]
                    },
                    {
                        id: "t113",
                        title: "Working on css ",
                        status: "Stuck",
                        priority: "Medium",
                        members: [{
                            _id: "u104",
                            fullname: "Erez Tal",
                            imgUrl: "https://pbs.twimg.com/media/DxwB0a_WoAEQShC.jpg"
                        }]
                    },
                    {
                        id: "t115",
                        title: "Today i don't feel like doing anything",
                        status: "Done",
                        priority: "Low",
                        members: []
                    }
                ],
                style: {
                    color: "rgb(87, 155, 252)"
                }
            },
            {
                id: "g201",
                title: "Group 5",
                tasks: [{
                        id: "c201",
                        title: "Replace logo",
                        status: "Working on it",
                        priority: "Medium",
                        members: [{
                            _id: "u103",
                            fullname: "Baba Ninja",
                            imgUrl: "https://cdn.myimgstock.com/myimgstock/preview/sri-sai-baba-face-images-photos-2-11609604164xclnpdmkfv.jpg"
                        }]
                    },
                    {
                        id: "c202",
                        title: "Add Samples",
                        status: "Stuck",
                        priority: "Medium",
                        members: []
                    },
                    {
                        id: "c213",
                        title: "Working on css ",
                        status: "Stuck",
                        priority: "Medium",
                        members: [{
                            _id: "u103",
                            fullname: "Baba Ninja",
                            imgUrl: "https://cdn.myimgstock.com/myimgstock/preview/sri-sai-baba-face-images-photos-2-11609604164xclnpdmkfv.jpg"
                        }]
                    },
                    {
                        id: "c215",
                        title: "Today i don't feel like doing anything",
                        status: "Done",
                        priority: "Medium",
                        members: []
                    }
                ],
                style: {
                    color: "rgb(187, 51, 84)"
                }
            },
            {
                id: "g134",
                title: "this new group by Taskday",
                tasks: [{
                        id: "t101",
                        title: "this task updated by Taskday",
                        status: "Working on it",
                        priority: "Medium",
                        members: [{
                                _id: "u101",
                                fullname: "Inbari Tzvik",
                                imgUrl: "https://st.depositphotos.com/1491329/3629/i/950/depositphotos_36297389-stock-photo-beauty-portrait-beautiful-spa-woman.jpg"
                            },
                            {
                                _id: "u102",
                                fullname: "Zohar Ganesh",
                                imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
                            }
                        ]
                    },
                    {
                        id: "t102",
                        title: "Add Samples",
                        status: "Stuck",
                        priority: "High",
                        members: [{
                            _id: "u102",
                            fullname: "Zohar Ganesh",
                            imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
                        }]
                    },
                    {
                        id: "t113",
                        title: "Working on css ",
                        status: "Stuck",
                        priority: "Medium",
                        members: []
                    },
                    {
                        id: "t115",
                        title: "Today i don't feel like doing anything",
                        status: "Done",
                        priority: "Low",
                        members: []
                    }
                ],
                style: {
                    color: "rgb(87, 155, 252)"
                }
            }
        ],
        activitiesLog: [{
            id: "a101",
            txt: "Changed Color",
            createdAt: 154514,
            byMember: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            task: {
                id: "t101",
                title: "Replace Logo"
            }
        }],
        cmpsOrder: [
            "status-picker",
            "date-picker",
            "priority-picker",
            "member-picker"
        ]
    },
    {
        _id: "b102",
        title: "Shiva Project",
        createdAt: 1589983468422,
        style: {
            bgColor: "red"
        },
        labels: [{
                id: "l101",
                title: "Done",
                color: "#61bd4f"
            },
            {
                id: "l102",
                title: "Progress",
                color: "#61bd33"
            }
        ],
        members: [{
                _id: "u101",
                fullname: "Inbari Tzvik",
                imgUrl: "https://www.google.com"
            },
            {
                _id: "u102",
                fullname: "Zohar Ganesh",
                imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
            },
            {
                _id: "u103",
                fullname: "Baba Ninja",
                imgUrl: "https://cdn.myimgstock.com/myimgstock/preview/sri-sai-baba-face-images-photos-2-11609604164xclnpdmkfv.jpg"
            }
        ],
        groups: [{
                id: "g101",
                title: "Group 1",
                tasks: [{
                        id: "t101",
                        title: "Replace logo",
                        status: "Working on it",
                        priority: "Medium",
                        members: [{
                                _id: "u101",
                                fullname: "Inbari Tzvik",
                                imgUrl: "https://st.depositphotos.com/1491329/3629/i/950/depositphotos_36297389-stock-photo-beauty-portrait-beautiful-spa-woman.jpg"
                            },
                            {
                                _id: "u102",
                                fullname: "Zohar Ganesh",
                                imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
                            }
                        ]
                    },
                    {
                        id: "t102",
                        title: "Add Samples",
                        status: "Stuck",
                        priority: "High",
                        members: [{
                            _id: "u102",
                            fullname: "Zohar Ganesh",
                            imgUrl: "https://upload.wikimedia.org/wikipedia/en/0/01/Zohar_Argov_%281980s%29.jpg"
                        }]
                    },
                    {
                        id: "t113",
                        title: "Working on css ",
                        status: "Stuck",
                        priority: "Medium",
                        members: []
                    },
                    {
                        id: "t115",
                        title: "Today i don't feel like doing anything",
                        status: "Done",
                        priority: "Low",
                        members: []
                    }
                ],
                style: {
                    color: "rgb(87, 155, 252)"
                }
            },
            {
                id: "g201",
                title: "Group 5",
                tasks: [{
                        id: "c201",
                        title: "Replace logo",
                        status: "Working on it",
                        priority: "Medium",
                        members: []
                    },
                    {
                        id: "c202",
                        title: "Add Samples",
                        status: "Stuck",
                        priority: "Medium",
                        members: []
                    },
                    {
                        id: "c213",
                        title: "Working on css ",
                        status: "Stuck",
                        priority: "Medium",
                        members: []
                    },
                    {
                        id: "c215",
                        title: "Today i don't feel like doing anything",
                        status: "Done",
                        priority: "Medium",
                        members: []
                    }
                ],
                style: {
                    color: "rgb(187, 51, 84)"
                }
            }
        ],
        activitiesLog: [{
            id: "a101",
            txt: "Changed Color",
            createdAt: 154514,
            byMember: {
                _id: "u101",
                fullname: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            task: {
                id: "t101",
                title: "Replace Logo"
            }
        }],
        cmpsOrder: [
            "status-picker",
            "date-picker",
            "priority-picker",
            "member-picker"
        ]
    },
];

export const boardGroupService = {
    query,
    getBoardById,
    getGroupById,
    getTaskById,
    removeBoard,
    removeGroup,
    removeTask,
    saveBoard,
    saveGroup,
    saveTask,
    createEmptyTask,
    createEmptyGroup,
    createNewBoard,
};

//************CHEKING AREA - can put on comment *********/
storageService._save(KEY, boards);

check();
async function check() {
    // var boardById = await getBoardById("b101")
    // console.log('getBoardById: ', boardById);
    // var groupById = await getGroupById('b101', 'g102')
    // console.log('getGroupById: ', groupById);
    // var taskById = await getTaskById('b101', 'g101', 'c102')
    // console.log('getTaskById: ', taskById);
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
    // var task = {
    //     id: 'c102',
    //     title: 'hello',
    // }
    // await saveTask('b101', 'g101', task);
}

//********** /CHECKING AREA *********/

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

async function getTaskById(boardId, groupId, taskId) {
    try {
        const currBoard = await storageService.get(KEY, boardId);
        const currGroup = currBoard.groups.find((group) => group.id === groupId);
        const currTask = currGroup.tasks.find((task) => task.id === taskId);
        return currTask;
    } catch (err) {
        console.log('Cannot find task', err);
    }
}

//TODO - do we need async here? "storageService.remove" returns nothing
async function removeBoard(boardId) {
    return storageService.remove(KEY, boardId);
}

async function removeGroup(boardId, groupId, removedIndex = null) {

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
async function saveGroup(boardId, updateGroup, addedIdxForDrop = null) {
    try {
        var currBoard = await getBoardById(boardId);
        var currGroup = currBoard.groups.find((group) => group.id === updateGroup.id);
        var currGroupIdx = currBoard.groups.indexOf(currGroup);

        if (addedIdxForDrop) {
            currBoard.groups.splice(addedIdxForDrop, 0, updateGroup)
        } else {
            if (currGroup) {
                currBoard.groups[currGroupIdx] = updateGroup;
            } else currBoard.groups.push(updateGroup);
        }
        await saveBoard(currBoard);
        return currBoard;
    } catch (err) {
        console.log('Cannot update/save group', err);
    }
}
async function saveTask(boardId, groupId, updateTask, fromIdx = null) {
    try {
        var currGroup = await getGroupById(boardId, groupId);
        var currTask = currGroup.tasks.find((task) => task.id === updateTask.id);
        var currTaskIdx = currGroup.tasks.indexOf(currTask);
        // console.log(currTaskIdx);

        if (fromIdx) {
            currGroup.tasks.splice(fromIdx, 0, updateTask)
        } else {
            if (currTask) {
                currGroup.tasks[currTaskIdx] = updateTask;
            } else {
                currGroup.tasks.push(updateTask);
            }
        }

        await saveGroup(boardId, currGroup);
        // return updateTask
    } catch {}
}

//DONT SAVE TO STORAGE!
function createEmptyTask(title = '') {
    return {
        id: 't' + utilService.makeId(3),
        title,
        status: '-',
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
            task: {
                id: 'c101',
                title: 'Replace Logo',
            },
        }, ],
        // for monday
        cmpsOrder: ['status-picker', 'members-picker', 'date-picker'],
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