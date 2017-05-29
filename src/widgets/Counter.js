import React from 'react';
import PropTypes from 'prop-types';

export default class Counter extends React.Component {
    render() {
        const isActive = this.props.device.isActive;
        const device = this.props.device;

        return (
            <div className={"widget widget-default" + (isActive ? ' active' : '')}>
                <h1>{ this.props.device.label }</h1>
                <h2 className="widget-value">
                    { device.value }
                </h2>
            </div>
        )
    }
}

Counter.propTypes = {
    device: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
};