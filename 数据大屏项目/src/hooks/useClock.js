import { ref ,onMounted,onUnmounted} from "vue";

function dateFilter(v){
    let m = zeroFilter(v.getMonth()+1)
    let d = zeroFilter(v.getDate())
    return `${v.getFullYear()}-${m}-${d}`
}
function timeFilter(v){
    let h = zeroFilter(v.getHours())
    let m = zeroFilter(v.getMinutes())
    let s = zeroFilter(v.getSeconds())
    return `${h}-${m}-${s}`
}
function zeroFilter(v){
    return v<10 ? '0' + v : v
}

export default function(){
    let now = new Date()
    const date = ref(dateFilter(now))
    const time = ref(timeFilter(now))
    let task

    const start = ()=>{
        task = setInterval(() => {
            now = new Date()
            date.value = dateFilter(now)
            time.value = timeFilter(now)
        }, 1000);
    }
    onMounted(()=>{
        start()
    })
    onUnmounted(()=>{
        task && clearInterval(task)
    })
    return {
        date,
        time
    }
}