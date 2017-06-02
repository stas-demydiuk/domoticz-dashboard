import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';

import Page from '../components/dashboard/Page';
import Header from './Header';
import AddPage from './dashboard/AddPage';

import {
    fetchDevices,
    fetchRooms,
    removeWidget,
    updateLayout,
} from '../actions';


import './DeviceGrid.css';

const mapStateToProps = state => ({
    pages: state.dashboard.pages,
    devices: state.devices,
});

class Container extends React.Component {
    constructor() {
        super();

        this.state = {
            editMode: false,
            selectedPage: 0,
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchDevices());
        dispatch(fetchRooms());

        this.timerId = setInterval(() => {
            dispatch(fetchDevices());
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    toggleEditMode = () => {
        this.setState({ editMode: !this.state.editMode });
    };

    handleOnRemoveWidget = (page, index) => {
        const { dispatch } = this.props;
        dispatch(removeWidget(page, index));
    };

    handleOnUpdateLayout = (page, layout) => {
        const { dispatch } = this.props;
        dispatch(updateLayout(page, layout));
    };

    handleOnPageChange = (index) => {
        if (this.state.editMode) {
            return;
        }

        this.setState({ selectedPage: index });
    };

    render() {
        const isEditMode = this.state.editMode;

        const pages = this.props.pages
            .map((page, idx) => (
                <Page
                    key={idx}
                    editMode={isEditMode}
                    items={page.widgets}
                    devices={this.props.devices}
                    onUpdateLayout={(layout) => {
                        this.handleOnUpdateLayout(idx, layout);
                    }}
                    onRemoveWidget={(index) => {
                        this.handleOnRemoveWidget(idx, index);
                    }}
                />
            ))
            .filter((page, idx) => (isEditMode ? idx === this.state.selectedPage : true));

        const settings = {
            showArrows: false,
            showStatus: false,
            showIndicators: pages.length > 1,
            showThumbs: false,
            infiniteLoop: true,
            selectedItem: isEditMode ? 0 : this.state.selectedPage,
            onChange: this.handleOnPageChange,
        };

        return (
            <div>
                <Header isEditMode={isEditMode} onEditModeToggle={this.toggleEditMode} />

                <Carousel {...settings}>
                    {pages}
                </Carousel>

                {this.state.editMode
                    ? <AddPage />
                    : null
                }
            </div>
        );
    }
}

Container.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object).isRequired,
    pages: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Container);
