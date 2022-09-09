# NX Boilerplate

**Table of Contents**

- [NX Boilerplate](#nx-boilerplate)
  - [🏎 Quick start](#-quick-start)
    - [First time setup](#first-time-setup)
  - [💻 Commands](#-commands)
      - [`yarn`](#yarn)
      - [`yarn nx serve`](#yarn-nx-serve)
      - [`yarn nx build`](#yarn-nx-build)
  - [📄 Documentation](#-documentation)
  - [📦 Setups](#-setups)
    - [Using a specific setup](#using-a-specific-setup)
      - [Comparison Chart](#comparison-chart)
  - [Notes](#notes)
  - [🪵 Changelog](#-changelog)

## 🏎 Quick start

```sh
yarn
yarn nx serve web
```

Go to [`package.json`](package.json#scripts) to see more scripts.

### First time setup

This project uses environment variables for the different `apps`/`libs`.

We recommend fetching them from Vercel and then adjusting based on your project needs.

```sh
yarn vercel:env_link
yarn vercel:env_pull
```

See [Vercel docs](/docs/setup/vercel.md) for more info

## 💻 Commands

#### `yarn`

Installs all dependencies.

#### `yarn nx serve`

Run `yarn nx serve web` for a dev server. Navigate to [http://localhost:4200](http://localhost:4200). The app will automatically reload if you change any of the source files.

#### `yarn nx build`

Run `yarn nx build web` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--production` flag for a production build.

## [📄 Documentation](docs/index.md)

See more documentation in the [`docs`](docs/index.md) directory.

## 📦 Setups

These are the available setups which can be accessed using the different branches.

| Branches       | Description                                                                    |
| :------------- | :----------------------------------------------------------------------------- |
| `main`         | This is a full setup including a Nextjs Application and a Sanity Studio setup. |
| `setup/simple` | This is a simple setup including a Nextjs Application.                         |

### Using a specific setup

```sh
git checkout [branch]
```

#### Comparison Chart

| Feature                                     | `main` | `setup/simple` |
| :------------------------------------------ | :----- | :------------- |
| NX (including NX Cloud)                     | ✅     | ✅             |
| Next.js `app`                               | ✅     | ✅             |
| Sanity Studio `app`                         | ✅     | ❌             |
| Theme `SCSS` `lib`                          | ✅     | ✅             |
| UI library `SCSS` `lib`                     | ✅     | ✅             |
| Meilisearch `lib/service`                   | ✅     | ❌             |
| Mailchimp `lib/service`                     | ✅     | ❌             |
| Storybook `lib/utils`                       | ✅     | ✅             |
| Tracking `lib/service`                      | ✅     | ⚡             |
| Testing (E2E) `lib/service`                 | ✅     | ✅             |
| Common Utilities `lib/utils`                | ✅     | ✅             |
| Chromatic `github/action`                   | ✅     | ✅             |
| NX Affected [`test`, `e2e`] `github/action` | ✅     | ✅             |
| Commitlint                                  | ✅     | ✅             |

✅ Full support ⚡ Supported (Needs configuration) ❌ No Support

## Notes

The project is using `yarn@1.19.0` and [`yarn workspaces`](https://classic.yarnpkg.com/en/docs/workspaces) to manage the monorepo and it's dependencies.

That means that each project should include the dependencies related to that project and they should not be part of the root [`package.json`](package.json).

## 🪵 Changelog

[See the full changelog here](CHANGELOG.md)
