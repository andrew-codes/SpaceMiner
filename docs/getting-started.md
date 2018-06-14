# Getting Started

## Quick Start

Ensure you have the following software installed:

1. Install [git](https://git-scm.com/downloads)
2. Install [docker](https://www.docker.com/community-edition#/download)
3. `git clone git@github.com:andrew-codes/SpaceMiner.git` to clone repository
4. `cd SpaceMiner` to change directory into root of project
5. `docker-compose -f stack.dev.yml up` and visit [http://localhost](http://localhost)

## Developing Locally

Requires installing:

1. [node@^8.11.1](https://nodejs.org/en/)
2. [yarn@^1.3.0](https://yarnpkg.com/lang/en/docs/install/)

`cd SpaceMinder` and then from CLI these tasks can be run:
* `yarn lint`
* `yarn test` will run all tests

## Managing Dependencies

Packages are managed using [lerna](https://lernajs.io/). Each package has its own list of dependencies. Therefore, dependencies are not added at the project root level; rather scoped to a specific package. There are `yarn` scripts to help automate this:

> **Note**: If you run into trouble after installing a new dependency, try running `yarn && yarn bootstrap`.

* **Adding** a new dependency, use `yarn lerna add --scope @space-miner/package-name dependency-name`
* For **dev dependencies**, add the `--dev` CLI option `yarn lerna add --dev --scope @space-miner/package-name dependency-name`
* **Removing** dependencies requires deleting the item from the package's `package.json` and re-running `yarn bootstrap` in the project root.
