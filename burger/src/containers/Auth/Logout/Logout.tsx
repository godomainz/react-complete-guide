import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from "../../../store/actions/index";


interface Props {
    onLogout:()=>void;
}

const Logout = (props: Props) => {
    const { onLogout } = props;

    useEffect(() => {
        onLogout();
    },[onLogout] );

    return (
        <Redirect to="/" />
    )  
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
  }

export default connect(null, mapDispatchToProps)(Logout);