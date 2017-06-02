import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../../widgets/Widget';
import Clock from '../../widgets/Clock';
import Switch from '../../widgets/Switch';
import BinaryState from '../../widgets/BinaryState';
import ClimateState from '../../widgets/ClimateState';
import ColorControl from '../../widgets/ColorControl';
import Counter from '../../widgets/Counter';
import Dimmer from '../../widgets/Dimmer';
import { widgetTypes } from '../../dashboard';

const renderWidget = (config, device) => {
    const params = {
        device,
        config,
    };

    switch (config.type) {
    case widgetTypes.clock:
        return <Clock />;
    case widgetTypes.switch:
        return params.device ? <Switch {...params} /> : null;
    case widgetTypes.binaryState:
        return params.device ? <BinaryState {...params} /> : null;
    case widgetTypes.climate:
        return params.device ? <ClimateState {...params} /> : null;
    case widgetTypes.color:
        return params.device ? <ColorControl {...params} /> : null;
    case widgetTypes.counter:
        return params.device ? <Counter {...params} /> : null;
    case widgetTypes.dimmer:
        return params.device ? <Dimmer {...params} /> : null;
    default:
        return null;
    }
};

export default function PageItem(props) {
    return (
        <Widget
            type={props.widget.type.toLowerCase()}
            style={props.widget.style}
            isActive={props.device ? props.device.isActive : false}
            isEdit={props.editMode}
            onRemove={props.onRemove}
        >
            { renderWidget(props.widget, props.device) }
        </Widget>
    );
}

PageItem.propTypes = {
    device: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any,
        isActive: PropTypes.bool,
    }),
    widget: PropTypes.shape({
        type: PropTypes.string.isRequired,
        style: PropTypes.string,
    }).isRequired,
    editMode: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
};

PageItem.defaultProps = {
    device: null,
};
