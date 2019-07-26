import Vue from 'vue'
import Vuex from 'vuex'
// import { saveStatePlugin } from '../utils'

import * as user from '@/store/modules/user'
import * as task from '@/store/modules/task'
import * as column from '@/store/modules/column'
import * as board from '@/store/modules/board'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [saveStatePlugin],
  modules: {
    user,
    // board,
    column,
    task
  },
  state: {
    board
  }
})
