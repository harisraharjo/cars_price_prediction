import React, {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
             hasError: false
        }
    }
    
    componentDidCatch(){
        this.setState({
            hasError: true
        });
    }
    
    render() {
        return this.state.hasError ? <h1>Oops! Something is went wrong</h1> : this.props.children
    }
}

export default ErrorBoundary;
