<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useI18n } from "@/composables/useI18n";
import { useTheme } from "@/composables/useTheme";

const { locale, locales, setLocale, t } = useI18n();
const { theme, toggleTheme } = useTheme();
</script>

<template>
  <div class="app-shell" :data-theme="theme">
    <header class="top-nav">
      <RouterLink class="brand" to="/">
        <span class="brand-mark">☄</span>
        <span class="brand-text">NOVSTAX</span>
      </RouterLink>
      <nav class="nav-links">
        <a class="nav-a" href="#top">{{ t("nav.home") }}</a>
        <a class="nav-a" href="#ranks">{{ t("nav.ranks") }}</a>
        <a class="nav-a" href="#tokens">{{ t("nav.tokens") }}</a>
        <a class="nav-a" href="#contact">{{ t("nav.contact") }}</a>
      </nav>
      <div class="nav-actions">
        <div class="lang-switch" role="group" :aria-label="t('a11y.lang')">
          <button
            v-for="l in locales"
            :key="l.code"
            type="button"
            class="lang-btn"
            :class="{ active: locale === l.code }"
            @click="setLocale(l.code)"
          >
            {{ l.short }}
          </button>
        </div>
        <button type="button" class="theme-toggle" @click="toggleTheme" :aria-pressed="theme === 'dark'">
          <span v-if="theme === 'dark'">☀</span>
          <span v-else>☾</span>
        </button>
      </div>
    </header>
    <main class="main-stage">
      <RouterView />
    </main>
    <footer class="site-footer">
      <RouterLink class="footer-link" to="/">Novstax</RouterLink>
      <a class="footer-link" href="https://Novstax.gomc.uz" target="_blank" rel="noopener noreferrer">Novstax.gomc.uz</a>
    </footer>
  </div>
</template>
