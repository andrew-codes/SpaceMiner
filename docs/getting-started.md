# Getting Started

## Before You Begin

Ensure you have the following software installed:

1. [git](https://git-scm.com/downloads)
2. [node@^8.11.1](https://nodejs.org/en/)
3. [yarn@^1.3.0](https://yarnpkg.com/lang/en/docs/install/)

## Setup

1. `git clone git@github.com:andrew-codes/SpaceMiner.git` to clone repository
2. `cd SpaceMiner` to change directory into root of project
3. `yarn && yarn bootstrap` to install and bootstrap dependencies.

## Running Site Locally

1. Open the terminal and change into project's root directory; `cd SpaceMiner`
2. Run `yarn start` in the terminal
3. Open Chrome and visit [http://localhost:9000](http://localhost:9000)

## Other Developer CLI Tasks

* `yarn lint`
* `yarn test` will run all tests
* `yarn lerna add --scope @space-miner/package-name dependency-to-add` (see below for details on managing dependencies)

## Managing Dependencies

Packages are managed using [lerna](https://lernajs.io/). Each package has its own list of dependencies. Therefore, dependencies are not added at the project root level; rather scoped to a specific package. There are `yarn` scripts to help automate this:

> **Note**: If you run into trouble after installing a new dependency, try running `yarn && yarn bootstrap`.

* **Adding** a new dependency, use `yarn lerna add --scope @space-miner/package-name dependency-name`
* For **dev dependencies**, add the `--dev` CLI option `yarn lerna add --dev --scope @space-miner/package-name dependency-name`
* **Removing** dependencies requires deleting the item from the package's `package.json` and re-running `yarn bootstrap` in the project root.
