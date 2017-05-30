import React from 'react';
import PropTypes from 'prop-types';

export default function Switch(props) {
    const device = props.device;
    const state = device.value.toLocaleLowerCase();

    return (
        <button className="btn" onClick={props.onClick}>
            <h1>{ device.label }</h1>
            <h2 className="widget-value">
                <i className={`fa fa-toggle-${state}`} aria-hidden="true" />
            </h2>
        </button>
    );
}

Switch.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
