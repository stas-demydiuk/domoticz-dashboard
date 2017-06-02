import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import { addPage } from '../../actions';

const mapStateToProps = state => ({
    rooms: state.rooms,
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

    handleChangeRoom = (room) => {
        this.setState({ room });
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleAddRoom = () => {
        const { dispatch } = this.props;
        const roomId = this.state.room.value;

        dispatch(addPage(roomId, []));

        this.setState({
            showModal: false,
            room: null,

        });
    };

    render() {
        const sortFunction = (a, b) => (a.label > b.label ? 1 : -1);

        const rooms = this.props.rooms
            .map(room => ({ value: room.id, label: room.name }))
            .sort(sortFunction);

        return (
            <div>
                <button className="btn-add-device" onClick={this.handleOpenModal}>
                    <i className="fa fa-plus" />
                </button>

                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Add Page Modal"s
                    onRequestClose={this.handleCloseModal}
                    className="modal-add-widget"
                    overlayClassName="modal-overlay"
                >
                    <label htmlFor="room-selector">Room</label>
                    <Select
                        id="room-selector"
                        options={rooms}
                        value={this.state.room}
                        onChange={this.handleChangeRoom}
                    />

                    <label htmlFor="add-devices-checkbox">
                        <input
                            id="add-devices-checkbox"
                            type="checkbox"
                            name="addDevices"
                            onChange={this.handleChange}
                        /> Include devices
                    </label>

                    <button className="btn-add" onClick={this.handleAddRoom}>Add</button>
                </ReactModal>
            </div>
        );
    }
}

AddWidget.propTypes = {
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AddWidget);
