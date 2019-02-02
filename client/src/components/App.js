import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

const App = () => (
   <Provider store={store}>
      <h1>Node React shop</h1>
   </Provider>
);

export default App;
