<template>
    <div class="categories">
        <div class="category" v-for="(category,index) in categories">
            <div class="category__title category__box">
                <div>
                    {{ category.title }}
                </div>
            </div>
            <div class="category__box" :class="{'category__box_hide': isHide(category.id,point) }"
                 v-for="point in points"
                 @click="chooseQuestion(category.id,point)">
                <div>
                    {{point}}
                </div>
            </div>
            <div class="category__box-mobile" v-show="getOptions(category.id).length">
                <select ref="selects">
                    <option v-for="point in getOptions(category.id)">{{point}}</option>
                </select>
                <button @click="clickByPlay(index,category.id)">Начать</button>
                <button class="arrow" @click="clickByPlay(index,category.id)">
                    <div>&#9658;</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['categories', 'points', 'hidePointInCategory'],
        methods: {
            getOptions(categoryId) {
                return this.points.filter( point => !this.isHide(categoryId,point) );
            },
            clickByPlay(index,categoryId) {
                const select = this.$refs.selects[index];
                this.$emit('chooseQuestion', categoryId, select.value)
            },
            isHide(categoryId, point) {
                return !!this.hidePointInCategory.filter((data) => {
                    return parseInt(data.categoryId) === parseInt(categoryId) && parseInt(data.point) === parseInt(point)
                }).length;
            },
            chooseQuestion(categoryId, point) {
                if (!this.isHide(categoryId, point)) {
                    this.$emit('chooseQuestion', categoryId, point)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $color-box: #4BB755;
    .category {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__title {
            width: 150px;
            cursor: default !important;
        }

        &__box {
            color: white;
            background: $color-box;
            padding: 15px 25px;
            margin: 10px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            cursor: pointer;
            position: relative;

            &_hide:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                cursor: default;
            }
        }

        &__box-mobile {
            display: none;

            select {
                border: none;
                outline: none;
                color: white;
                background: $color-box;
                height: 70px;
                padding: 0 10px;
                margin: 10px;
                cursor: pointer;

                & option {
                    background: white;
                    color: black;
                }
            }

            button {
                height: 70px;
                min-width: 120px;
                margin-left: 5px;
            }

            button.arrow {
                display: none;
            }
        }
    }

    @media (max-width: 1199px) {
        .category {
            &__box {
                display: none;
            }

            &__title {
                display: flex;
            }

            &__box-mobile {
                display: block;
            }
        }
    }

    @media (max-width: 480px) {
        .category {
            &__box {
                padding: 10px;
                margin: 5px;
            }

            &__box-mobile {
                display: flex;
                select {
                    height: 60px;
                    margin: 5px;
                }
                button {
                    display: none;
                    margin-left: 0;
                }

                button.arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 100%;
                    min-width: 50px;
                    height: 50px;
                    font-size: 30px;
                    margin-top: 10px;
                }
            }
        }
    }
</style>