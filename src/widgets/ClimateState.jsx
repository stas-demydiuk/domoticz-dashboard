import React from 'react';
import PropTypes from 'prop-types';

export default function ClimateState(props) {
    const device = props.device;
    const units = device.value.celsius ? 'C' : 'F';

    return (
        <div>
            <h1>{ device.label }</h1>

            <div className="values">
                <div className="value temperature">
                    <span>{ device.value.temperature }</span>
                    <span className="units"> °{ units }</span>
                </div>

                <div className="value humidity">
                    <span>{ device.value.humidity }</span>
                    <span className="units"> %</span>
                </div>
            </div>
        </div>
    );
}

ClimateState.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.object,
    }).isRequired,
};
