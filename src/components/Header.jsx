import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

export default function Header(props) {
    return (
        <header className="header">
            <button className="btn btn-header" onClick={props.onRefresh}>
                <i className={`fa fa-refresh${props.isRefreshing ? ' fa-spin' : ''}`} />
            </button>

            <button
                className={`btn btn-header${props.isEditMode ? ' active' : ''}`}
                onClick={props.onEditModeToggle}
            >
                <i className="fa fa-cog" />
            </button>
        </header>
    );
}

Header.propTypes = {
    isRefreshing: PropTypes.bool.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    onEditModeToggle: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};
