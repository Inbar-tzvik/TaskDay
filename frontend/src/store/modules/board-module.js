import { boardGroupService } from '../../services/board-group-service';
import { authService } from '../../services/auth-service';

export default {
  state: {
    boards: [],
    currBoard: null,
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
    currBoard(state) {
      if (state.filterBy.title) {
        // email.isRead === filter.isReadnow &&
        var regex = new RegExp(filter.txt, 'i');
        var result = emailsBeforeFil.filter((email) => {
          return (
            loggedinUser.email !== email.to &&
            (regex.test(email.subject) || regex.test(email.from.name) || regex.test(email.body))
          );
        });
      }
      //the menu should set the curr board!!! if not - [0]
      else return JSON.parse(JSON.stringify(state.boards[0]));
    },
    fillterdBoard(state) {},
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
    setCurrBoard(state, { board }) {
      //TODO - find board by id or index and set!
      // state.currBoard = board;
      state.currBoard = state.boards[0];
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
    async setCurrBoard({ commit, dispatch }, { board }) {
      commit({ type: 'setCurrBoard', board });
      dispatch({ type: 'loadBoards' });
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadBoards' });
    },
  },
};
