import React from 'react';
import './BestService.css';
import {connect} from 'react-redux';


function BestService(props){
    const text_dir = props.locale === 'en'?'text-left':'text-right';
    const before_dir = props.locale === 'en'?'before-left':'before-right';
    return(
        <div>
            <h3>Best service for You</h3>
            <div className={'row p-2 pl-4 pr-4'} >
                <div className={'col-md-4 service-img '} >
                    <img src='/imgs/service1.jpg' alt='' />
                </div>
                <div className={'col-md-4 p-3 service-content'} >
                    <h1 className={text_dir + " " + before_dir}>01</h1>
                    <br/>
                    <h4 className={text_dir}>{props.services_lang.homeHealth.title}</h4>
                    <p className={text_dir}>
                        {props.services_lang.homeHealth.description}
                    </p>
                    <br/>
                </div>
                <div className={'col-md-4 service-img '} >
                    <img src='/imgs/service2.jpg' alt='' />
                </div>
            </div>

            <div className={'row p-2 pl-4 pr-4 '} >
                <div className={'col-md-4 p-3 service-content'} >
                    <h1 className={text_dir + " " + before_dir}>02</h1>
                    <br/>
                    <h4 className={text_dir}>{props.services_lang.acuteCare.title}</h4>
                    <p className={text_dir}>
                        {props.services_lang.acuteCare.description}
                    </p>
                    <br/>
                </div>

                <div className={'col-md-4 service-img '} >
                    <img src='/imgs/service3.jpg' alt='' />
                </div>

                <div className={'col-md-4 p-3 service-content'} >
                    <h1 className={text_dir + " " + before_dir}>03</h1>
                    <br/>
                    <h4 className={text_dir}>{props.services_lang.skilledWorkers.title}</h4>
                    <p className={text_dir}>
                        {props.services_lang.skilledWorkers.description}
                    </p>
                    <br/>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale,
        services_lang : state.lang.services
    }
}

export default connect(mapStateToProps)(BestService);