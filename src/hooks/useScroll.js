import {ref, onMounted,onUnmounted,onActivated,onDeactivated} from "vue"
import { throttle } from "underscore"

export default function useScroll (elRef) {
  let el = window

  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollHeight = ref(0)
  const scrollTop = ref(0)
  // 节流处理
  const scrollListenerHandler = throttle(() => {
    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight;
    scrollHeight.value  = document.documentElement.scrollHeight;
    scrollTop.value  = document.documentElement.scrollTop;
    }else {
      clientHeight.value = el.clientHeight;
      scrollHeight.value  = el.scrollHeight;
      scrollTop.value  = el.scrollTop;
    }
    if (clientHeight.value  + scrollHeight.value  >= scrollTop.value ) {
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onActivated(() => {
    if(elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return {
    isReachBottom,
    clientHeight,
    scrollHeight,
    scrollTop
  }
}