import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

function Auth(props){
    let user = null;
    if(sessionStorage.getItem('user')){
        user = JSON.parse(sessionStorage.getItem('user'));
    }else{
        return(
            <Redirect to="/login" />
        )
    }

    return(
        <div>

            {
            user.signedin && props.data === 'login' ? <Redirect to="/" />
            :
            user.signedin && props.data === 'register' ? <Redirect to="/" />
            :
            user.signedin && user.job === 'admin' ? '' 
            : 
            user.signedin && props.data === 'results' ? ''
            :
            user.signedin && user.job !== 'admin' ? <Redirect to="/" /> 
            : 
            <Redirect to="/login" />
            }

        </div>
    )

} // end of component

function mapStateToProps(state){
    return{
        user : state.user,
    }
}

export default connect(mapStateToProps)(Auth);