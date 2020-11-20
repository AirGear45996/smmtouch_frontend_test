<template>
    <div>
        <ul>
            <li>Сыгранных вопросов: {{statistic.questionPlayed}}</li>
            <li>Верных ответов: {{statistic.correctAnswers}}</li>
            <li>Не верных ответов: {{statistic.incorrectAnswers}}</li>
            <li>Сумма баллов: {{statistic.pointsTotal}}</li>
        </ul>

    </div>
</template>

<script>
    export default {
        computed: {
            statistic() {
                return this.$store.getters['user/statistic']
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        padding: 0;
        margin: 15px;
        font-size: 16px;
        li {
            list-style-type: none;
            padding: 5px 15px;
            margin: 0;
        }
    }
</style>