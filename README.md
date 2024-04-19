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

`reducer`: If this is a single function like *reducer: rootReducer*, it will be directly used as the root reducer for the store. If it is an object of slice reducers, like *{users : usersReducer, posts : postsReducer}*, **configureStore** will automatically create the root reducer by passing this object to the Redux combineReducers utility

```js
import { configureStore } from '@reduxjs/toolkit';
import {actionReducer, actionReducerTwo} from './slices';

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

- It's a utility that simplifies creating Redux reducer functions. It uses `Immer` internally to drastically simplify immutable update logic by writing "mutative" code in your reducers, and supports directly mapping specific action types to case reducer functions that will update the state when that action is dispatched.

- Redux reducers are often implemented using a *switch* statement, with one case for every handled action type. The `createReducer` makes it easy to implement such reducers. It uses a "builder callback" notation to define handlers for specific action types, matching against a range of actions, or handling a default case. This is conceptually similar to a switch statement.

- This function accepts a callback that receives a 'builder' object as its argument. That builder provides `addCase`, `addMatcher` and `addDefaultCase` functions that may be called to define what actions this particular reducer will handle.

    - initialState: The initial state that should be used when the reducer is called the first time
    - builderCallback: The callback function that receives a builder object as parameter, that object define case reducers via calling `builder.addCase(actionCreator / actionType, reducer)

- `builder methods`:
    - builder.addCase() : Adds a case reducer to handle a single exact action type. Accepts two parameters: an action type string or an action created by `actionCreator`, and a reducer case function.

```js
import { createReducer, createAction } from '@reduxjs/toolkit';

// actions
export const increment = createAction('reward/increment');

const initialState = {
    points: 15,
};

const rewardReducer = createReducer(initialState, (builder) => {
    builder.addCase(increment, (state, action) => {
        state.points += 1;
    })
});

export default rewardReducer;
```
### createAction():
Generates an action creator function for the given action type string.
```js
const increment = createAction(actionType, prepareAction?);
```
The usual way to write an action creator is to write the action type in a constant then create a action-creator function.
```js
const INCREMENT = 'counter/increment';

function increment(amount) {
    return {
        type: INCREMENT,
        payload: amount,
    };
};

const incAction = increment(5);
// {type: 'counter/increment', payload: 5}
```
The `createAction` helper function combines these two declarations into one. It takes an action type and returns an action creator for that type. The action creator can be called either without arguments or with a payload to be attached to the action. By default, the generated action creators accept a single argument, which becomes `action.payload`. 

```js
const increment = createAction('counter/increment');

const incAction = increment(); // {type: 'counter/increment'}

// OR
const incAction = increment(5); // {type: 'counter/increment', payload: 5}
```
You can pass the argument while dispatching that particular action:
```js
<button onClick={() => dispatch(increment(5))}></button>
```
- You can use `Prepare Callbacks` to customize action payload. Sometime you may want to add additioinal logic to customize action.payload such as generating an Id, getting current time stamp etc. For this purpose, `createAction` accepts an optional second argument: a callback function (titled 'prepare callback') to construct other values.
>The type field will be added automatically.

```js
const todo = createAction('todo/add', (text) => {
    return {
        payload: {
            id: 'someId',
            time: new Date().toISOString(),
            text,
        },
    };
});

const todoAction = todo('This is a customzied payload');
/* {
    type: 'todo/add',
    payload: {
        id: 'someId',
        time: '...',
        text: 'This is a customized payload'
     }
}
*/
```

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
- `extraReducers`: Conceptually, each slice reducer "owns" its slice of state. There's also a natural connection between reducers and the action types generated base on those reducers. However, there are many times that a slice needs to update its own state in response to action types that are written elsewhere in the application (such as clearing many different kinds of data when a "user logged out" action is dispatched). This can include action types defined by another slices, or any other kind of action. It is one of the key concept of Redux that many slice reducers can independently respond to the same action type.

  - **extraReducers** allows 'createSlice' to respond and update its own state in response to other action types besides the types it has generated.
  - However, unlike the 'reducers' field, each individual case reducer inside of 'extraReducers' will not generate a new action type or action creator.
  - If two fields from 'reducers' and 'extraReducers' happen to end up with the same action type string, the function from 'reducers' will be used to handle that action type.
  - Similar to `createReducer`, the 'extraReducers' field uses a "builder callback" notation to define handlers for specific action types, matching against a range of actions, or handling a default case. It's particularly useful for working with actions produced by `createAction` and `createAsyncThunk`.
    ```js
    import { createAction, createSlice } from "@reduxjs/toolkit"

    // you need to create an action to use in extraReducers "builder notation"
    const incrementByAmount = createAction('account/incrementByAmt');

    const bonusSlice = createSlice({
        name: 'bonus',
        initialState: {
            points: 0,
        },
        reducers: {
            increment(state) {
                state.points += 1;
            },
        },

        extraReducers: (builder) => {
            builder.addCase(incrementByAmount, (state, action) => {
                if (action.payload >= 100) {
                    state.points += Math.floor(action.payload / 100);
                } else {
                    state.points -= 1;
                };
            })
        }
    });

    export const { increment } = bonusSlice.actions;
    export default bonusSlice.reducer;
    ```
    >You can write extraReducers as you write slice reducers (in object like structure, without using builder callback notation) as well.

### combineSlices():
combines multiple slices into a single reducer, and allows "lazy loading" of slices after initialisation.
### createAsyncThunk:
Accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise.

Parameters:
 - `type`: A string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request.\
  For example, a type argument of 'users/requestStatus' will generate these action types:
   - pending: 'users/requestStatus/pending'
   - fulfilled: 'users/requestStatus/fulfilled'
   - rejected: 'users/requestStatus/rejected'
 - `payloadSelector`: A callback function that should return a promise containing the result of some asynchronous logic. It may also return a value synchronously. The 'payloadCreator' function can contain whatever logic you need to calculate an appropriate result. This could include a standard AJAX data fetch request, multiple AJAX calls with the results combined into a final value.
```js
export const getUserById = createAsyncThunk(
    'account/getUser',
    async (userId, thunkAPI) => {
        const { data } = await axios.get(`http://localhost:8080/accounts/${userId}`);

        return data.amount;
    }
);

// You can handle the different state of that promise in extraReducers
{
extraReducers(builder) {
    builder.addCase(getUserById.fulfilled, (state,action) => { // work on fulfilled action
            state.amount = action.payload;
            state.pending = false;
            state.error = false;
        }).addCase(getUserById.pending, (state) => {
            state.pending = true;
            state.error = false;
        }).addCase(getUserById.rejected, (state, action) => {
            state.pending = false;
            state.error = action.error;
        })
}
}
```
### createEntityAdapter:
generates a set of reusable reducers and selectors to manage normalized data in the store
The createSelector utility from the Reselect library, re-exported for ease of use.