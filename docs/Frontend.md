# Frontend Notes : all code in /client folder

### Technologies
- React
- Redux

## TLDR
- App.js is the base of the app, all components used in the app are initialized here
- Routing is done with 'react-router-dom', you can initialize either public routes that don't need authentication:
```javascript
<Route>
```
or routes that do require authentication:
```javascript
<PrivateRoute />
```
## React info

Generally, React is a frontend library that allows you to build components like so:
```javascript
<MyComponent />
```


```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        <div>
        </div>
    }
}
```


