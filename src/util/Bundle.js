import React, { Component } from 'react'

export default class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
    }

    componentWillMount = () => {
        this.load(this.props);
    }

    componentWillReceiveProps = nextProps => {
        nextProps.load !== this.props.load && this.load(nextProps);
    }

    load = props => {
        this.setState({
            mod: null
        });
        props.load().then(mod => {
            this.setState({
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render = () => this.state.mod ? this.props.children(this.state.mod) : null;
}