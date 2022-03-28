import { boardGroupService } from '../../services/board-group-service';
import { authService } from '../../services/auth-service';
import { vModelRadio } from 'vue';
// import { statSync } from 'fs';
export default {
  state: {
    boards: [],
    currBoard: null,
    // user: authService.getLoggedinUser(),
    // currToy: toyService.getEmptyToy(),
    // toysForDisplay: null,
    filterBy: null,
    // labels: [“funny”, “sad”, “On wheels”, “Box game”, “Art”, “Baby”, “Doll”, “Puzzle”, “Outdoor”]
  },
  getters: {
    boards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    currBoard(state) {
      console.log('state.filterBy', state.filterBy);
      if (state.filterBy) {
        //     // email.isRead === filter.isReadnow &&

        var regex = new RegExp(state.filterBy.title, 'i');
        var result = state.currBoard.groups.filter((group) => regex.test(group.title));
        var copyCurrBoard = JSON.parse(JSON.stringify(result));
        console.log('befoe tasks', copyCurrBoard);
        copyCurrBoard.groups = result;
        for (var i = 0; i < state.currBoard.groups.length; i++) {
          var groupRun = JSON.parse(JSON.stringify(state.currBoard.groups[i]));
          var taskFiltered = state.currBoard.groups[i].tasks.filter((task) => regex.test(task.title));
          console.log(` group ${i}`, taskFiltered);
          if (taskFiltered.length > 0) {
            if (!copyCurrBoard.groups.find((group) => group.id === groupRun.id)) {
              groupRun.tasks = taskFiltered;
              copyCurrBoard.groups.push(groupRun);
            }
          }
        }

        console.log('after flter', copyCurrBoard);

        return copyCurrBoard;
      } else {
        // console.log('fullBoard', JSON.parse(JSON.stringify(state.currBoard)));
        return JSON.parse(JSON.stringify(state.currBoard));
      }

      //     });
      //   }
      //   //the menu should set the curr board!!! if not - [0]
      // //   else return JSON.parse(JSON.stringify(state.boards[0]));
      // },
      // console.log(‘currBoard’, state.currBoard);
      //the menu should set the curr board!!! if not - [0]
      // console.log('currBoard', state.currBoard);
      //the menu should set the curr board!!! if not - [0]
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
    setCurrBoard(state, { board }) {
      //TODO - find board by id or index and set!
      // state.currBoard = board;
      state.currBoard = board;
      // console.log(state.currBoard);
    },
    addItem(state, { board, groupId, task }) {
      //I ADDED TO CURR BOARD - BUT! also can do it for state.boards!(maybe its better, ask shani)

      // var boardIdx = state.boards.findIndex(boardFromStates => boardFromStates._id === board._id)
      var groupIdx = state.currBoard.groups.findIndex((group) => group.id === groupId);
      // console.log(board, boardIdx);
      // state.boards[boardIdx] = board
      // console.log(state.currBoard.groups[0].tasks);
      state.currBoard.groups[groupIdx].tasks.push(task);
      console.log('state.currBoard', state.currBoard);
      // state.currBoard.groups[0].tasks.push(task)
      // console.log('gor inside');
      // state.boards = 0;
      // state.currBoard = 0
      // console.log('groupIdx,boardIdx', groupIdx, boardIdx);
      // console.log(state.currBoard);
      // console.log(boardId, groupId, task);
    },
    //update group name current
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
    async addItem({ dispatch, commit }, { boardId, groupId, task }) {
      try {
        await boardGroupService.saveTask(boardId, groupId, task);
        var board = await boardGroupService.getBoardById(boardId);
        commit({
          type: 'addItem',
          board,
          groupId,
          task,
        });

        // dispatch({ type: 'loadBoards' });
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
  },
};
