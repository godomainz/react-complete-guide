import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from "../../../store/actions/index";


interface Props {
    onLogout:()=>void;
}

class Logout extends Component<Props> {

    componentDidMount() {
        this.props.onLogout();
    }

    render(){
        return (
            <Redirect to="/" />
        )
    }
    
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
  }

export default connect(null, mapDispatchToProps)(Logout);