import React from 'react';
import PropTypes from 'prop-types';

import './Widget.css';

export default class Widget extends React.Component {
    render() {
        let classNames = [
            'widget',
            'widget-' + (this.props.type ? this.props.type : 'default'),
            'widget-' + (this.props.style ? this.props.style : 'default')
        ];

        if (this.props.isActive) {
            classNames.push('active')
        }

        return (
            <div className={classNames.join(' ')}>
                { this.props.isEdit
                    ? <button className="btn-remove-widget" onClick={this.props.onRemove}>
                        <i className="fa fa-remove"></i>
                      </button>
                    : null
                }

                { this.props.children }
            </div>
        );
    }
}

Widget.propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    isActive: PropTypes.bool,
    isEdit: PropTypes.bool,
    onRemove: PropTypes.func
};