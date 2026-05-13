# Mediashare Phone App

React Native + Expo wrapper around the shared [mediashare-source](https://github.com/bluecollardev/mediashare-source) library (mounted at `./app/` as a git submodule). All UI, Redux state, API clients, and business logic live in the source library — this repo only owns the native shell, env files, and packaging.

- URI scheme: `mediashare://`
- Bundle ID: `oi.bluecollardev.mediashare`
- Entry point: `App.tsx` → `mediashare/main`
- Path alias: `mediashare/*` → `./app/src/*` (configured in `babel.config.js` and `tsconfig.json`)

## Related repos

- [bluecollardev/mediashare-source](https://github.com/bluecollardev/mediashare-source) — shared RN source library (this submodule)
- [bluecollardev/mediashare-api](https://github.com/bluecollardev/mediashare-api) — backend API (NestJS / MongoDB / Cognito)

## Prerequisites

- Node 16+ (Node 20 recommended)
- Yarn 1.x
- Xcode + CocoaPods (iOS)
- Android Studio (Android)
- Docker (only if running the API locally — see [mediashare-api](https://github.com/bluecollardev/mediashare-api#readme))

Clone with the submodule:

```shell
git clone --recurse-submodules git@github.com:bluecollardev/mediashare-app.git
# or after a regular clone:
git submodule update --init --recursive
```

## First-time setup

```shell
yarn install
```

The `postinstall` step does two things:

- Runs `patch-package` against `./patches/` — RN 0.70 / Expo 47 fixes for Ruby 3.x and OpenSSL 3 incompatibilities in podspecs / build scripts (`expo-modules-autolinking`, `react-native`, `react-native-dotenv`, `react-native-web`).
- Runs `yarn util:ios:refresh-pods` (purges + reinstalls iOS pods).

## Run

Start Metro:

```shell
yarn start    # expo start --dev-client --port 8081
```

Then pick a platform / env in another terminal:

```shell
# iOS (simulator: iPhone 12 Pro)
yarn ios:local      # local API, dev env
yarn ios:staging    # staging API
yarn ios:prod       # production API

# Android
yarn android:local      # debug variant
yarn android:staging    # staging variant
yarn android:prod       # release variant

# Web — NODE_OPTIONS=--openssl-legacy-provider is baked into the script
# because @expo/webpack-config (Webpack 4) calls crypto.createHash('md4'),
# which OpenSSL 3 / Node 17+ block by default.
yarn web
```

Env files:

- `.env.development` — `API_SERVER=0`, localhost
- `.env.production` — `API_SERVER=1`, remote

`app.config.js` reads `.env` via `react-native-dotenv` and exposes the values via `Constants.expoConfig.extra`, where the source library's `src/config.ts` picks them up at runtime.

## Run against a local API

Start the backend services first (see [mediashare-api](https://github.com/bluecollardev/mediashare-api#readme)):

```shell
cd ../bcdev_mediashare-api
npm install
npm run gen:certs    # one-time mkcert setup
npm run serve        # media-svc :3000, user-svc :3001, tags-svc :3002
```

Then back here:

```shell
yarn ios:local     # or android:local, or web
```

## iOS pod troubleshooting

```shell
yarn util:ios:refresh-pods   # clean + reinstall
yarn util:ios:install-pods   # reinstall only
yarn util:ios:clean-pods     # purge only
```

The pod patches and the `--openssl-legacy-provider` Node flag are required because RN 0.70 / Expo 47 predate Ruby 3.x and OpenSSL 3 / Node 17+; reinstalling `node_modules` re-applies them via `postinstall`.

## Tests / lint

```shell
yarn test       # jest (react-native preset)
yarn util:lint  # eslint over .js / .jsx / .ts / .tsx
```

## Deep-link invite helpers

For testing invitation flows:

```shell
yarn invite-ios:bcdevlucas
yarn invite-ios:armos51
yarn invite-ios:test
yarn invite-android:bcdevlucas
yarn invite-android:armos51
yarn invite-android:test
```

(Each runs `npx uri-scheme open mediashare://accept-invitation/<id>` for the target platform.)

## Other utility scripts

- `yarn util:bump-version` — bump iOS/Android version numbers (`react-native-version`)
- `yarn util:modules:rebuild` — nuke + reinstall `node_modules`
- `yarn util:link-react-native-config` — relink `react-native-config`
- `yarn util:sort-pkg` — alphabetize `package.json`
- `yarn util:update` — `git pull --rebase`
- `yarn util:adb:map` — `adb reverse tcp:5000 tcp:5000` (legacy; nothing currently runs on `:5000` — see *macOS AirPlay holds :5000* note in the source readme)

## Updating the source submodule

```shell
git -C app fetch origin
git -C app checkout develop && git -C app pull --ff-only
git add app && git commit -m "Bump source submodule"
```
