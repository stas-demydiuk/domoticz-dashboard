import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PageItem from './PageItem';
import AddWidget from '../../containers/dashboard/AddWidget';

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

export default function Page(props) {
    const getDevice = id => props.devices.find(device => device.id === id);

    const layout = props.items.map((item, idx) => {
        const baseConfig = { ...item.layout, i: idx.toString() };

        return props.editMode
            ? { ...baseConfig, static: false }
            : { ...baseConfig, static: true };
    });

    const widgets = props.items.map((item, idx) => {
        const device = item.deviceId
            ? getDevice(item.deviceId)
            : null;

        return (
            <div key={idx.toString()}>
                <PageItem
                    widget={item}
                    device={device}
                    editMode={props.editMode}
                    onRemove={() => {
                        props.onRemoveWidget(idx);
                    }}
                />
            </div>
        );
    });

    if (props.editMode) {
        const idx = widgets.length.toString();
        const { x, y } = getNextWidgetPosition(layout);

        widgets.push((
            <div key={idx}>
                <AddWidget />
            </div>
        ));

        layout.push({ i: idx, w: 1, h: 1, x, y });
    }

    const layouts = {
        lg: layout,
        md: layout,
        sm: layout,
        xs: layout,
        xxs: layout,
    };

    return (
        <ResponsiveReactGridLayout
            className="devices-grid"
            rowHeight={100}
            onLayoutChange={props.onUpdateLayout}
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 8, md: 6, sm: 4, xs: 4, xxs: 2 }}
        >
            {widgets}
        </ResponsiveReactGridLayout >
    );
}

Page.propTypes = {
    editMode: PropTypes.bool.isRequired,
    devices: PropTypes.arrayOf(PropTypes.object).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        layout: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
        deviceId: PropTypes.string,
    })).isRequired,
    onUpdateLayout: PropTypes.func.isRequired,
    onRemoveWidget: PropTypes.func.isRequired,
};
