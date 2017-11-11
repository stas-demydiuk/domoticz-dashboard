import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PageItem from './PageItem';
import AddWidget from './AddWidget';

import './Page.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function getNextWidgetPosition(layout) {
    const maxY = layout.reduce((value, item) => Math.max(value, item.y), 0);
    const maxX = layout.reduce((value, item) => Math.max(value, item.x), 0);
    const x = layout
        .filter(item => item.y === maxY)
        .reduce((value, item) => Math.max(value, item.x), 0) + 1;

    return x > maxX
        ? { y: maxY + 1, x: 0 }
        : { y: maxY, x };
}

export default class Page extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {};
    }

    getLayout(type) {
        const layout = this.props.items.map((item, idx) => {
            const widgetLayout = item.layout[type] || { w: 1, h: 1, x: 0, y: 0 };
            const baseConfig = { ...widgetLayout, i: idx.toString() };

            return this.props.editMode
                ? { ...baseConfig, static: false }
                : { ...baseConfig, static: true };
        });

        if (this.props.editMode) {
            const { x, y } = getNextWidgetPosition(layout);
            const widgetLayout = { w: 1, h: 1, x, y };

            layout.push({ i: layout.length.toString(), ...widgetLayout });
        }

        return layout;
    }

    getDevice(deviceId) {
        return this.props.devices.find(device => device.id === deviceId);
    }

    handleBreakpointChange = (name, cols) => {
        this.setState({ name, cols });
    };

    handleLayoutChange = (layout) => {
        if (!this.state.name) {
            return;
        }

        this.props.onUpdateLayout(this.state.name, layout);
    };

    render() {
        const props = this.props;

        const layouts = {
            lg: this.getLayout('lg'),
            md: this.getLayout('md'),
            sm: this.getLayout('sm'),
            xs: this.getLayout('xs'),
            xxs: this.getLayout('xxs'),
        };

        const widgets = props.items.map((item, idx) => {
            const device = item.deviceId
                ? this.getDevice(item.deviceId)
                : null;

            return (
                <div key={idx.toString()}>
                    <PageItem
                        id={idx}
                        pageId={props.id}
                        key={idx.toString()}
                        widget={item}
                        device={device}
                        isEditMode={props.editMode}
                    />
                </div>
            );
        });

        if (props.editMode) {
            const idx = widgets.length.toString();
            const widgetLayout = {};

            ['lg', 'md', 'sm', 'xs', 'xxs'].forEach((name) => {
                const { x, y } = getNextWidgetPosition(layouts[name]);
                widgetLayout[name] = { w: 1, h: 1, x, y };
            });

            widgets.push((
                <div key={idx}>
                    <AddWidget pageId={props.id} layout={widgetLayout} />
                </div>
            ));
        }

        return (
            <ResponsiveReactGridLayout
                className="devices-grid"
                rowHeight={100}
                onLayoutChange={this.handleLayoutChange}
                onBreakpointChange={this.handleBreakpointChange}
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 8, md: 6, sm: 4, xs: 4, xxs: 2 }}
            >
                {widgets}
            </ResponsiveReactGridLayout>
        );
    }
}

Page.propTypes = {
    id: PropTypes.number.isRequired,
    editMode: PropTypes.bool.isRequired,
    devices: PropTypes.arrayOf(PropTypes.object).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        layout: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        deviceId: PropTypes.string,
    })).isRequired,
    onUpdateLayout: PropTypes.func.isRequired,
};
