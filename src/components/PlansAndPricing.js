import { faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './PlansAndPricing.css';
import {connect} from 'react-redux';


function PlansAndPricing (props){
    const text_dir = props.locale === "en" ? "text-left" : "text-right";

    const plans = props.plans.map(plan => {
        let counter = 0;
        let sections = plan.sections.map(section => {
            if(section.active == 1){
                counter++;
                return(
                    <div key={section.id} className={'row align-items-center'} >
                        <FontAwesomeIcon className={'col-2'} icon={faCheck} className={'plane-check'} />
                        <p className={'col-10 m-0'} >{section.title}</p>
                    </div>
                );
            }else{
                return(
                    <div className={'row align-items-center'} >
                        <FontAwesomeIcon className={'col-2'} icon={faTimes} className={'plane-cross'} />
                        <p className={'col-10 m-0'} >{section.title}</p>
                    </div>
                );
            }
        });
        let borderStyle = ' border ';
        if(counter == plan.sections.length){
            borderStyle = ' middle-plane ';
        }
        return (
            <div key={plan.id} className={ text_dir + borderStyle + ' col-md-3 m-2 p-3 '} >
                <h5>{plan.title}</h5>
                <br/>
                <ul className={'plane-ul'}>
                    <li>
                        {sections}
                    </li>
                    <br/>
                    <h1 className={'text-center font-weight-bolder'}>{plan.price}$</h1>
                </ul>
            </div>
        );
    });

    return(
        <div>
            <h3>{props.plans_lang.title}</h3>
            
            <div className={' row justify-content-center'} >

                {plans}

            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale,
        plans_lang : state.lang.plansAndPricing
    }
}

export default connect(mapStateToProps)(PlansAndPricing);