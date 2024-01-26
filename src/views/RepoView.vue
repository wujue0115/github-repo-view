<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

const username = ref('antfu');
const repos = ref<Record<string, any>[]>([]);
const queryParams = ref({ per_page: 10, page: 1 });

const debounce = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

const throttle = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: any) => {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
};

const getQueryString = (query: Record<string, any>) => {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
  return queryString;
};

const requestRepos = async (
  query: Record<string, any> = { per_page: 10, page: 1 },
) => {
  const queryString = getQueryString(query);
  const url = `https://api.github.com/users/${username.value}/repos`;
  const fetchUrl = queryString ? `${url}?${queryString}` : url;
  const response = await fetch(fetchUrl);
  const data = await response.json();
  return data;
};

const validateUsername = () => {
  if (username.value === '') {
    alert('Please input a username');
    return false;
  }
  return true;
};

const searchRepos = async (query: Record<string, any>) => {
  if (!validateUsername()) return;
  const repoData = await requestRepos(query);
  repos.value = repoData;
};

const debounceSearch = debounce(searchRepos, 200);

const handleSearch = () => {
  debounceSearch(queryParams.value);
};

const validateScroll = (event: Event, ratio: number) => {
  if (!event.target) return false;
  const { scrollTop, clientHeight, scrollHeight } = event.target as Element;
  return (scrollTop + clientHeight) / scrollHeight >= ratio;
};

const searchMoreRepos = async (event: Event) => {
  if (!validateScroll(event, 0.8)) return;
  queryParams.value.page += 1;
  const data = await requestRepos(queryParams.value);
  repos.value = [...repos.value, ...data];
};

const throttleSearch = throttle(searchMoreRepos, 500);

const handleScroll = throttleSearch;

onBeforeMount(() => {
  searchRepos(queryParams.value);
});
</script>

<template>
  <main>
    <section class="search-area">
      <div class="wrapper">
        <input
          type="text"
          placeholder="Input a GitHub username"
          v-model="username"
          @input="handleSearch"
        />
      </div>
    </section>
    <section class="repos-area">
      <ul
        style="height: 300px; overflow: scroll"
        @scroll="handleScroll($event)"
      >
        <li
          v-for="(repo, index) in repos"
          :key="index"
          style="padding: 20px; border: 1px solid #000"
        >
          {{ repo.name }}
        </li>
      </ul>
    </section>
  </main>
</template>
