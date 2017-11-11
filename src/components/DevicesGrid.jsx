import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import Page from './dashboard/Page';
import AddPage from './dashboard/AddPage';

import { saveLayout } from '../actions';

import './DeviceGrid.css';

class Container extends React.Component {
    constructor() {
        super();

        this.state = {
            layout: {},
            editMode: false,
            selectedPage: 0,
        };
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    toggleEditMode = () => {
        const isEditMode = !this.state.editMode;
        const { page, name, layout } = this.state.layout;

        this.setState({ editMode: isEditMode });

        if (!isEditMode) {
            this.props.saveLayout(page, name, layout);
        }
    };

    handleOnUpdateLayout = (page, name, layout) => {
        this.setState({
            layout: { page, name, layout },
        });
    };

    handleOnPageChange = (index) => {
        if (this.state.editMode) {
            return;
        }

        this.setState({ selectedPage: index });
    };

    render() {
        const isEditMode = this.state.editMode;
        const pageId = 0;
        const page = this.props.pages[pageId];

        if (!page) {
            return null;
        }

        return (
            <div>
                <Header isEditMode={isEditMode} onEditModeToggle={this.toggleEditMode} />

                <Page
                    id={pageId}
                    editMode={isEditMode}
                    items={page.widgets}
                    devices={this.props.devices}
                    onUpdateLayout={(layoutName, layout) => {
                        this.handleOnUpdateLayout(pageId, layoutName, layout);
                    }}
                />

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
    saveLayout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    pages: state.dashboard.pages,
    devices: state.devices,
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ saveLayout }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
