import React from 'react';
import PropTypes from 'prop-types';

export default class BinaryState extends React.Component {
    render() {
        const isActive = this.props.device.isActive;
        const icon = isActive
            ? this.props.config.icons.On
            : this.props.config.icons.Off;

        return (
            <div>
                <h1>{ this.props.device.label }</h1>
                <h2 className="widget-value">
                    <i className={"fa " + icon} aria-hidden="true"></i>
                </h2>
            </div>
        )
    }
}

BinaryState.propTypes = {
    device: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
};