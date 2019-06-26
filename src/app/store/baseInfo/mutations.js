const mutations = {
  setProInfo(state, { proInfo }) {
    state.proInfo = { ...proInfo };
  },
  setIsLoadingProInfo(state, { isLoadingProInfo }) {
    state.isLoadingProInfo = isLoadingProInfo;
  },
};

export default mutations;
