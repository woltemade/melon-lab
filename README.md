<img src = "https://github.com/melonproject/branding/blob/master/melon/Social%20Media%20Profile%20Picture%202-01.jpg" width = "30%">

# ipfs-frontend

IPFS Front-end application of the Melon portal. 


## Installation

1. Clone this repository
    ```
    git clone git@github.com:melonproject/ipfs-frontend.git
    cd ipfs-frontend

    ```

2. Install dependencies:
    ```
    npm install
    ```

## Getting started

After installation is complete

Go to the above `ipfs-frontend` directory, open a terminal and launch the react application:

```
npm start
```
## Build

```
npm run-script build
```

## Ipfs deployment

Build the react application:

```
npm build
```

React-script will create automatically the /build directory with a /static folder containing the .js and .css files. Since ipfs cannot handle relative paths, we need to get rid of the static folder and move all the files in the subfolders to the build directory. Next, change all the references of the files in index.html.

With the ipfs daemon running, deploy the app:

```
ipfs add -r build
```

## Architecture

The whole source code can be found in `/src`. The main architectural patterns are coming from:

- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Semantic UI React](https://react.semantic-ui.com/introduction) (We will move away from this)

Here is a quick overview and description of the subfolders of `/src`:

### `/` Root
The main entry point is here: `index.js`

### `/actions`
[Redux actions](https://redux.js.org/docs/basics/Actions.html) and creators. Each file exports `{ types, actions }`.

As a rule of thumb, we write imperative actions for user interactions: E.g. `SHOW_MESSAGE_BOX` or `SHOW_ERROR`.
And reactive actions for blockchain observations: `HAS_CONNECTED`, `NEW_BLOCK`, ...

### `/components`
Stateless, functional components.

### `/config`
Store, router and other configuration.

### `/containers`
Connected & composed components. See [react-redux](https://github.com/reactjs/react-redux/).

### `/reducers`
[Redux reducers](https://redux.js.org/docs/basics/Reducers.html).

### `/sagas`
[Redux sagas](https://redux-saga.js.org/)




https://redux.js.org/docs/basics/Actions.htm
