# TurboRepo Remote Cache GitHub Action

A GitHub action which runs a [ducktors/turborepo-remote-cache](https://github.com/ducktors/turborepo-remote-cache) server in the background so you can use any of the non-local [supported storage providers](https://ducktors.github.io/turborepo-remote-cache/supported-storage-providers.html) to cache your TurboRepo builds.

## Inputs

### `storage-provider`

**Required** The storage provider to use. Supports all options from [environmental variables](https://ducktors.github.io/turborepo-remote-cache/environment-variables.html) for more information.

### `storage-path`

**Required** The name of the bucket to use. Supports all options from [environmental variables](https://ducktors.github.io/turborepo-remote-cache/environment-variables.html) for more information.

### `team-id`

The Team ID to use. This controls the directory where cache entries will be saved. Default `"ci"`.

## Environment variables

You may also need to set environment variables to provide credentials to the storage provider. See [supported storage providers](https://ducktors.github.io/turborepo-remote-cache/supported-storage-providers.html) for more information.

### Note

> If you are familiar with ducktors/turborepo-remote-cache, you may be wondering why there is a lack of other inputs for other environmental variables. The reasons are as follows:
> * "`PORT`" - Set automatically by the action to a random free port on the runner.
> * "`TURBO_TOKEN`" - Set automatically by the action to a random secure token on each workflow run.
> * "`NODE_ENV`", "`LOG_LEVEL`", "`STORAGE_PATH_USE_TMP_FOLDER`", and "`BODY_LIMIT`" - These can be set manually using the `env` input to the action if needed, but it's not recommended to change them.

## Example usage

```yaml
- name: TurboRepo Remote Cache Server
  uses: trappar/turborepo-remote-cache-gh-action@v1
  with:
    storage-provider: s3
    storage-path: my-bucket-name
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

- name: Run Build
  run: turbo build
```
