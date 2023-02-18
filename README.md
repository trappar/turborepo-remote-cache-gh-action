# TurboRepo Remote Cache GitHub Action

A GitHub action which runs a [ducktors/turborepo-remote-cache](https://github.com/ducktors/turborepo-remote-cache) server in the background so you can use any of the non-local [supported storage providers](https://ducktors.github.io/turborepo-remote-cache/supported-storage-providers.html) to cache your TurboRepo builds.

## Inputs

### `storage-provider`

**Required** The storage provider to use. Supports all options from [environmental variables](https://ducktors.github.io/turborepo-remote-cache/environment-variables.html) for more information.

### `storage-path`

**Required** The name of the bucket to use. Supports all options from [environmental variables](https://ducktors.github.io/turborepo-remote-cache/environment-variables.html) for more information.

### `team-id`

The Team ID to use. This controls the directory where cache entries will be saved. Default `"ci"`.

### `port`

The port to run the server on. This is configurable in case of a port collision, but shouldn't normally need to be changed. Default `"42042"`.

## Environment variables

You may also need to set environment variables to provide credentials to the storage provider. See [supported storage providers](https://ducktors.github.io/turborepo-remote-cache/supported-storage-providers.html) for more information.

## Example usage

```yaml
- uses: trappar/turborepo-remote-cache-gh-action@v1
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  with:
    storage-provider: s3
    storage-path: my-bucket-name
```

No further configuration is required. The action will automatically set environmental variables which TurboRepo uses to connect to the remote cache server.
