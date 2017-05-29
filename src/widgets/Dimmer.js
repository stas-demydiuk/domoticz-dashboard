import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

export default class Dimmer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: props.device.value}
    }

    onChange = (value) => {
        this.setState({value: value});
        this.props.onChange(value);
    };

    render() {
        const device = this.props.device;
        const isActive = device.value > 0;

        return (
            <div className={"widget widget-dimmer widget-default" + (isActive ? ' active' : '')}
                 onClick={this.props.onClick}>
                <h1>{ this.props.device.label }</h1>
                <h2 className="widget-value">
                    { this.state.value }<span className="units">%</span>
                </h2>
                <Slider onChange={this.onChange} value={this.state.value}/>
            </div>
        )
    }
}

Dimmer.propTypes = {
    device: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};