import React from 'react';
import PropTypes from 'prop-types';

import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { addWidget } from '../../actions';

import './AddWidget.css';
import WidgetModal from '../../components/dashboard/WidgetModal';

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

    handleAddWidget = (widgetType, widgetStyle, deviceId) => {
        const { dispatch } = this.props;

        dispatch(addWidget(
            this.props.pageId,
            this.props.layout,
            widgetType,
            widgetStyle,
            deviceId,
        ));

        this.setState({
            showModal: false,
        });
    };

    render() {
        return (
            <div className="widget widget-transparent">
                <button className="btn" onClick={this.handleOpenModal}>
                    <h1>Add Widget</h1>
                    <h2 className="widget-value">
                        <i className="fa fa-plus" />
                    </h2>
                </button>

                {this.state.showModal &&
                <WidgetModal onSave={this.handleAddWidget} onCancel={this.handleCloseModal} />
                }
            </div>
        );
    }
}

AddWidget.propTypes = {
    pageId: PropTypes.number.isRequired,
    layout: PropTypes.shape({
        w: PropTypes.number.isRequired,
        h: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect()(AddWidget);
