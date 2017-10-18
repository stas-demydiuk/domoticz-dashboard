import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

import 'react-select/dist/react-select.css';

import { widgetTypes } from '../../dashboard';

class WidgetModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            widgetType: props.type,
            style: props.style,
            device: props.deviceId,
        };
    }

    handleChangeWidgetType = (widgetType) => {
        this.setState({ widgetType });
    };

    handleChangeDevice = (device) => {
        this.setState({ device });
    };

    handleChangeStyle = (style) => {
        this.setState({ style });
    };

    handleSave = () => {
        this.props.onSave(
            this.state.widgetType.value || this.state.widgetType,
            this.state.style.value || this.state.style,
            this.state.device.value || this.state.device,
        );
    };

    handleCloseModal = () => {
        this.props.onCancel();
    };

    render() {
        const sortFunction = (a, b) => (a.label > b.label ? 1 : -1);

        const widgetOptions = Object
            .keys(widgetTypes)
            .map(key => ({
                value: widgetTypes[key],
                label: this.props.translations.widgetTypes[widgetTypes[key]],
            }))
            .sort(sortFunction);

        const devices = this.props.devices
            .map(device => ({ value: device.id, label: device.label }))
            .sort(sortFunction);

        const styles = ['default', 'primary'].map(style => ({ value: style, label: style }));

        return (
            <ReactModal
                isOpen
                contentLabel="Add Widget Modal"
                onRequestClose={this.handleCloseModal}
                className="modal-add-widget"
                overlayClassName="modal-overlay"
            >
                <label htmlFor="widget-selector">Widget</label>
                <Select
                    id="widget-selector"
                    options={widgetOptions}
                    value={this.state.widgetType}
                    onChange={this.handleChangeWidgetType}
                />

                <label htmlFor="device-selector">Device</label>
                <Select
                    id="widget-selector"
                    options={devices}
                    value={this.state.device}
                    onChange={this.handleChangeDevice}
                />

                <label htmlFor="style-selector">Style</label>
                <Select
                    id="style-selector"
                    options={styles}
                    value={this.state.style}
                    onChange={this.handleChangeStyle}
                />

                <button className="btn-add" onClick={this.handleSave}>Save</button>
            </ReactModal>
        );
    }
}

WidgetModal.propTypes = {
    style: PropTypes.string,
    deviceId: PropTypes.string,
    type: PropTypes.string,
    devices: PropTypes.arrayOf(PropTypes.object).isRequired,
    translations: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

WidgetModal.defaultProps = {
    style: undefined,
    deviceId: undefined,
    type: undefined,
};

const mapStateToProps = state => ({
    devices: state.devices,
    translations: state.translations,
});

export default connect(mapStateToProps)(WidgetModal);
