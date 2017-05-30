import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { CirclePicker, HuePicker } from 'react-color';

ReactModal.setAppElement('#root');

const colors = [
    '#000000', '#CC9900', '#FFCC00', '#FFFF00', '#FFFF33', '#FFFF66', '#FFFFCC', '#ffffff',
    '#660000', '#990000', '#CC0000', '#FF0000', '#CC3333', '#FF6666', '#FF9999', '#FFCCCC',
    '#003300', '#006600', '#009900', '#00CC00', '#00FF00', '#66FF66', '#99FF99', '#CCFFCC',
    '#000066', '#000099', '#0000CC', '#0000FF', '#3366FF', '#3399FF', '#66CCFF', '#99CCFF',
];

export default class ColorControl extends React.Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
        };
    }

    setColor = (color) => {
        const isOff = color.rgb.r === 0 && color.rgb.g === 0 && color.rgb.b === 0;

        this.setState({
            color: isOff ? undefined : color.hex,
        });

        this.props.onChange(color);
    };

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        return (
            <div onClick={this.handleOpenModal} role="button" tabIndex="0">
                <h1>{ this.props.device.label }</h1>
                <h2 className="widget-value">
                    <i className="fa fa-lightbulb-o" aria-hidden="true" style={{ color: this.state.color }} />
                </h2>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Inline Styles Modal Example"
                    onRequestClose={this.handleCloseModal}
                    className="modal-color-picker"
                    overlayClassName="modal-overlay"
                >
                    <CirclePicker
                        colors={colors}
                        color={this.state.color}
                        circleSize="32"
                        width="100%"
                        onChangeComplete={this.setColor}
                    />

                    <HuePicker color={this.state.color} width="360px" onChangeComplete={this.setColor} />
                </ReactModal>
            </div>
        );
    }
}

ColorControl.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};
