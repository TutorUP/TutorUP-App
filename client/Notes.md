# Notes during Client Development

- Redux-thunk middleware: when we make AJAX request we wait for request to be fulfilled then dispatch to reducer
- Login with JWT creates a token that you save in localstorage and use to access any component/routes that are protected in app


## Form Components
- React + Redux form components are generally created like this:
```javascript
import { ajaxAction } from '../actions/formActions';

class myForm extends Component {
    state = {
        formInput: '',
        errors: {}
    }

    onSubmit = e => {
        e.preventDefault();
        const formData = {
            formInput: this.state.formInput
        };

        this.props.sendForm(formData, this.props.history);
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                </form>
            </div>
        )
    }

    const mapStateToProps = state => ({
        form: state.form
        errors: state.errors
    });

    export default connect(mapStateToProps, { ajaxAction })(myForm);
}
```

## Redirecting from within a component
- Use withRouter to do that: `import { withRouter } from 'react-router-dom'`