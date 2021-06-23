import React from 'react';
import './HowItWorks.js';
import {connect} from 'react-redux';

function HowItWorks (props){
    const lang = props.howItWorks_lang;
    return(
        <div>
            <h3 className={'text-center'} >{lang.title}</h3>
            <div className={'row justify-content-center text-center'} >
                <div className={'col-md-3 p-3 m-2 border '} >
                    <img style={{width:'70px'}} className={'m-2'} src='/imgs/how1.png' alt='' />
                    <h5>{lang.getResult.title}</h5>
                    <p>{lang.getResult.description}</p>
                </div>
                <div className={'col-md-3 p-3 m-2 border '} >
                    <img style={{width:'70px'}} className={'m-2'} src='/imgs/how2.png' alt='' />
                    <h5>{lang.getResult.title}</h5>
                    <p>{lang.getResult.description}</p>
                </div>
                <div className={'col-md-3 p-3 m-2 border '} >
                    <img style={{width:'70px'}} className={'m-2'} src='/imgs/how3.png' alt='' />
                    <h5>{lang.getResult.title}</h5>
                    <p>{lang.getResult.description}</p>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        howItWorks_lang : state.lang.home.howItWorks,
    }
}

export default connect(mapStateToProps)(HowItWorks);
