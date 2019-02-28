export const state = ()=>({
  status: null,
  keyword: null,
  exact: false,
  slim: true,
  search_results: [],
  tracked_items: [],
  data: [],
  current_item: null,
})

export const mutations = {
  SET(state, [ key, value ]){
    state[key] = value
  },
  ADD_TO_TRACKED_ITEMS(state, item){
    state.tracked_items.push(item)
  },
  REMOVE_FROM_TRACKED_ITEMS(state, item){
    state.tracked_items = state.tracked_items.filter(v => {
      return v !== item
    })
  },
}

export const actions = {
  async fetch({ state }){
    const request = await this.$axios.$get('/api', {
      params: {
        item: state.keyword.trim(),
        slim: state.slim,
        exact: state.exact,
      },
    })
    return request
  },
  async search_init({ commit }){
    commit('SET', ['keyword', null])
    commit('SET', ['search_results', []])
  },
  async search({ commit, dispatch }, keyword){
    commit('SET', ['keyword', keyword])
    commit('SET', ['slim', true])
    commit('SET', ['exact', false])
    commit('SET', ['status', 'searching'])
    const request = await dispatch('fetch')
    commit('SET', ['search_results', request])
    commit('SET', ['status', null])
  },
  async track({ state, commit, dispatch }, item_name){
    commit('SET', ['status', 'saving_tracked_items'])
    commit('SET', ['current_item', item_name])
    if(state.tracked_items.indexOf(item_name) === -1){
      commit('ADD_TO_TRACKED_ITEMS', item_name)
    }
    else{
      commit('REMOVE_FROM_TRACKED_ITEMS', item_name)
    }
    await dispatch('update_tracked_items')
    commit('SET', ['current_item', null])
  },
  async update_tracked_items({ state, commit, dispatch }){
    if(state.tracked_items.length !== 0){
      const tracked_items = state.tracked_items.join('|')
      commit('SET', ['keyword', tracked_items])
      commit('SET', ['slim', false])
      commit('SET', ['exact', true])
      commit('SET', ['status', 'page_loading'])
      const request = await dispatch('fetch')
      commit('SET', ['data', request])
      commit('SET', ['status', null])
    }
    else{
      commit('SET', ['data', []])
      commit('SET', ['status', null])
    }
  },
}

export const getters = {
  has_tracked_items(state){
    return state.tracked_items.length !== 0
  },
  search_initialized(state, getters){
    return !getters.searching && !!!state.keyword && state.search_results.length === 0
  },
  has_search_results(state, getters){
    return state.search_results.length !== 0 && !getters.searching
  },
  page_loading(state){
    return state.status === 'page_loading'
  },
  searching(state){
    return state.status === 'searching'
  },
}