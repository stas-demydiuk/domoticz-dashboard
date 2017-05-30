import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchDevices, setDeviceColor, setDeviceState, setDeviceLevel, removeWidget, updateLayout} from '../actions';
import DevicesGrid from '../DevicesGrid';
import {widgetTypes} from '../dashboard';

import Clock from '../widgets/Clock';
import Switch from '../widgets/Switch'
import BinaryState from '../widgets/BinaryState'
import ClimateState from "../widgets/ClimateState";
import ColorControl from "../widgets/ColorControl";
import Dimmer from "../widgets/Dimmer";
import Counter from "../widgets/Counter";
import AddWidget from "../AddWidget";
import Widget from "../widgets/Widget";

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
        devices: state.devices
    }
};

class Container extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchDevices());

        this.timerId = setInterval(() => {
            dispatch(fetchDevices());
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onSwitchClick = (device) => {
        const {dispatch} = this.props;
        dispatch(setDeviceState(device.id, device.value === 'Off' ? 'On' : 'Off'))
    };

    onColorSet = (device, color) => {
        const {dispatch} = this.props;

        if (color.rgb.r === 0 && color.rgb.g === 0 && color.rgb.b === 0) {
            dispatch(setDeviceState(device.id, 'Off'));
        } else if (color.rgb.r === 255 && color.rgb.g === 255 && color.rgb.b === 255) {
            dispatch(setDeviceState(device.id, 'On'));
        } else {
            dispatch(setDeviceColor(device.id, color));
        }
    };

    onLevelSet = (device, value) => {
        const {dispatch} = this.props;
        dispatch(setDeviceLevel(device.id, value));
    };

    onRemoveWidget = (index) => {
        const {dispatch} = this.props;
        dispatch(removeWidget(index));
    };

    onUpdateLayout = (layout) => {
        const {dispatch} = this.props;
        dispatch(updateLayout(layout));
    };

    getDevice = (id) => {
        return this.props.devices.find(device => device.id === id)
    };

    render() {
        const getWidget = (item) => {
            const device = item.deviceId
                ? this.getDevice(item.deviceId)
                : null;

            switch (item.type) {
                case widgetTypes.clock:
                    return <Clock/>;
                case widgetTypes.switch:
                    return device ? <Switch device={device} onClick={this.onSwitchClick.bind(this, device)}/> : null;
                case widgetTypes.binaryState:
                    return device ? <BinaryState device={device} config={item}/> : null;
                case widgetTypes.climate:
                    return device ? <ClimateState device={device} config={item}/> : null;
                case widgetTypes.color:
                    return device ? <ColorControl device={device} config={item}
                                                  onChange={this.onColorSet.bind(this, device)}/> : null;
                case widgetTypes.counter:
                    return device ? <Counter device={device} config={item}/> : null;
                case widgetTypes.dimmer:
                    return device ?
                        <Dimmer device={device} config={item} onChange={this.onLevelSet.bind(this, device)}/> : null;
                default:
                    return null
            }
        };

        const layout = this.props.dashboard.map((item, idx) => {
            let baseConfig = {...item.layout, i: idx.toString()};

            return this.props.editMode
                ? {...baseConfig, static: false}
                : {...baseConfig, static: true}
        });

        const layouts = {
            lg: layout,
            md: layout,
            sm: layout,
            xs: layout,
            xxs: layout
        };

        const widgets = this.props.dashboard.map((item, idx) => {
            const device = item.deviceId
                ? this.getDevice(item.deviceId)
                : null;

            return (
                <div key={idx.toString()}>
                    <Widget
                        type={item.type.toLowerCase()}
                        style={item.style}
                        isActive={device ? device.isActive : false}
                        isEdit={this.props.editMode}
                        onRemove={this.onRemoveWidget.bind(this, idx)}>
                        { getWidget(item) }
                    </Widget>
                </div>
            );
        });

        return (
            <div style={{width: '100%'}}>
                <DevicesGrid layouts={layouts} onUpdateLayout={this.onUpdateLayout}>
                    {widgets}
                </DevicesGrid>

                {this.props.editMode
                    ? <AddWidget />
                    : null
                }
            </div>
        )
    }
}

Container.propTypes = {
    devices: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    editMode: PropTypes.bool
};

export default connect(mapStateToProps)(Container);