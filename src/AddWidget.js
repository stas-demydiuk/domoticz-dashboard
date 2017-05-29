import React from 'react';
import './AddWidget.css';
import ReactModal from "react-modal";

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

    render() {
        return (
            <div>
                <button className="btn-add-device" onClick={this.handleOpenModal}>
                    <i className="fa fa-plus"></i>
                </button>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Add Widget Modal"
                    onRequestClose={this.handleCloseModal}
                    className="modal-color-picker"
                    overlayClassName="modal-overlay"
                >
                    <h1>Hello</h1>
                </ReactModal>
            </div>
        )
    }
}

export default AddWidget;