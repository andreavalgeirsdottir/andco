# Chromatic

### 1. Create a new Project at https://www.chromatic.com/start

### 2. Replace the token in the package.json with your chromatic token

```diff
{
	"name": "noa",
	"version": "1.0.0",
	"license": "MIT",
	"scripts": {
    ...
-		"chromatic": "npx chromatic --project-token=c9c4bc262af0",
+		"chromatic": "npx chromatic --project-token=yourNewToken",
		...
	},
```

### 3. Add the `CHROMATIC_PROJECT_TOKEN` secret to your Github Repository secret.

They're usualy under https://github.com/NoA-Ignite-dk/[project]/settings/secrets/actions

### 4. (Optional) You can now make a change to one of the components including a `*.stories.*`, push the change and finalize the Chromatic setup.

## Related:

- [Setting up NX Cloud](/docs/setup/nx-cloud.md)
- [Setting up Vercel Hosting](/docs/setup/vercel.md)
