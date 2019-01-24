# Frontend Notes : all code in /client folder

### Technologies
- React: Frontend components library
- Redux: State management library

## TLDR
- App.js is the base of the app, all components used in the app are initialized here
- Routing is done with 'react-router-dom', you can initialize either public routes that don't need authentication:
```javascript
<Route exact path="/your-path" component={MyComponent} />
```
or routes that do require authentication:
```javascript
<PrivateRoute exact path="/your-path" component={MyComponent} />
```



# React Web Development 101

Generally, React is a frontend library that allows you to build components like so:
```javascript
<MyComponent />
```

## PROPS
In this example, you would just end up with a single component like a lego block that you can tack onto your React application. This is nice but most of the time React components will require **PROPS**. **PROPS** are basically parameters you pass to your components to change their data (e.g. configure component settings, change inner text, size, input passed, etc.)

So most components will look like this:
```javascript
<MyComponent myProp="my-setting" />
```

## STATE

```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        <div>
        </div>
    }
}
```


