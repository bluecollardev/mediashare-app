# Mediashare Phone App

## Running the Mediashare App and API

**Prerequisites:**
You will need to have Node.js, npm, yarn, and Docker installed locally

**Important**
There are three repositories for this project.
- https://github.com/bluecollardev/mediashare-app - The branded phone app
- https://github.com/bluecollardev/mediashare-source - The whitelabel phone app
- https://github.com/bluecollardev/mediashare - The API for the phone app

To run the project locally, you will need to start both of them. You will also have to start the database.

### Running the Phone App in iOS Simulator

To run the project against staging environment, just start the phone app. To run the phone app, open a terminal window and run the following commands:

```shell
  yarn install # If you haven't already
```

First, start the Metro bundler on port 8081:

```shell
  yarn start
```

Then, open another terminal and start the Phone App in iOS Simulator:

```shell
  yarn ios:local # Run using local env vars and APIs
  # or
  yarn ios:staging # Run using staging env vars and APIs
  # or
  yarn ios:prod # Run using production env vars and APIs
```

### Troubleshooting

If you update Podfile (iOS native dependencies), try installing or refreshing the iOS Pods:

```shell
  yarn util:ios:install-pods
  # or
  yarn util:ios:refresh-pods
```
