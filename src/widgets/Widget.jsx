import React from 'react';
import PropTypes from 'prop-types';

import './Widget.css';

export default function Widget(props) {
    const classNames = [
        'widget',
        `widget-${props.type}`,
        `widget-${props.style}`,
    ];

    if (props.isActive) {
        classNames.push('active');
    }

    return (
        <div className={classNames.join(' ')}>
            { props.isEdit
                ? <button className="btn-remove-widget" onClick={props.onRemove}>
                    <i className="fa fa-remove" />
                </button>
                : null
            }

            { props.children }
        </div>
    );
}

Widget.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    style: PropTypes.string,
    isActive: PropTypes.bool,
    isEdit: PropTypes.bool,
    onRemove: PropTypes.func,
};

Widget.defaultProps = {
    children: null,
    type: 'default',
    style: 'default',
    isActive: false,
    isEdit: false,
    onRemove: () => null,
};
