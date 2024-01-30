<script setup lang="ts">
import type { TRepo } from '@/types';

export interface TProps {
  repo: TRepo;
}

const props = defineProps<TProps>();
const { repo } = toRefs(props);
</script>

<template>
  <div class="repo-card">
    <div class="repo-top">
      <h3 class="repo-title">
        <a :href="repo.html_url" target="_blank">
          {{ repo.name }}
        </a>
      </h3>
      <div class="repo-info">
        <div class="repo-fork">
          <img src="@/assets/images/fork.svg" class="fork-icon" alt="" />
          <span>{{ repo.forks_count }}</span>
        </div>
        <div class="repo-star">
          <img src="@/assets/images/star.svg" class="star-icon" alt="" />
          <span>{{ repo.stargazers_count }}</span>
        </div>
      </div>
    </div>
    <p class="repo-description">{{ repo.description }}</p>
  </div>
</template>

<style scoped>
.repo-card {
  display: flex;
  flex-direction: column;
  margin: 5px;
  padding: 10px;
  min-height: 80px;
  height: fit-content;
  border-bottom: 1px solid #fff8;
}

.repo-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.repo-title {
  color: #fa0d;
  text-decoration: underline;
}

.repo-info {
  display: flex;
  align-items: center;
}

.repo-star {
  display: flex;
  align-items: center;
  width: 4rem;
}

.repo-fork {
  display: flex;
  align-items: center;
  margin-left: auto;
  width: 4rem;
}

.fork-icon {
  margin-right: 5px;
  width: 14px;
  height: 14px;
}
.star-icon {
  margin-right: 5px;
  width: 18px;
  height: 18px;
}
</style>
