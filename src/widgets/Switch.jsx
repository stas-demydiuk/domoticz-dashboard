import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setDeviceState, STATE_ON, STATE_OFF } from '../actions/index';

class Switch extends React.Component {
    handleOnClick = () => {
        const { device } = this.props;
        this.props.setDeviceState(device.id, device.value === STATE_OFF ? STATE_ON : STATE_OFF);
    };

    render() {
        const device = this.props.device;
        const state = device.value.toLocaleLowerCase();

        return (
            <button className="btn" onClick={this.handleOnClick}>
                <h1>{ device.label }</h1>
                <h2 className="widget-value">
                    <i className={`fa fa-toggle-${state}`} aria-hidden="true" />
                </h2>
            </button>
        );
    }
}

Switch.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
    setDeviceState: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDeviceState }, dispatch);
}

export default connect(undefined, mapDispatchToProps)(Switch);
