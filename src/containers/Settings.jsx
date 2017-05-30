import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {config} from '../dashboard';
import DevicesGrid from "../DevicesGrid";

const mapStateToProps = (state) => {
    return {
        config: config
    }
};

class Settings extends React.Component {
    render() {
        const layout = this.props.config.map((item, idx) => {
            return {...item.layout, i: idx.toString(), static: false}
        });

        const layouts = {
            lg: layout,
            md: layout,
            sm: layout,
            xs: layout,
            xxs: layout
        };

        const widgets = config.map((item, idx) => {
            return <div key={idx.toString()}>Widget</div>
        });

        return (
            <DevicesGrid layouts={layouts} onDeviceClick={this.onSwitchClick}>
                {widgets}
            </DevicesGrid>
        )
    }
}

export default connect(mapStateToProps)(Settings);