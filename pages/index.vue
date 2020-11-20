<template>
    <div class="main-panel">
        <MyOwnGame :cntCategories="5" :points="[100,200,300,400,500]" :time="60"/>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    .main-panel {
        height: 100%;
    }
</style>
