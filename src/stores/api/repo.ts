import type { TRepo, TBaseResponse } from '@/types';

export const useRepoStore = defineStore('repo', () => {
  const { githubAPI } = useAPI();

  const repos = ref<TRepo[]>([]);

  const updateRepos = (newRepos: TRepo[]) => {
    repos.value = newRepos;
  };

  const extendRepos = (newRepos: TRepo[]) => {
    repos.value = [...repos.value, ...newRepos];
  };

  const getUserRepos = async (
    username: string,
    query: Record<string, any> = {},
    isNeedMutate = true,
    mutation = updateRepos
  ): Promise<TBaseResponse<TRepo>> => {
    try {
      const response = await githubAPI.get(`users/${username}/repos`, {
        query,
      });

      if (isNeedMutate) {
        mutation(response.data);
      }

      return response;
    } catch (error) {
      return { error: error as Error };
    }
  };

  return {
    repos,
    updateRepos,
    extendRepos,
    getUserRepos,
  };
});
