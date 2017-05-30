import React from 'react';
import PropTypes from 'prop-types';

export default function Switch(props) {
    const device = props.device;
    const state = device.value.toLocaleLowerCase();

    return (
        <div onClick={props.onClick} role="button" tabIndex="0">
            <h1>{ device.label }</h1>
            <h2 className="widget-value">
                <i className={'fa fa-toggle-' + state} aria-hidden="true"></i>
            </h2>
        </div>
    );
}

Switch.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};
