import { boardGroupService } from '../../services/board-group-service';
import { authService } from '../../services/auth-service';
import { vModelRadio } from 'vue';


export default {
    state: {
        boards: [],
        currBoard: null,
        // user: authService.getLoggedinUser(),
        filterBy: {
            title: '',
            user: '',
        },
        currPage: '',
        currTask: null,
        currGroupId: null, // labels: [“funny”, “sad”, “On wheels”, “Box game”, “Art”, “Baby”, “Doll”, “Puzzle”, “Outdoor”]
    },
    getters: {
        currPage(state) {
            return state.currPage;
        },
        boards(state) {
            return JSON.parse(JSON.stringify(state.boards));
        },
        getFilter(state) {
            return state.filterBy;
        },
        currBoard(state) {
            // console.log('state.filterBy', state.filterBy);
            if (!(!state.filterBy ||
                    (state.filterBy.title === '' && state.filterBy.user === '')
                )) {
                //     // email.isRead === filter.isReadnow &&
                var cmpsToReturn = JSON.parse(
                    JSON.stringify(state.boards[0].cmpsOrder)
                );
                var regex = new RegExp(state.filterBy.title, 'i');
                var result = state.currBoard.groups.filter((group) =>
                    regex.test(group.title)
                );
                var copyCurrBoard = JSON.parse(JSON.stringify(result));
                // console.log('befoe tasks', copyCurrBoard);
                copyCurrBoard.groups = result;
                for (var i = 0; i < state.currBoard.groups.length; i++) {
                    var groupRun = JSON.parse(JSON.stringify(state.currBoard.groups[i]));
                    var taskFiltered = state.currBoard.groups[i].tasks.filter((task) =>
                        regex.test(task.title)
                    );
                    // console.log(` group ${i}`, taskFiltered);
                    if (taskFiltered.length > 0) {
                        if (!copyCurrBoard.groups.find((group) => group.id === groupRun.id)) {
                            groupRun.tasks = taskFiltered;
                            copyCurrBoard.groups.push(groupRun);
                        }
                    }
                }

                // console.log('after flter', copyCurrBoard);
                copyCurrBoard.cmpsOrder = cmpsToReturn;
                return copyCurrBoard;
            } else {
                // console.log('fullBoard', JSON.parse(JSON.stringify(state.currBoard)));
                return JSON.parse(JSON.stringify(state.currBoard));
            }
        },
        getCurrTask(state) {
            // return JSON.parse(JSON.stringify(state.currTask))
            return state.currTask
        },
        getCurrGroupId(state) {
            return JSON.parse(JSON.stringify(state.currGroupId))
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        setCurrBoard(state, { board }) {
            state.currBoard = board;
        },
        setCurrPage(state, { page }) {
            console.log('set curr page', page);
            state.currPage = page;
        },
        addItem(state, { groupId, task, fromIdx = null }) {
            var groupIdx = state.currBoard.groups.findIndex(
                (group) => group.id === groupId
            );
            var taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(
                (taskFromCurrBoard) => taskFromCurrBoard.id === task.id
            );
            if (fromIdx) {
                state.currBoard.groups[groupIdx].tasks.splice(fromIdx, 0, task);
            } else {
                if (taskIdx >= 0) {
                    state.currBoard.groups[groupIdx].tasks[taskIdx] = task;
                } else state.currBoard.groups[groupIdx].tasks.push(task);
            }
        },
        removeItem(state, { groupId, itemId }) {
            var groupIdx = state.currBoard.groups.findIndex(
                (group) => group.id === groupId
            );
            var taskIdx = state.currBoard.groups[groupIdx].tasks.findIndex(
                (taskFromCurrBoard) => taskFromCurrBoard.id === itemId
            );
            console.log('groupId, itemId', groupIdx, taskIdx);
            state.currBoard.groups[groupIdx].tasks.splice(taskIdx, 1);
        },
        addGroup(state, { newGroup }) {
            state.currBoard.groups.splice(0, 0, newGroup);
        },
        updateGroup(state, { currGroup }) {
            var groupIdx = state.currBoard.groups.findIndex(
                (group) => group.id === currGroup.id
            );
            state.currBoard.groups.splice(groupIdx, 1, currGroup);
        },
        removeGroup(state, { groupId }) {
            var groupIdxToRemove = state.currBoard.groups.findIndex(
                (group) => group.id === groupId
            );
            state.currBoard.groups.splice(groupIdxToRemove, 1);
        },
        setCurrTask(state, { task }) {
            state.currTask = task
        },
        setCurrGroupId(state, { groupId }) {
            state.currGroupId = groupId
        },
    },
    actions: {
        async loadBoards({ commit, state }) {
            try {
                const boards = await boardGroupService.query(state.filterBy);
                console.log('loading boards:', boards);
                commit({
                    type: 'setBoards',
                    boards,
                });
            } catch {
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
                console.log('error occured while getting board');
            }
        },
        async removeItem({ dispatch, commit }, { boardId, groupId, itemId }) {
            try {
                // console.log(boardId, groupId, itemId);
                await boardGroupService.removeTask(boardId, groupId, itemId);
                commit({
                    type: 'removeItem',
                    groupId,
                    itemId,
                });
            } catch {
                console.log('Couldnt remove item');
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
            }
        },
        async removeGroup({ dispatch, commit }, { boardId, groupId, removedIndex = null }) {
            try {
                await boardGroupService.removeGroup(
                    boardId,
                    groupId,
                    (removedIndex = null)
                );
                commit({
                    type: 'removeGroup',
                    groupId,
                });
            } catch {
                console.log('Couldnt remove group');
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
            }
        },
        //saving/add item
        async addItem({ dispatch, commit }, { boardId, groupId, task, fromIdx = null }) {
            try {
                await boardGroupService.saveTask(boardId, groupId, task, fromIdx);
                // commit({ type: 'setCurrTask', task });
                commit({
                    type: 'addItem',
                    groupId,
                    task,
                    fromIdx,
                });
            } catch (err) {
                console.log('Couldnt save item', err);
                commit({
                    type: 'setIsError',
                    isError: true,
                });
            }
        },
        async addGroup({ dispatch, commit }, { boardId }) {
            try {
                var newGroup = await boardGroupService.createEmptyGroup(boardId);
                commit({
                    type: 'addGroup',
                    newGroup,
                });
            } catch (err) {
                console.log('Couldnt save item', err);
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
            }
        },
        async updateGroup({ dispatch, commit }, { boardId, currGroup, addedIdxForDrop = null }) {
            console.log('boardId, currGroup', boardId, currGroup);
            try {
                // if (removeIdxForDrop){
                // }
                console.log('updating group...');
                await boardGroupService.saveGroup(boardId, currGroup, addedIdxForDrop);
                commit({
                    type: 'updateGroup',
                    currGroup,
                });
            } catch (err) {
                console.log('Couldnt save item', err);
            }
        },

        async updateBoardDrop({ state, commit }) {
            const copyBoard = JSON.parse(JSON.stringify(state.currBoard));
            // socketService.emit('board newUpdateBoard', copyBoard)
            await boardGroupService.saveBoard(copyBoard);
        },
        async updateBoard({ dispatch, commit }, { board }) {
            try {
                console.log('updating');
                // const copyBoard = JSON.parse(JSON.stringify(state.boards[0]))
                await boardGroupService.saveBoard(board);
                commit({
                    type: 'setCurrBoard',
                    board,
                });
                // dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
            }
        },
        async setCurrBoard({ commit, state, dispatch }, { boardId }) {
            // var board = state.boards.filter(board => board._id === boardId)
            var board = await boardGroupService.getBoardById(boardId);
            // console.log('board in setCuttboard', board);
            commit({ type: 'setCurrBoard', board });
            dispatch({ type: 'loadBoards' });
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            //   dispatch({ type: 'loadBoards' });
        },

        async taskForDeatil({ state, commit }, { groupId, task }) {
            // console.log('groupId,task', groupId, task);
            commit({ type: 'setCurrGroupId', groupId });
            commit({ type: 'setCurrTask', task });


        },
        async addItemWithoutServer({ dispatch, commit }, { boardId, groupId, task }) {
            try {
                // await boardGroupService.saveTask(boardId, groupId, task, fromIdx);
                // commit({ type: 'setCurrTask', task });
                commit({
                    type: 'addItem',
                    groupId,
                    task,
                    fromIdx,
                });
            } catch (err) {
                console.log('Couldnt save item', err);
                commit({
                    type: 'setIsError',
                    isError: true,
                });
            }
        },
    },
};