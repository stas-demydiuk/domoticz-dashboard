import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDeviceState } from '../actions/index';

class Switch extends React.Component {
    handleOnClick = () => {
        const { device, dispatch } = this.props;
        dispatch(setDeviceState(device.id, device.value === 'Off' ? 'On' : 'Off'));
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
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Switch);
