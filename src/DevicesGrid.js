import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';

import './DevicesGrid.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DevicesGrid extends React.Component {
    render() {
        return (
            <ResponsiveReactGridLayout
                className="devices-grid"
                rowHeight={100}
                layouts={this.props.layouts}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

                {this.props.children}

            </ResponsiveReactGridLayout >
        )
    }
}