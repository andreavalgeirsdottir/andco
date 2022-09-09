# Setup documentation

Before you start developing you should do a find/replace on the whole project, replacing `noa` with the name of your project.

For instance is all `tsconfig.base.json` paths named using `noa`, and should be converted to your project name, e.g. `my_project`.

```diff
{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      ...
-      "@noa/library": ["libs/library/src/index.ts"],
+      "@my_project/library": ["libs/library/src/index.ts"],
      ...
    }
  },
  "exclude": ["node_modules", "tmp"]
}
```

Something like this:

![](/docs/media/project_rename.png)

## Related

- [Setting up Chromatic](/docs/setup/chromatic.md)
- [Setting up Vercel Hosting](/docs/setup/vercel.md)
- [Setting up NX Cloud](/docs/setup/nx-cloud.md)
