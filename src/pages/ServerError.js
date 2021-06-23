import React, {useEffect} from 'react';
import {connect} from 'react-redux';

function ServerError(props){

    useEffect(() => {
        props.setPage();
    } ,[]);

    return(
        <div>
            <div className={'container text-left p-5'} >
                <h1 style={{color:'#ff2222'}} >
                    Server Error ! 
                    <br/>
                    :(
                </h1>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'login'}),
    }
}

export default  connect(null ,mapDispatchToProps)(ServerError);