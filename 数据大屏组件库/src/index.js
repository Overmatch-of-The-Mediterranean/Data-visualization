import Test from './components/Text/index'
import Icon  from './components/Icon/index'
import ImoocLoading from './components/ImoocLoading/index'
import ImoocFlyBox from './components/ImoocFlyBox/index'
import ImoocContainer from './components/ImoocContainer/index'
import CountTo from './components/VueCountTo/index'
import VueEcharts from './components/VueEcharts/index'
import BaseScrollList from './components/BaseScrollList/index'
export default function(Vue) {
    Vue.use(Test)
    Vue.use(ImoocLoading)
    Vue.use(ImoocFlyBox)
    Vue.use(ImoocContainer)
    Vue.use(CountTo)
    Vue.use(VueEcharts)
    Vue.use(Icon)
    Vue.use(BaseScrollList)
}