<template>
    <div class="main">
        <form @submit.prevent="submitForm">
            <p v-if="errors.length">
                <b>Ошибки:</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
            </p>
            <input v-model="login" type="text" placeholder="Введите имя игрока">
            <button>Войти</button>
        </form>
    </div>
</template>

<script>
    export default {
        layout: 'empty',
        data: () => ({
            errors: [],
            login: ''
        }),
        methods: {
            checkForm() {
                this.errors = [];

                //region login
                if (!this.login) {
                    this.errors.push('Требуется указать имя игрока.');
                }
                if (!(/^[_а-яА-ЯёЁA-Za-z0-9]+$/.test(this.login))) {
                    this.errors.push('Имя игрока может состоять только из символов кирилицы, латиницы, цифр и знаков подчёркивания');
                }
                //endregion

                return !this.errors.length
            },
            submitForm() {
                if (this.checkForm()) {
                    let login = this.login;
                    this.$store.dispatch('auth/login', {login});
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style scoped>
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 250px;
    }

    form > * {
        margin-bottom: 15px;
    }
</style>
