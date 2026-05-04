<script setup>
import { computed, ref } from "vue";
import GlowCard from "@/components/GlowCard.vue";
import { ranks } from "@/data/ranks";
import { useI18n } from "@/composables/useI18n";
import { useTelegramBuy } from "@/composables/useTelegramBuy";
import { formatMoney } from "@/utils/format";

const { t } = useI18n();
const { rankHref } = useTelegramBuy(t);

const mode = ref(null);

const filteredRanks = computed(() => {
  if (mode.value === "life") return ranks.filter((r) => r.variant === "life");
  if (mode.value === "d30") return ranks.filter((r) => r.variant === "d30");
  return [];
});

function openLife() {
  mode.value = "life";
}

function open30() {
  mode.value = "d30";
}

function closeList() {
  mode.value = null;
}
</script>

<template>
  <section id="ranks" class="section section--tight reveal-up rank-section">
    <header class="section-head">
      <div class="section-kicker">Novstax</div>
      <h2 class="section-title">{{ t("ranksPage.title") }}</h2>
      <p class="section-lead">{{ t("ranksPage.lead") }}</p>
      <p v-if="mode === null" class="rank-section__hint">{{ t("rankMode.chooseHint") }}</p>
    </header>

    <div v-if="mode === null" class="rank-mode-pick">
      <button type="button" class="rank-mode-card rank-mode-card--life" @click="openLife">
        <span class="rank-mode-card__glow" aria-hidden="true" />
        <span class="rank-mode-card__icon" aria-hidden="true">∞</span>
        <h3 class="rank-mode-card__title">{{ t("rankMode.lifeTitle") }}</h3>
        <p class="rank-mode-card__desc">{{ t("rankMode.lifeDesc") }}</p>
        <span class="rank-mode-card__cta">{{ t("rankMode.open") }}</span>
      </button>
      <button type="button" class="rank-mode-card rank-mode-card--30" @click="open30">
        <span class="rank-mode-card__glow" aria-hidden="true" />
        <span class="rank-mode-card__icon" aria-hidden="true">⏳</span>
        <h3 class="rank-mode-card__title">{{ t("rankMode.d30Title") }}</h3>
        <p class="rank-mode-card__desc">{{ t("rankMode.d30Desc") }}</p>
        <span class="rank-mode-card__cta">{{ t("rankMode.open") }}</span>
      </button>
    </div>

    <div v-else class="rank-mode-list" :class="mode === 'life' ? 'rank-mode-list--life' : 'rank-mode-list--30'">
      <div class="rank-mode-toolbar">
        <button type="button" class="btn btn-ghost rank-mode-back" @click="closeList">{{ t("rankMode.back") }}</button>
        <h3 class="rank-mode-list__title">{{ mode === "life" ? t("rankMode.listLife") : t("rankMode.list30") }}</h3>
      </div>
      <div class="rank-grid rank-grid--flow">
        <GlowCard
          v-for="(r, idx) in filteredRanks"
          :key="`${r.id}-${r.variant}-${idx}`"
          :elevated="r.id === 'prime' && r.variant === 'life'"
          :class="['rank-flow-card', mode === 'life' ? 'rank-flow-card--life' : 'rank-flow-card--30']"
        >
          <div class="rank-top">
            <div class="rank-title-row">
              <span class="rank-emoji">{{ r.emoji }}</span>
              <h3 class="rank-name">{{ t(`ranks.${r.id}.name`) }}</h3>
            </div>
            <span class="pill" :class="{ 'pill-hot': r.variant === 'life' }">{{ t(`variant.${r.variant}`) }}</span>
          </div>
          <div class="rank-price">{{ formatMoney(r.price) }}</div>
          <ul class="rank-list">
            <li v-for="i in 4" :key="i">{{ t(`ranks.${r.id}.features.${i - 1}`) }}</li>
          </ul>
          <a class="buy-link" :href="rankHref(r)" target="_blank" rel="noopener noreferrer">{{ t("buy") }}</a>
        </GlowCard>
      </div>
    </div>
  </section>
</template>
