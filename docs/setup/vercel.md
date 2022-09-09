# Vercel

## Environment variables

### Links the project to the Vercel environment.

```sh
yarn vercel:env_link
```

### Pulls the Vercel environment.

```sh
yarn vercel:env_pull
```

## Project Initialization

### 1. Import the Github Project in the [Organisation at Vercel](https://vercel.com/hgw)

### 2. Configure Project ([see NX Boilerplate for reference](https://vercel.com/hgw/nx-boilerplate/settings))

#### Build command

The NX Build command of the specific target, e.g. `nx build web --prod --runner=ci`

```sh
yarn nx build [target] --prod --runner=ci
```

#### Output directory

The output directory of the target app

```sh
dist/apps/[target]/.next
```

#### Install command (Optional)

Installs the target app, root and dependent dependencies.

```sh
yarn workspace [target] install --production
```

<details>
<summary>See example</summary>

![](/docs/media/vercel-project-configuration.png)

</details>

### 3. Adding Ignore Build Step (Optional)

The Boilerplate comes with a NX affected ignore vercel build script which can be handy when working with a mono repo, including multiple large applications.

The script is executed under the `ignore build step` in the Project Git Settings - for instance https://vercel.com/hgw/nx-boilerplate/settings/git

You then add the `--target` app which should match the NX `workspace.json` file in the root, for instance `--target=web`.

Then the build will be skipped, if there were no changes made to the affected target.

```sh
sh ./scripts/vercel/ignore-vercel-build.sh --target=web
```

<details>
<summary>See example</summary>

![](/docs/media/vercel-ignore-build-step.png)

</details>

## Related:

- [Setting up Chromatic](/docs/setup/chromatic.md)
- [Setting up NX Cloud](/docs/setup/nx-cloud.md)
