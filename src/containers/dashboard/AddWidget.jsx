import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { widgetTypes } from '../../dashboard';
import { addWidget } from '../../actions';

import './AddWidget.css';
import Widget from '../../widgets/Widget';

const mapStateToProps = state => ({
    devices: state.devices,
});

class AddWidget extends React.Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
        };
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleChangeWidgetType = (widgetType) => {
        this.setState({ widgetType });
    };

    handleChangeDevice = (device) => {
        this.setState({ device });
    };

    handleChangeStyle = (style) => {
        this.setState({ style });
    };

    handleAddWidget = () => {
        const { dispatch } = this.props;

        dispatch(addWidget({
            layout: { w: 1, h: 1, x: 0, y: 0 },
            type: this.state.widgetType.value,
            style: this.state.style.value,
            deviceId: this.state.device ? this.state.device.value : undefined,
        }));

        this.setState({
            showModal: false,
            device: null,
            widgetType: null,
            style: null,
        });
    };

    render() {
        const sortFunction = (a, b) => (a.label > b.label ? 1 : -1);

        const widgetOptions = Object
            .keys(widgetTypes)
            .map(key => ({ value: widgetTypes[key], label: widgetTypes[key].toLowerCase() }))
            .sort(sortFunction);

        const devices = this.props.devices
            .map(device => ({ value: device.id, label: device.label }))
            .sort(sortFunction);

        const styles = ['default', 'primary'].map(style => ({ value: style, label: style }));

        return (
            <Widget
                style="transparent"
                isActive={false}
                isEdit={false}
            >
                <button className="btn" onClick={this.handleOpenModal}>
                    <h1>Add Widget</h1>
                    <h2 className="widget-value">
                        <i className="fa fa-plus" />
                    </h2>
                </button>

                <ReactModal
                    isOpen={this.state.showModal}
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

                    <button className="btn-add" onClick={this.handleAddWidget}>Add</button>
                </ReactModal>
            </Widget>
        );
    }
}

AddWidget.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AddWidget);
