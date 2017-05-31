import React from 'react';
import PropTypes from 'prop-types';

export default function Counter({ device }) {
    return (
        <div>
            <h1>{ device.label }</h1>
            <h2 className="widget-value">
                { device.value }
            </h2>
        </div>
    );
}

Counter.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
};
