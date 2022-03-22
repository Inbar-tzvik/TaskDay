import { boardService } from '../../services/board-service'
import { authService } from '../../services/auth-service'


export default {
    state: {
        // toys: [],
        // user: authService.getLoggedinUser(),
        // currToy: toyService.getEmptyToy(),
        // toysForDisplay: null,
        // currFilter: null,
        // labels: ["funny", "sad", "On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
    },
    getters: {
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
        // setCurrToy(state, { toyId }) {
        //     if (toyId) {
        //         toyService.getById(toyId)
        //             .then((toy) => {
        //                 console.log(toy);
        //                 state.currToy = { toy }
        //             })
        //     } else state.currToy = toyService.getEmptyToy();

        // },
        // setToys(state, { toys }) {
        //     state.toys = toys
        // },
        // removeToy(state, { id }) {
        //     const idx = state.toys.findIndex((toy) => toy.id === id)
        //     state.toys.splice(idx, 1)
        // },
        // saveToy(state, { toy }) {
        //     const idx = state.toys.findIndex((currToy) => currToy.id === toy.id)
        //     if (idx !== -1) state.toys.splice(idx, 1, toy)
        //     else state.toys.push(toy)
        // },
        // updateToy(state, { toyToUpdate }) {
        //     const idx = state.toys.findIndex(toy => toy._id === toyToUpdate._id);
        //     console.log('idxidxidx', idx);
        //     if (idx >= 0) {
        //         state.toys.splice(idx, 1, toyToUpdate)
        //     } else state.toys.push(toyToUpdate)

        //     console.log('toys after!:', state.toys)
        // },

    },
    actions: {
        // filter(){

        // },
        // saveToy(context, { toyToEdit }) {
        //     console.log(toyToEdit);
        //     return toyService.save(toyToEdit)
        //         .then(savedToy => {
        //             console.log('after', toyToEdit._id);
        //             context.commit({ type: 'updateToy', toyToUpdate: savedToy })
        //             return savedToy
        //         })
        //         .catch(err => {
        //             console.error('Cannot Add Product', err)
        //             throw err
        //         })
        // },
        // loadToys({ state, commit }, { filter }) {
        //     // commit({ type: 'setIsLoading', isLoading: true })
        //     // console.log(filter)
        //     return toyService.query(filter)
        //         .then(toys => {
        //             console.log(toys);
        //             commit({ type: 'setToys', toys })
        //         })
        //         .catch(err => {
        //             console.error('Cannot Load Toys', err)
        //             throw err
        //         })
        //         .finally(() => {
        //             commit({ type: 'setIsLoading', isLoading: false })
        //         })
        // },
        // removeToy({ commit }, { id }) {
        //     toyService.remove(id).then(() => {
        //         commit({ type: 'removeToy', id })
        //     })
        // },
    },
}