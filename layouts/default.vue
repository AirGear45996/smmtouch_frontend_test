<template>
    <div class="main">
        <div class="menu" :class="{ 'menu_active': activeMobileMenu }">
            <div class="menu__close" @click="flipFlopMenu"></div>
            <div class="player">
                <div class="player__name">
                    Игрок: {{ login }}
                </div>
            </div>
            <ul class="nav">
                <li class="nav__li" @click="flipFlopMenu">
                    <nuxt-link to="/" exact active-class="active" class="nav__link">Главная</nuxt-link>
                </li>
                <li class="nav__li" @click="flipFlopMenu">
                    <nuxt-link to="/user/statistics" active-class="active" class="nav__link">Статистика</nuxt-link>
                </li>
                <li class="nav__li">
                    <a href="#" class="nav__link" @click.prevent="logout">Выход</a>
                </li>
            </ul>
        </div>
        <div class="header-mobile">
            <label class="header-mobile__btn" @click="flipFlopMenu">
                <span></span>
            </label>
            <div class="header-mobile__player">
                Игрок: {{ login }}
            </div>
        </div>
        <div class="content">
            <Nuxt/>
        </div>
    </div>
</template>

<script>
    export default {
        middleware: ['auth'],
        data: () => ({
            activeMobileMenu: false,
        }),
        computed: {
            login() {
                return this.$store.getters['user/login'];
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/login');
            },
            flipFlopMenu() {
                this.activeMobileMenu = !this.activeMobileMenu
            }
        }
    }
</script>

<style scoped lang="scss">
    .main {
        display: flex;
        align-items: center;
        height: 100vh;
    }

    .menu, .content {
        height: 100%;
    }

    $menu-width: 300px;
    $btn-close-size: 30px;
    $btn-close-line-thickness: 2px;
    .menu {
        background: #34495E;
        width: $menu-width;

        &__close {
            display: none;
            width: $btn-close-size;
            height: $btn-close-size;
            position: absolute;
            right: 5px;
            top: 5px;

            &::before, &::after {
                position: absolute;
                content: '';
                height: $btn-close-line-thickness;
                width: inherit;
                background: white;
                left: 0;
            }

            &::before {
                top: calc(50% - #{$btn-close-line-thickness});
                transform: rotate(45deg);
            }

            &::after {
                bottom: 50%;
                transform: rotate(-45deg);
            }
        }
    }

    .content {
        width: calc(100vw - #{$menu-width});
    }

    .player {
        border-bottom: 1px solid white;
        height: 125px;
        display: flex;
        align-items: center;
        justify-content: center;

        &__name {
            color: white;
        }
    }

    .nav {
        padding: 0;

        &__li {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        &__link {
            display: block;
            padding: 15px;
            text-decoration: none;
            color: white;

            &.active {
                background: #233342;
            }
        }
    }

    .header-mobile {
        display: none;
        width: 100vw;
        height: 75px;
        border-bottom: 1px solid #c3c3c3;

        &__player {
            position: fixed;
            top: 23px;
            width: 100%;
            text-align: center;
            font-size: 18px;
            color: #6b6b6b;
        }

        &__btn {
            display: flex;
            align-items: center;
            position: fixed;
            top: 20px;
            left: 20px;
            width: 26px;
            height: 26px;
            cursor: pointer;
            z-index: 1;

            span, span::before, span::after {
                display: block;
                position: absolute;
                width: 100%;
                height: 2px;
                background-color: #616161;
                transition-duration: .25s;
            }

            span::before {
                content: '';
                top: -8px;
            }

            span::after {
                content: '';
                top: 8px;
            }
        }
    }

    @media (max-width: 768px) {
        .main {
            flex-direction: column;
        }
        .menu {
            position: fixed;
            left: -100%;
            transition: left ease .2s;
            z-index: 2;

            &_active {
                left: 0;
            }

            &__close {
                display: block;
            }
        }
        .player {
            display: none;
        }
        .nav {
            padding-top: 24px;
        }
        .content {
            width: 100vw;
        }
        .header-mobile {
            display: block;
        }
    }
</style>
