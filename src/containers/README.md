Containers connect state-less functional components to state with `redux` and to
lifecycle with `recompose`.

# Redux Boilerplate

```javascript
import { connect } from "react-redux";

import Component from "../components/organisms/Component";

const mapStateToProps = state => ({
  loading: state.app.transactionInProgress
  /* ... */
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  /* ... */
});

const ComponentContainer = connect(mapStateToProps, mapDispatchToProps)(
  Component
);

export default ComponentContainer;
```
