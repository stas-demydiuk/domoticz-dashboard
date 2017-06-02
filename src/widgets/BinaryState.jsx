import React from 'react';
import PropTypes from 'prop-types';

export default function BinaryState(props) {
    const isActive = props.device.isActive;
    const icon = isActive
        ? props.config.icons.On
        : props.config.icons.Off;

    return (
        <div>
            <h1>{ props.device.label }</h1>
            <h2 className="widget-value">
                <i className={`fa ${icon}`} aria-hidden="true" />
            </h2>
        </div>
    );
}

BinaryState.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        isActive: PropTypes.bool,
    }).isRequired,
    config: PropTypes.shape({
        icons: PropTypes.shape({
            On: PropTypes.string.isRequired,
            Off: PropTypes.string.isRequired,
        }),
    }).isRequired,
};
