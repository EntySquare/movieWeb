import { ref, onMounted, onUnmounted } from "vue";

export function useWindowSize() {
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);

  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener("resize", updateWindowSize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWindowSize);
  });

  return { windowWidth, windowHeight };
}
