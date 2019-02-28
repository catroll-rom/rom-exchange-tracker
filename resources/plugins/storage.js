import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'rom_exchange_tracker',
        paths: ['tracked_items']
    })(store)
  })
}