### Pastel Wallet Fullnode - Contributing Guidelines

Pastel Wallet Fullnode is an Electron app built with React on the frontend.


##### Getting started

You should have Node LTS and Yarn installed globally. After project clone, run `yarn` to install the dependencies. Then run `yarn start` to start the Electron app locally in development mode.


##### Code linting and standard checks

All the code in this project are written in TypeScript with some linting and standard checks. New features and code must follow this same standard. We recommend using Visual Studio Code IDE for working on this code base. Some available commands can be run:

- `yarn format` to automatically format all code in the project. Currently we are using `eslint --fix` and `prettier --write`.
- `yarn check-all` is the short version to perform all the below checks.
- `yarn check-eslint` to check if there's any issue with ESLint, must be no error and warning at all.
- `yarn check-prettier` to check if there's any code not formatted properly with Prettier.
- `yarn check-typescript` to check if there's any typing issue with TypeScript.
- `yarn check-type-coverage` to check and show if all the code are strong typed or not. Since we have been migrating from the old code, this check hasn't passed yet and not included in the above `check-all` command. We can work on improving those old code part-by-part by using this command, it will show us all the issues and where we need to fix.


##### State management in React

We use redux, specific @reduxjs/toolkit for state management in React. We will divide the project by features, if you work on a feature named `A`, then there should a folder `features/A` contains everything related to this feature: components, redux stuff, tests... Every "feature" has an index.ts file, that exports everything needed for the application. There are some existing features that you can take a look at for reference.


##### Legacy code

All the code in `src/legacy` is old code migrated from the previous phase. We discourage new developers from making any change in that folder. They could be fully migrated by an experienced developer, but that is low priority for now.
