# Twitter Clone: Ongoing Project

# Updates

1. ✅ Added Support for Likes on main tweets.
2. ✅ Search Support


## Note & Thoughts
  - Lesson: I would think about using scalable options by taking advantage of NOSQL's inherent nature.
  That is, infinite replies will be implemented not with Array data structure, but with proper reference ID on each individual tweet data. 
  I would consider every reply as a separate tweet as well.
  Thereby, I can lookup for each tweet's parent reply or child reply. IE: so, if i want to store a  tweet with _id: 12345 
  and someone replies to it. the reply will have a parent: 12345.

  That means, whenever I load tweet 12345, the noSQL database can query for tweets that a parentID of 12345, this will allow for dynamic and fluid retrieval of data that is not reliant on an entire array. 
  For example, I can implement a load more replies button, that will load more replies from any tweet with proper flexibility and control because each tweet will be accessible directly from the collection.

## DataStorage

1. Tweets and Users are stored in firebase (NOSQL)

2. No state management as I did not know about it when starting on this project.
   (I have used it on latest projects and will continue to do so... I may implement it on this project one day) - I may refactor and use State Management



## Current

- Supports Infinite Comments/Replies using Array Data structure and firebase. (works like reddit comments)

  ### `Image`

- supports only IMAGE medias for now (Hosted on Firebase)

  ### `Auth`

  - Authentication is done through Firebase (google sign-in);

  ### `NAV`

  - Only supports Home and Profile

## REFACTOR

- Before implementing new features, and If I set aside some time on this project,
- I need to refactor my code first.

- Utilzes Higher Order Components for reuse
- Maybe use State Management

# HOSTED ON FIREBASE

make sure to run build first
use firebase deploy to deploy after setting it up
https://twitter-clone-33714.web.app/

# DEFAULT

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
