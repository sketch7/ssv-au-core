[projectUri]: https://github.com/sketch7/ssv-au-core
[projectGit]: https://github.com/sketch7/ssv-au-core.git
[changeLog]: ./doc/CHANGELOG.md

[contribWiki]: ./doc/CONTRIBUTION.md
[releaseWorkflowWiki]: ./doc/RELEASE-WORKFLOW.md

[npm]: https://www.npmjs.com

# ssv-au-core
[![Build status](https://ci.appveyor.com/api/projects/status/2e0an5hvxtfs08mf?svg=true)](https://ci.appveyor.com/project/chiko/ssv-au-core)
[![Build status](https://ci.appveyor.com/api/projects/status/2e0an5hvxtfs08mf/branch/master?svg=true)](https://ci.appveyor.com/project/chiko/ssv-au-core/branch/master)
[![bitHound Overall Score](https://www.bithound.io/github/sketch7/ssv-au-core/badges/score.svg)](https://www.bithound.io/github/sketch7/ssv-au-core)
[![npm version](https://badge.fury.io/js/%40ssv%2Fau-core.svg)](https://badge.fury.io/js/%40ssv%2Fau-core)

Sketch7 Aurelia core components and utilities

In order to contribute please read the [Contribution guidelines][contribWiki].

**Quick links**

[Change logs][changeLog] | [Project Repository][projectUri] | [Contribution guidelines][contribWiki]

## Installation

Get library via [npm]
```bash
npm install @ssv/au-core --save
```

## Usage

### Logger
Read more how to use [Logger](./src/logging/README.md).


## Getting Started

### Setup Machine for Development
Install/setup the following:

- NodeJS v6+
- Visual Studio Code or similar code editor
- TypeScript 2.0+
- Git + SourceTree, SmartGit or similar (optional)
- Ensure to install **global NPM modules** using the following:


```bash
npm install -g git gulp yarn karma-cli
```


#### Cloning Repo

- Run `git clone https://github.com/sketch7/ssv-au-core.git`
- Switch to `develop` branch


### Project Setup
The following process need to be executed in order to get started.

```bash
npm install
```


### Building the code

```
gulp build
```
In order to view all other tasks invoke `gulp` or check the gulp tasks directly.

### Running the tests

```
gulp test
```


### Development utils

#### Trigger gulp watch
Handles compiling of changes.
```
gulp watch
```


#### Running Continuous Tests
Spawns test runner and keep watching for changes.
```
gulp tdd
```


### Preparation for Release

```
gulp prepare-release --bump major|minor|patch|prerelease (default: patch)
```
Check out the [release workflow guide][releaseWorkflowWiki] in order to guide you creating a release and publishing it.