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
            return state.boards;
        },
        // toysForDisplay(state, { filter }) {
        //     // if (!state.toysForDisplay) return state.toys
        //     // return state.toysForDisplay
        //     return state.toys
        // },
        // labels(state) {
        //     return state.lables
        // },
        // getCurrToy(state) {
        //     return {...state.currToy }
        // },
        // user(state) {
        //     setTimeout(() => {
        //         // state.user = authService.getLoggedinUser()
        //         // return state.user
        //     }, 1000);
        // },
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
        saveToy(state, { savedToy }) {
            const idx = state.toys.findIndex((toy) => toy._id === savedToy._id);
            if (idx !== -1) state.toys.splice(idx, 1, savedToy);
            else state.toys.unshift(savedToy);
        },
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
        async removeItem({ dispatch }, { boardId, groupId, itemId }) {
            try {
                console.log(boardId, groupId, itemId);
                await boardGroupService.removeTask(boardId, groupId, itemId);
                console.log('worked');
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
        async saveItem({ dispatch }, payload) {
            try {
                await boardGroupService.saveItem(payload.item);
                dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
                commit({
                    type: 'setIsError',
                    isError: true,
                });
            }
        },
        async addItem({ dispatch }) {
            try {
                await boardGroupService.addItem();
                dispatch({ type: 'loadBoards' });
            } catch (err) {
                console.log('Couldnt save item', err);
                commit({
                    type: 'setIsError',
                    isError: true,
                });
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadBoards' });
        },
    },
};
