import { ref, watch } from "vue";

function getInitialValue() {
  const storagedTheme = localStorage.getItem("theme");

  if (!storagedTheme) {
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }

  return storagedTheme === "dark";
}

export function useDarkMode() {
  const darkMode = ref(getInitialValue());
  document.documentElement.dataset.theme = darkMode.value ? "dark" : "light";

  watch(darkMode, (newDarkMode) => {
    const newTheme = newDarkMode ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  });

  return darkMode;
}
