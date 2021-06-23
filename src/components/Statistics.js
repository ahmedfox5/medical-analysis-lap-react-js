import React from 'react';
import './Statistics.css';
import {connect} from 'react-redux';

function Statistics (props){
    return(
        <div className={'statistics p-5 row border'}>
            <div className={'col-sm-6 col-md-3 p-3'} >
                <div className={'p-2 pt-5 pb-5 statistic'} >
                    <h1 className={'font-weight-bolder'} >2K</h1>
                    <br/>
                    <h6>{props.statistics.yearsOfExperiences}</h6>
                </div>
            </div>
            <div className={'col-sm-6 col-md-3 p-3'} >
                <div className={'p-2 pt-5 pb-5 statistic'} >
                    <h1 className={'font-weight-bolder'} >2K</h1>
                    <br/>
                    <h6>{props.statistics.deliveryBeforeTheDate}</h6>
                </div>
            </div>
            <div className={'col-sm-6 col-md-3 p-3'} >
                <div className={'p-2 pt-5 pb-5 statistic'} >
                    <h1 className={'font-weight-bolder'} >2K</h1>
                    <br/>
                    <h6>{props.statistics.ourDoctors}</h6>
                </div>
            </div>
            <div className={'col-sm-6 col-md-3 p-3'} >
                <div className={'p-2 pt-5 pb-5 statistic'} >
                    <h1 className={'font-weight-bolder'} >2K</h1>
                    <br/>
                    <h6>{props.statistics.clientsLoveOurWork}</h6>
                </div>
            </div>
        </div>
    ) ;
}

function mapStateToProps(state){
    return {
        "statistics" : state.lang.statistics
    }
}

export default connect(mapStateToProps)(Statistics);