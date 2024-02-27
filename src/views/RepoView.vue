<script setup lang="ts">
const { debounce, throttle } = useUtils();
const { getUserRepos, updateRepos, extendRepos } = useRepoStore();

const { repos } = storeToRefs(useRepoStore());

const username = ref('antfu');

type TQuery = {
  per_page: number;
  page: number;
};
const query = ref<TQuery>({ per_page: 10, page: 1 });

/**
 * Validate username
 * @param _username - username
 * @returns true if username is not empty otherwise false
 */
const validateUsername = (_username: string) => {
  if (_username === '') {
    return false;
  }
  return true;
};

/**
 * Search repos with username and query
 * @param _username - github username
 * @param _query - query object with per_page and page
 */
const searchRepos = async (_username: string, _query: TQuery) => {
  updateRepos([]);

  if (!validateUsername(username.value)) return;

  await getUserRepos(_username, _query);
};

/**
 * Debounce search repos
 */
const debounceSearch = debounce(searchRepos, 200);

/**
 * Handle search event
 */
const handleSearch = () => {
  query.value.page = 1;
  debounceSearch(username.value, query.value);
};

/**
 * Validate scroll position
 * @param event - scroll event
 * @param ratio - scroll ratio
 * @returns true if scroll position is over ratio otherwise false
 */
const validateScroll = (event: Event, ratio: number) => {
  if (!event.target) return false;
  const { scrollTop, clientHeight, scrollHeight } = event.target as Element;
  return (scrollTop + clientHeight) / scrollHeight >= ratio;
};

/**
 * Search more repos when scroll position is over 80%
 * @param event - scroll event
 * @param _username - github username
 */
const searchMoreRepos = async (event: Event, _username: string) => {
  if (!validateScroll(event, 0.8)) return;

  query.value.page += 1;

  await getUserRepos(_username, query.value, true, extendRepos);
};

/**
 * Throttle search more repos
 */
const throttleSearch = throttle(searchMoreRepos, 500);

/**
 * Handle scroll event
 * @param event - scroll event
 */
const handleScroll = (event: Event) => {
  throttleSearch(event, username.value);
};

onBeforeMount(async () => {
  // Get repos before mounting
  await searchRepos(username.value, query.value);
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
  padding-left: 5px;
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
