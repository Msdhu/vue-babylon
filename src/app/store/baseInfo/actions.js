import * as api from '../../api';

const actions = {
  async getProInfo({ rootState, commit }) {
    const { isApp } = rootState.common;
    const params = { isApp };
    let proInfo = {};

    commit('setIsLoadingProInfo', { isLoadingProInfo: true });

    const req = api.getProInfo(params);
    try {
      const rsp = await req;
      const { proInfo: data } = rsp.data;
      if (data) {
        proInfo = data;
      }
    } catch (err) {
    } finally {
      commit('setProInfo', { proInfo });
      commit('setIsLoadingProInfo', { isLoadingProInfo: false });
    }
  },
};

export default actions;
