import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Widget.css';
import WidgetModal from '../components/dashboard/WidgetModal';
import { updateWidget, removeWidget } from '../actions/index';

class Widget extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
    }

    handleWidgetClick = (e) => {
        if (this.props.isEdit) {
            this.setState({ showModal: true });
            e.stopPropagation();
        }
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    handleUpdateWidget = (widgetType, widgetStyle, deviceId) => {
        this.setState({ showModal: false });

        this.props.updateWidget(
            this.props.pageId,
            this.props.id,
            widgetType,
            widgetStyle,
            deviceId,
        );
    };

    handleRemoveWidget = () => {
        this.props.removeWidget(this.props.pageId, this.props.id);
    };

    render() {
        const { type, style, deviceId, isActive, isEdit, children } = this.props;

        const classNames = [
            'widget',
            `widget-${type.toLowerCase()}`,
            `widget-${style}`,
        ];

        if (isActive) {
            classNames.push('active');
        }

        return (
            <div className={classNames.join(' ')}>
                {isEdit
                    ? <button className="btn-remove-widget" onClick={this.handleRemoveWidget}>
                        <i className="fa fa-remove" />
                    </button>
                    : null
                }

                {this.state.showModal &&
                <WidgetModal
                    type={type}
                    style={style}
                    deviceId={deviceId}
                    onSave={this.handleUpdateWidget}
                    onCancel={this.handleCloseModal}
                />
                }

                {isEdit &&
                <div onClickCapture={this.handleWidgetClick}>
                    {children}
                </div>
                }

                {!isEdit && children}
            </div>
        );
    }
}

Widget.propTypes = {
    id: PropTypes.number.isRequired,
    pageId: PropTypes.number.isRequired,
    children: PropTypes.node,
    type: PropTypes.string,
    style: PropTypes.string,
    deviceId: PropTypes.string,
    isActive: PropTypes.bool,
    isEdit: PropTypes.bool,
    updateWidget: PropTypes.func.isRequired,
    removeWidget: PropTypes.func.isRequired,
};

Widget.defaultProps = {
    children: null,
    type: 'default',
    style: 'default',
    deviceId: null,
    isActive: false,
    isEdit: false,
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateWidget, removeWidget }, dispatch);
};

export default connect(undefined, mapDispatchToProps)(Widget);
