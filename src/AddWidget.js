import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {connect} from 'react-redux';

import {widgetTypes} from './dashboard';
import {addWidget} from './actions';

import './AddWidget.css';
import 'react-select/dist/react-select.css'

const mapStateToProps = (state) => {
    return {
        dashboard: state.dashboard,
        devices: state.devices
    }
};

class AddWidget extends React.Component {
    constructor() {
        super();

        this.state = {
            showModal: false
        };
    }

    handleOpenModal = () => {
        this.setState({showModal: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };

    handleChangeWidgetType = (widgetType) => {
        this.setState({widgetType});
    };

    handleChangeDevice = (device) => {
        this.setState({device});
    };

    handleChangeStyle = (style) => {
        this.setState({style});
    };

    handleAddWidget = () => {
        const {dispatch} = this.props;

        dispatch(addWidget({
            layout: {w: 1, h: 1, x: 0, y: 0},
            type: this.state.widgetType.value,
            style: this.state.style.value,
            deviceId: this.state.device ? this.state.device.value : undefined
        }));

        this.setState({
            showModal: false,
            device: null,
            widgetType: null,
            style: null
        });
    };

    render() {
        const widgetOptions = Object
            .keys(widgetTypes)
            .map(key => {
                return {value: widgetTypes[key], label: widgetTypes[key].toLowerCase()}
            })
            .sort((a, b) => a.label > b.label ? 1 : -1);

        const devices = this.props.devices
            .map(device => {
                return {value: device.id, label: device.label}
            })
            .sort((a, b) => a.label > b.label ? 1 : -1);

        const styles = ['default', 'primary'].map(style => {
            return {value: style, label: style}
        });

        return (
            <div>
                <button className="btn-add-device" onClick={this.handleOpenModal}>
                    <i className="fa fa-plus"></i>
                </button>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Add Widget Modal"
                    onRequestClose={this.handleCloseModal}
                    className="modal-add-widget"
                    overlayClassName="modal-overlay"
                >
                    <label>Widget</label>
                    <Select
                        options={widgetOptions}
                        value={this.state.widgetType}
                        onChange={this.handleChangeWidgetType}
                    />

                    <label>Device</label>
                    <Select
                        options={devices}
                        value={this.state.device}
                        onChange={this.handleChangeDevice}
                    />

                    <label>Style</label>
                    <Select
                        options={styles}
                        value={this.state.style}
                        onChange={this.handleChangeStyle}
                    />

                    <button className="btn-add" onClick={this.handleAddWidget}>Add</button>
                </ReactModal>
            </div>
        )
    }
}

AddWidget.propTypes = {
    dashboard: PropTypes.array.isRequired,
    devices: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(AddWidget);