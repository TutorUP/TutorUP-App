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
- App.js is the wrapper for all our page components, and each page is divided into a subfolder containing all the React stuff needed. All React stuff is in the components folder like so:
client/src/components:
- auth: Login & Register page components
- common: UI pieces that we like to reuse, like popups, spinners, Not Found page
- dashboard: UI pieces related to Dashboard page
- layout: UI pieces related to navbar, navbar links, and the landing page
- profile: Related to Create/Edit Profile pages, and the profile itself
- profileOptions: Related to data about profile
- search: Related to Search page
- showcase: Related to page where we view all Profiles, can be integrated with Search


# React Web Development 101

Generally, React is a frontend library that allows you to use components like so:
```javascript
<MyComponent />
```

## PROPS
In the above example, you would just end up with a single component like a lego block that you can tack onto your React application. This is nice but most of the time React components will require **PROPS**. **PROPS** are basically parameters you pass to your components to change their data (e.g. configure component settings, change inner text, size, input passed, etc.)

So most components will look like this:
```javascript
<MyComponent myProp="my-setting" />
```

## COMPONENT INITIALIZATION
There are two ways to create React components: either as classes or as functions. Classes contain state whereas functions don't. More about state is discussed below.

### React class
All React classes extend from Component:
```javascript
import React, { Component } from 'react';

class MyClass extends Component {
    state = {
        blah: data,
        isState: true,
        isExample: true
    }

    render() {
        <div>
            <h1>Hi There</h1>
        </div>

    }
}

export default MyClass;
```

It is preferred using React functions for components instead of classes:
```javascript
import React from 'react';

const myFunc = () => (
    <div>
        <h1>Hi There</h1>
    </div>
);

export default myFunc;
```

## STATE
State is defined as the data that drives a web application. This includes data entered from form fields, popups to show or not, errors that appear after attempting to submit invalid input, etc. Think of state as the local variables to a React component, because that component needs that data.

State is modified with this snippet:
```javascript
this.setState({ myslice: mySetting });
```
And yes, you can send state data as props to a child component but please avoid doing this.

```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
    render() {
        <div>
        </div>
    }
}
```


