<template>
    <div id="app">
        <HomeView />
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
import HomeView from './views/HomeView.vue'
export default {
    name: 'app',
    components: { HomeView }
}
</script>

<style>
#app,
html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>
