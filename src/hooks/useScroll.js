import {ref, onMounted,onUnmounted,onActivated,onDeactivated} from "vue"
import { throttle } from "underscore"

export default function useScroll () {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)
  // 节流处理
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight;
    scrollHeight.value  = document.documentElement.scrollHeight;
    scrollTop.value  = document.documentElement.scrollTop;
    if (clientHeight.value  + scrollHeight.value  >= scrollTop.value ) {
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {

    window.addEventListener("scroll", scrollListenerHandler)
  })

  onActivated(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  onDeactivated(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return {
    isReachBottom,
    clientHeight,
    scrollHeight,
    scrollTop
  }
}