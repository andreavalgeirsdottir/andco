# NX Cloud

### 1. Create a new Organization at https://nx.app/orgs

### 2. Execute the NX Cloud init script

Execute

```
yarn nx g @nrwl/nx-cloud:init
```

### 3. Create a new CI Token

1. Press `Workspace Options` -> `Manage Access Tokens`.

2. The press `New Access Token`.

3. Enter

```
Token Name: ci
Access Level: READ AND WRITE
```

4. Press `Generate`.

5. Copy the Token to your clipboard.

6. Open the `nx.json` file and add the CI runner to the `tasksRunnerOptions` section

```diff
	"tasksRunnerOptions": {
		"default": {
			"runner": "@nrwl/nx-cloud",
			"options": {
				"cacheableOperations": ["build", "lint", "test", "e2e", "stylelint"],
				"accessToken": "TOKEN" // <---- Add your token here
			}
		},
+		"ci": {
+			"runner": "@nrwl/workspace/src/tasks-runner/default-tasks-runner",
+			"options": {
+				"cacheableOperations": ["build", "test", "lint", "e2e"],
+				"accessToken": "CI_TOKEN" // <---- Add your token here
+			}
+		}
	},
```

### 4. Add the runner to the CI

Now remember to set up your CI to use the runner by adding `--runner=ci` to the `NX` commands.

If you're using Vercel, then under the build command, you could add the following:

```sh
yarn nx build [target] --prod --runner=ci
```

That will make sure the runner is using the one you've generated.

## Related:

- [Setting up Chromatic](/docs/setup/chromatic.md)
- [Setting up Vercel Hosting](/docs/setup/vercel.md)
