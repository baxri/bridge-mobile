# Intropath (aka Bridge) react native app

## Setup and run the app

To setup, run `yarn install`

To run:

- `yarn start`
- In a separate terminal, `react-native run-ios` or `react-native run-android`

## Setup and run storybook

- Add `STORYBOOK_URL=http://localhost:7007` to your local `.env` file if it's not already set
- To start the storybook server, run `yarn storybook`
- In a separate terminal, `react-native run-ios` or `react-native run-android`

To switch from storybook mode to app mode stop `yarn storybook`, run `yarn start` & reload the app.

To switch from app mode to storybook mode stop `yarn start`, run `yarn storybook` & reload the app.

## Deploy to Testflight

We're using [Bitrise](https://app.bitrise.io/app/033726a70d507d06) to automatically deploy to Testflight.

See https://www.notion.so/brdgapp/App-automated-build-and-deployment-da64812c44d24e3fbe31ed1add0e5bae for further details.
