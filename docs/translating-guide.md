# Pastel Fullnode Wallet Translation Guide

Pastel Fullnode Wallet supports new translations added in the form of new locales files added in `src/_locales`.

- [The MDN Guide to Internationalizing Extensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Internationalization)

## Adding a new Language

- Each supported language is represented by a folder in `src/_locales` whose name is that language's subtag (example: `src/_locales/es/`). (look up a language subtag using the [r12a "Find" tool](https://r12a.github.io/app-subtags/) or this [wikipedia list](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)).
- Inside that folder there should be a `messages.json`.
- An easy way to start your translation is to first **make a copy** of `src/_locales/en/messages.json` (the English translation), and then **translate the `message` key** for each in-app message.
- Add the language to the [locales index](https://github.com/pastelnetwork/pastel-electron-wallet/tree/master/src/_locales/index.json) `src/_locales/index.json`

That's it!
