# Redux Toolkit

Read more about [Redux-Toolkit](https://redux-toolkit.js.org/)

The Redux Toolkit package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "Have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

Now Redux toolkit with React try to provide some tools that abstract over the setup process and handle the most common use cases, as well as include some useful utilities that will let the user simplify their application code.

Redux Toolkit also includes a powerful data fetching and caching capability named "RTK Query". It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic yourself.

## Redux Toolkit includes these APIs:

### configureStore():
Wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the `Redux DevTools Extension`.

We need to import the reducer function from the slice and add it to our store. By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        action: actionReducer,
        actionTwo: actionReducerTwo,
    },
});
```

### createReducer():
Lets you supply a lookup table of action types to case reducer functions, rather than writing *switch statements*. In addition, it automatically uses the `immer` library to let you write simpler immutable updates with normal mutative code, like:
```js
state.todos[3].completed = true;
```
>Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes

### createAction():
generates an action creator function for the given action type string.
### createSlice():
accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action *creators* and action *types*.

- 'name' is name of the slice.
- 'initialState' is primary state of that slice.
- 'reducers' is an object of reducer functions. The name of the function will be determined as action type.
    ```js
    increment(state){
        // some code here
    }

    // This reducer will handle an action: 'sliceName'/increment
    ```

### combineSlices():
combines multiple slices into a single reducer, and allows "lazy loading" of slices after initialisation.
### createAsyncThunk:
accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise
### createEntityAdapter:
generates a set of reusable reducers and selectors to manage normalized data in the store
The createSelector utility from the Reselect library, re-exported for ease of use.