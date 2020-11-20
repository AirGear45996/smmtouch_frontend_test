export const state = () => ({
    login: null,
    statistic: null
});

export const mutations = {
    setLogin(state, login) {
        state.login = login
    },
    setStatistic(state, data) {
        state.statistic = data
    },
    incrementQuestionPlayed(state) {
        if(typeof state.statistic.questionPlayed !== "undefined") {
            state.statistic.questionPlayed++;
        }
    },
    incrementCorrectAnswers(state) {
        if(typeof state.statistic.correctAnswers !== "undefined") {
            state.statistic.correctAnswers++;
        }
    },
    incrementIncorrectAnswers(state) {
        if(typeof state.statistic.incorrectAnswers !== "undefined") {
            state.statistic.incorrectAnswers++;
        }
    },
    addPoint(state,points) {
        if(typeof state.statistic.pointsTotal !== "undefined") {
            state.statistic.pointsTotal += points;
        }
    }
};

export const actions = {
    init({commit}, {login}) {
        commit('setLogin',login);
        commit('setStatistic',{
            questionPlayed: 0,
            correctAnswers: 0,
            incorrectAnswers: 0,
            pointsTotal: 0,
        });
    },
    plusPoints({commit},point) {
        commit('incrementQuestionPlayed');
        commit('incrementCorrectAnswers');
        commit('addPoint',point);
    },
    minusPoints({commit},point) {
        commit('incrementQuestionPlayed');
        commit('incrementIncorrectAnswers');
        commit('addPoint',point * -1);
    },
};

export const getters = {
    login: s => s.login,
    statistic: s => s.statistic,
};
