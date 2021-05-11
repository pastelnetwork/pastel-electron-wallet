### Pastel Wallet Fullnode - V 2.0 ARCHITECTURE

Pastel Wallet Fullnode is an Electron app built with React on the frontend. Version 2.0 is based on Figma designs (https://www.figma.com/file/f7jsLcmr0n106cHF8yfNpU/Pastel-Wallet?node-id=166%3A8846).

Below you can find all info how to contribute with new version.

To switch between old and new versions go to `src/legacy/containers/Root.tsx` component and change Routes import path.

##### Project structure (src directory)

```text
- src
  +- assets
    +- fonts
    +- icons
    +- images
  +- components (reusable components)
     +- [ComponentName]
  +- helpers (custom hooks, reusable functions)
  +- redux (redux state management directory)
  +- pages (main screens containers)
  +- routes (screens routes declarations)
  +- theme (colors, fonts sizes, typography, spacings, based on Figma styleguide)
  +- types (all reusable interfaces and types)
  +- utils (all other utils like const variables, external libraries helpers)
    +- constants (reusable const variables)
  +- declarations (typescript declaration files)
  +- api (taken from previous version of app)
  +- features (taken from previous version of app, during implementing all new features, this directory probably can be removed)
  +- legacy (taken from previous version of app, during implementing all new designs, this directory probably can be removed)
```

##### Legacy code

All the code in `src/legacy` is old code migrated from the previous phase. We discourage new developers from making any change in that folder. They could be fully migrated by an experienced developer, but that is low priority for now.

##### Features code

All the code in `src/features` is containing features made in version 1.0 of app. After implementing all new designs and features with version 2.0 codes from this directory will be moved to different directories. At the end this directory probably will be removed.
