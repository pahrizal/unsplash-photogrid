# Photo Grid App

Simple photo grid app that using this awesome stack:
- React
- Typescript
- TailwindCSS
- [Unsplash - The internet's source of freely-usable images](https://unsplash.com)

## Development
Clone this repo and than in the project directory, you can run:

### `yarn install`

this will install all dependencies needed.

## Register to Unsplash

Register your Unsplash developer account [here](https://unsplash.com/join) and then you will get a public authorization key `Client-ID`.\
create a `.env` file in the project root directory and add:
```bash
REACT_APP_UNSPLASH_CLIENT_ID=<client-id>
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
