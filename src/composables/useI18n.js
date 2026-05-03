import { computed, ref, watch } from "vue";
import { messages } from "@/i18n/messages";

const STORAGE_KEY = "novstax-locale";

const locale = ref(typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) || "uz" : "uz");

watch(locale, (v) => {
  if (typeof localStorage !== "undefined") localStorage.setItem(STORAGE_KEY, v);
  document.documentElement.lang = v === "ru" ? "ru" : v === "uzCyrl" ? "uz" : "uz";
});

const locales = [
  { code: "uz", short: "UZ" },
  { code: "uzCyrl", short: "УЗ" },
  { code: "ru", short: "RU" },
];

function setLocale(code) {
  locale.value = code;
}

function t(path) {
  const parts = path.split(".");
  let cur = messages[locale.value];
  if (!cur) cur = messages.uz;
  for (const p of parts) {
    cur = cur?.[p];
  }
  return typeof cur === "string" ? cur : path;
}

export function useI18n() {
  const dict = computed(() => messages[locale.value] || messages.uz);
  return { locale, locales, setLocale, t, dict };
}
