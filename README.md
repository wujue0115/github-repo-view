# github-repo-view

Show GitHub user's repositories by Vue 3.

## Contents

- [Demo](#demo)
- [Recommended IDE Setup](#recommended-ide-setup)
  - [Extensions](#extensions)
  - [Base Config](#base-config)
- [Project Setup](#project-setup)
  - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
  - [Type-Check, Compile and Minify for Production](#type-check-compile-and-minify-for-production)
  - [Lint with ESLint](#lint-with-eslint)

## Demo

[GitHub page](https://github-repo-view.wujue.dev/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

### Extensions

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

### Base Config

Add the following json to `.vscode/setting.json` in your root directory.

```json
{
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint",
  "editor.formatOnPaste": false, // required
  "editor.formatOnType": false, // required
  "editor.formatOnSave": true, // optional
  "editor.formatOnSaveMode": "file", // required to format on save
  "files.autoSave": "onFocusChange", // optional but recommended
  "vs-code-prettier-eslint.prettierLast": true // set as "true" to run 'prettier' last not first
}
```

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
