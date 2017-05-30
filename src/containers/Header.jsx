import { connect } from 'react-redux';

import { refreshDevices } from '../actions';
import Header from '../components/Header';

const mapStateToProps = state => ({
    isRefreshing: state.deviceLoading,
});

const mapDispatchToProps = dispatch => ({
    onRefresh: () => {
        dispatch(refreshDevices());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
