import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import { setDeviceLevel } from '../actions/index';

class Dimmer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: props.device.value };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.device.value !== this.props.device.value) {
            this.setState({
                value: newProps.device.value,
            });
        }
    }

    onChange = (value) => {
        const { device, dispatch } = this.props;

        this.setState({ value });
        dispatch(setDeviceLevel(device.id, value));
    };

    render() {
        const device = this.props.device;

        return (
            <div>
                <h1>{device.label}</h1>
                <h2 className="widget-value">
                    {this.state.value}<span className="units">%</span>
                </h2>
                <Slider onChange={this.onChange} value={this.state.value} />
            </div>
        );
    }
}

Dimmer.propTypes = {
    device: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Dimmer);
