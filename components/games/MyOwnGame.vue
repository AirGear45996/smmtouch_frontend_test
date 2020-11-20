<template>
    <div class="main">
        <div v-if="status === 'no-game'" class="start-panel">
            <button @click="startGame">Начать игру</button>
        </div>
        <div v-if="status === 'choose'" class="categories-panel">
            <Categories :categories="categories" :points="points" :hidePointInCategory="hidePointInCategory"
                        @chooseQuestion="chooseQuestion"/>
            <button @click="endGame" class="red">Закончить игру</button>
        </div>
        <div v-if="status === 'question'" class="question-panel">
            <Question :time="time" :question="clue.question" @endTime="endTime" @answer="answer"/>
            <div class="prompt" v-if="prompt">
                Правильный ответ: "{{prompt}}"
            </div>
        </div>
        <ModalWindow v-if="modal.show" @close="modal.show = false">
            <div class="modal-content">
                <div class="result-container result-container_red" v-if="modal.state !== 'msg'">
                    <div class="result-container__title"
                         :class="{ 'result-container__title_red': modal.state !== 'correct' }">
                        {{ modal.state === 'correct' ? 'Правильно!' : 'не верно...' }}
                    </div>
                    <div class="result-container__points">
                        <span class="result-container__value"
                              :class="{ 'result-container__value_red': modal.state !== 'correct' }">
                            {{modal.state === 'correct' ? '+' : '-' }}{{modal.points}}
                        </span> баллов
                    </div>
                </div>
                <div class="result-container result-container_msg" v-else>
                    Приносим свои извинения, но в этой категории<br>
                    нет вопроса на {{modal.points}} баллов. <br><br>
                    Администратор был уведомлен и в ближайшее вермя <br>
                    исправит ситуацию <br><br>
                    Спасибо за понимание
                </div>
            </div>
            <button class="modal-default-button" @click="modal.show = false">Продолжить</button>
        </ModalWindow>
    </div>
</template>

<script>
    export default {
        props: {
            cntCategories: {
                type: Number,
                default: 5
            },
            points: {
                type: Array,
                default: () => [100, 200, 300, 400, 500]
            },
            time: {
                type: Number,
                default: 60
            },
        },
        data: () => ({
            status: 'no-game',
            categories: [],
            hidePointInCategory: [],
            clue: {},
            prompt: '',
            modal: {
                show: false,
                state: '',
                points: ''
            }
        }),
        methods: {
            async startGame() {
                const count = this.cntCategories;
                const offset = this.getRandomInt(1, 100);
                this.categories = (await this.$axios.get(`/api/categories?count=${count}&offset=${offset}`)).data;
                this.status = 'choose';
            },
            endGame() {
                this.status = 'no-game';
            },

            async chooseQuestion(categoryId, point) {
                const clues = (await this.$axios.get(`/api/clues?value=${point}&category=${categoryId}`)).data;
                if (clues.length) {
                    this.clue = clues[this.getRandomInt(0, clues.length - 1)];
                    this.prompt = this.clue.answer;
                    this.status = 'question';
                } else {
                    this.showModal('msg', point);
                    this.hidePointInCategory.push({categoryId, point});
                }
            },
            endTime() {
                this.showModal('endTime', this.clue.value);
                this.$store.dispatch('user/minusPoints', this.clue.value);
                this.hidePoint();
                this.status = 'choose';
            },
            answer(str) {

                let answer = this.clue.answer.replace(/[^0-9A-Za-zА-Яа-яЁё]/g, "");
                str = str.replace(/[^0-9A-Za-zА-Яа-яЁё]/g, "");

                if (answer.toLowerCase() === str.toLowerCase()) {
                    this.showModal('correct', this.clue.value);
                    this.$store.dispatch('user/plusPoints', this.clue.value);
                } else {
                    this.showModal('incorrect', this.clue.value);
                    this.$store.dispatch('user/minusPoints', this.clue.value);
                }

                this.hidePoint();
                this.status = 'choose';
            },

            //region Вспомогательные функции
            hidePoint() {
                const categoryId = this.clue.category_id;
                const point = this.clue.value;
                this.hidePointInCategory.push({categoryId, point});

                const cnt = this.categories.length * this.points;
                if (cnt === this.hidePointInCategory.length) {
                    this.startGame();
                }
            },
            getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            showModal(state, points) {
                this.modal.state = state;
                this.modal.points = points;
                this.modal.show = true;
            }
            //endregion
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        height: 100%;
    }

    .start-panel, .categories-panel, .question-panel {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .categories-panel > * {
        margin-bottom: 50px;
    }

    .prompt {
        position: absolute;
        right: 40px;
        bottom: 40px;
    }

    $green: #00c300;
    $red: #f70000;
    .result-container {
        text-align: center;
        margin-bottom: 30px;

        &_msg {
            text-align: left;
        }

        &__points {
            margin: 20px auto;
        }

        &__title {
            font-size: 35px;
            color: $green;

            &_red {
                color: $red;
            }
        }

        &__value {
            font-size: 25px;
            color: $green;

            &_red {
                color: $red;
            }
        }
    }

    .modal-default-button {
        display: block;
        margin: 0 auto;
    }

</style>