<script setup lang="ts">
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

onBeforeMount(async () => {
  await searchRepos(queryParams.value);
});
</script>

<template>
  <main class="container">
    <div class="wrapper">
      <h1 class="title">GitHub Repos</h1>
      <section class="section-area search-area">
        <label class="user-label">Username</label>
        <input
          class="user-input"
          type="text"
          placeholder="Input a GitHub username"
          v-model="username"
          @input="handleSearch"
        />
      </section>
      <section class="section-area repo-area" @scroll="handleScroll($event)">
        <ul class="repo-list">
          <RepoCard
            v-for="(repo, index) in repos"
            :key="index"
            :repo="repo"
          ></RepoCard>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.container {
  --space: 30px;

  display: flex;
  justify-content: center;
  height: 100svh;

  background-color: var(--primary-color);
  color: var(--text-color);

  .wrapper {
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding: var(--space) 0;
    height: 100%;
    max-width: 960px;
    width: 60%;
  }
}

.title {
  flex-grow: 0;
  text-align: center;
}

.search-area {
  .user-label {
    font-size: 1.2rem;
  }
  .user-input {
    margin-top: 10px;
    letter-spacing: 1px;
  }
}

.repo-area {
  flex-grow: 1;
  box-sizing: border-box;
  margin-top: var(--space);
  padding-left: 8px;
  overflow-y: scroll;
  height: 100%;

  border: 1px solid var(--text-color);
  border-radius: 5px;
}

.repo-item {
  padding: 50px 0;
  border-top: 1px solid var(--text-color);

  &:last-child {
    border-bottom: 1px solid var(--text-color);
  }
}

@media screen and (max-width: 960px) {
  .container {
    .wrapper {
      width: 80%;
    }
  }
}

@media screen and (max-width: 600px) {
  .container {
    --space: 20px;
    .wrapper {
      width: 90%;
    }
  }
}
</style>
