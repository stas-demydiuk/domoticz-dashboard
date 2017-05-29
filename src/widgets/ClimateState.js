import React from 'react';
import PropTypes from 'prop-types';

export default class ClimateState extends React.Component {
    render() {
        const widgetColor = this.props.config.color || 'default';
        const device = this.props.device;
        const units = device.value.celsius ? 'C' : 'F';

        return (
            <div className={"widget widget-climate widget-" + widgetColor}>
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
        )
    }
}

ClimateState.propTypes = {
    device: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
};