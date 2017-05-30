import React from 'react';
import moment from 'moment';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick = () => {
        this.setState({date: new Date()});
    };

    render() {
        let value = moment(this.state.date);

        return (
            <div>
                <h1>{ value.format('MMMM Do YYYY') }</h1>
                <h2 className="widget-value">{ value.format('HH:mm') }</h2>
            </div>
        )
    }
}