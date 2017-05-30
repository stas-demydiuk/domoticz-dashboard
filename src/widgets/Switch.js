import React from 'react';

export default class Switch extends React.Component {
    render() {
        const state = this.props.device.value.toLocaleLowerCase();

        return (
            <div onClick={this.props.onClick}>
                <h1>{ this.props.device.label }</h1>
                <h2 className="widget-value">
                    <i className={"fa fa-toggle-" + state} aria-hidden="true"></i>
                </h2>
            </div>
        )
    }
}