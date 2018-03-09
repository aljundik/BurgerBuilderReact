import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../../store/actions/auth';


class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }

    render(){
        return <Redirect to='/' />
    }
}

Logout.propTypes = {
    onLogout: PropTypes.func
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch(logout());
        }
    }
}

export default connect(null,mapDispatchToProps)(Logout);