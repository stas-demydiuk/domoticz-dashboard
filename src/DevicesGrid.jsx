import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';

import './DevicesGrid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function DevicesGrid(props) {
    return (
        <ResponsiveReactGridLayout
            className="devices-grid"
            rowHeight={100}
            onLayoutChange={props.onUpdateLayout}
            layouts={props.layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
            {props.children}
        </ResponsiveReactGridLayout >
    );
}

DevicesGrid.propTypes = {
    children: PropTypes.node.isRequired,
    layouts: PropTypes.shape({
        lg: PropTypes.array,
        md: PropTypes.array,
        sm: PropTypes.array,
        xs: PropTypes.array,
        xxs: PropTypes.array,
    }).isRequired,
    onUpdateLayout: PropTypes.func.isRequired,
};
