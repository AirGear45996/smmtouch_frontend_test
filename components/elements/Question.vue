<template>
    <div class="main-question">
        <div class="timer">
            <div>
                {{ time_L }}
            </div>
        </div>
        <div class="question">
            {{ question }}
        </div>
        <div class="answer">
            <input v-model="answer" type="text" placeholder="Введите ответ" @keyup.enter="sendAnswer">
            <button @click="sendAnswer">Ответить</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            time: {
                type: Number,
                default: 60
            },
            question: String
        },
        data: () => ({
            time_L: '',
            answer: '',
        }),
        mounted() {
            this.time_L = this.time;
            this.timer();
        },
        methods: {
            sendAnswer() {
                this.$emit('answer',this.answer);
            },
            timer() {
                setTimeout(() => {
                    if(!this.time_L) {
                        this.$emit('endTime');
                    } else {
                        this.time_L--;
                        this.timer();
                    }
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-question {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .timer {
        border: 2px solid #505050;
        border-radius: 50%;
        font-size: 60px;
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .question {
        margin: 45px 0;
        font-size: 25px;
        max-width: 600px;
        text-align: center;
    }
    .answer {
        display: flex;
        flex-direction: column;
        & > * {
            margin-bottom: 10px;
        }
    }
</style>