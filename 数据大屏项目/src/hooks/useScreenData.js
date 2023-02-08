import {ref,onMounted,onUnmounted} from 'vue'
export default function (){
    const totalUser = ref(10000)
    const growthLastDay = ref(10.12)
    const growthLastMonth = ref(15.25)
    let task
    onMounted(()=>{
        task = setInterval(() => {
            totalUser.value = totalUser.value + 10
            growthLastDay.value = growthLastDay.value + 1
            growthLastMonth.value = growthLastMonth.value + 1
        }, 3000);
    })
    onUnmounted(()=>{
        task && clearInterval(task)
    })
    return {
        totalUser,
        growthLastDay,
        growthLastMonth
    }
}
