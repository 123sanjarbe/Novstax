import { ref, watch } from "vue";

const STORAGE_KEY = "novstax-theme";

function readInitial() {
  if (typeof localStorage === "undefined") return "dark";
  return localStorage.getItem(STORAGE_KEY) || "dark";
}

const theme = ref(readInitial());

watch(theme, (v) => {
  if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, v);
  document.documentElement.dataset.theme = v;
});

if (typeof document !== "undefined") {
  document.documentElement.dataset.theme = theme.value;
}

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }
  return { theme, toggleTheme };
}
