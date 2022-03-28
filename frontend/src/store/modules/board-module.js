import { boardGroupService } from '../../services/board-group-service';
import { authService } from '../../services/auth-service';

export default {
    state: {
        boards: [],
        // user: authService.getLoggedinUser(),
        // currToy: toyService.getEmptyToy(),
        // toysForDisplay: null,
        FilterBy: null,
        // labels: [“funny”, “sad”, “On wheels”, “Box game”, “Art”, “Baby”, “Doll”, “Puzzle”, “Outdoor”]
    },
    getters: {
        boards(state) {
            return JSON.parse(JSON.stringify(state.boards));
        },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        removeItem(state, { id }) {
            const idx = state.boards.groups.tasks.findIndex((task) => task.id === id);
            state.boards.groups.tasks.splice(idx, 1);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
        // saveToy(state, { savedToy }) {
        //     const idx = state.toys.findIndex((toy) => toy._id === savedToy._id);
        //     if (idx !== -1) state.toys.splice(idx, 1, savedToy);
        //     else state.toys.unshift(savedToy);
        // },
    },
    actions: {
        //load all boards from DB
        // },
        async loadBoards({ commit, state }) {
            console.log('loading board');
            try {
                const boards = await boardGroupService.query(state.filterBy);
                console.log(boards);
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
        async removeItem({ dispatch }, { boardId, groupId, itemId }) {
            try {
                // console.log(boardId, groupId, itemId);
                await boardGroupService.removeTask(boardId, groupId, itemId);
                dispatch({ type: 'loadBoards' });
            } catch {
                console.log('Couldnt remove item');
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
            }
        },
        async removeGroup({ dispatch }, { boardId, groupId }) {
            try {

                await boardGroupService.removeGroup(boardId, groupId);
                dispatch({ type: 'loadBoards' });
            } catch {
                console.log('Couldnt remove item');
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
            }
        },
        //saving item
        async addItem({ dispatch }, { boardId, groupId, task }) {
            try {
                await boardGroupService.saveTask(boardId, groupId, task);
                dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
                commit({
                    type: 'setIsError',
                    isError: true,
                });
            }
        },

        async addGroup({ dispatch }, { boardId }) {
            try {
                await boardGroupService.createEmptyGroup(boardId);
                dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
                // commit({
                //   type: 'setIsError',
                //   isError: true,
                // });
            }
        },

        async updateGroup({ dispatch }, { boardId, currGroup }) {
            try {
                console.log('updating group...');
                await boardGroupService.saveGroup(boardId, currGroup);
                dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
            }
        },
        async updateBoard({ dispatch }, { board }) {
            try {
                console.log('updating');
                // const copyBoard = JSON.parse(JSON.stringify(state.boards[0]))
                await boardGroupService.saveBoard(board);
                dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadBoards' });
        },
    },
};