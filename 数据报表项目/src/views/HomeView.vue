<template>
    <div class="home">
        <top-view />
        <sales-view />
        <bottom-view />
        <map-view />
    </div>
</template>

<script>
import TopView from '../components/TopView'
import SalesView from '../components/SalesView'
import BottomView from '../components/BottomView'
import MapView from '../components/MapView'
import { mapScatter, wordcloud, screenData } from '@/api'
export default {
    components: { TopView, SalesView, BottomView, MapView },
    name: 'HomeView',
    data () {
        return {
            mapScatter: null,
            wordcloud: null,
            screenData: null
        }
    },
    component: {
        TopView,
        SalesView,
        BottomView,
        MapView
    },
    methods: {
        getscreenData () {
            return this.screenData
        },
        getwordcloud () {
            return this.wordcloud
        },
        getmapScatter () {
            return this.mapScatter
        }
    },
    provide () {
        return {
            getscreenData: this.getscreenData,
            getwordcloud: this.getwordcloud,
            getmapScatter: this.getmapScatter
        }
    },
    mounted () {
        mapScatter().then(res => { this.mapScatter = res.data })
        wordcloud().then(res => { this.wordcloud = res.data })
        screenData().then(res => { this.screenData = res.data })
    }
}
</script>
<style>
.home {
    width: 100%;
    padding: 20px;
    background-color: #eee;
    box-sizing: border-box;
}
</style>
