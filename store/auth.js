export const state = () => ({
    token: null
});

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = null
    }
};

export const actions = {
    setToken({commit}, token) {
        commit('setToken', token);
    },
    logout({commit}) {
        commit('clearToken');
    },
    login({dispatch}, {login}) {
        const token = 'testToken';
        dispatch('setToken', token);
        dispatch('user/init', {login},{root:true});
    }
};

export const getters = {
    isAuth: s => !!s.token,
    token: s => s.token,
};
