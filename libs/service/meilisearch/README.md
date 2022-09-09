# Service - Search

## Meilisearch

### Development

1. Fetch and initialize the [Meilisearch](https://meilisearch.com/download) executable.

```sh
yarn nx run service-meilisearch:init
```

2. Spinning up the local instance of Meilisearch.

```sh
yarn nx run service-meilisearch:serve
```

Now you should be able to go to [http://localhost:7700](http://localhost:7700) and see the search results.

Remember to update your `.env` file to point to the local environment.

```diff
- NEXT_PUBLIC_MEILISEARCH_API_KEY="SECRET_TOKEN"
+ NEXT_PUBLIC_MEILISEARCH_API_KEY="http://localhost:7700"
```

### Seeding using Next

You can either use [`curl`](https://docs.meilisearch.com/learn/core_concepts/indexes.html#index-creation) to add data to your Meilisearch instance, or you can define server functions which seed the indexes.

Reference

- [Next Seeding API](https://github.com/NoA-Ignite-dk/acarix/blob/7c4f3bf674d4ad27d6f6e5172920b0bbacc147dd/apps/web/src/pages/api/v1/search/seed.ts#L6)

#### 1. Start the local Next server.

The Next application includes a seeding script that will seed the Meilisearch instance with data.



```sh
yarn nx run web:serve
```

#### 2. Start up the local instance of Meilisearch.

```sh
yarn nx run service-meilisearch:serve
```

#### 3. Execute the seed script

```sh
yarn nx run service-meilisearch:seed
```

### References

- https://docs.meilisearch.com/
