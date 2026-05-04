<script setup>
import { computed } from "vue";
import { useI18n } from "@/composables/useI18n";

const { t } = useI18n();

const chips = computed(() =>
  t("whyStrip.chips")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean),
);
</script>

<template>
  <section class="why-strip reveal-up" aria-labelledby="why-strip-title">
    <h2 id="why-strip-title" class="why-strip__title">{{ t("whyStrip.title") }}</h2>
    <p class="why-strip__lead">{{ t("whyStrip.lead") }}</p>
    <div class="why-strip__row">
      <span v-for="(c, i) in chips" :key="i" class="why-strip__chip">{{ c }}</span>
    </div>
  </section>
</template>
