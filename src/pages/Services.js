import React ,{Component} from 'react';
import './Services.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import BestService from './../components/BestService';
import HowItWorks from './../components/HowItWorks';
import PlansAndPricing from './../components/PlansAndPricing';
import {fullPlans} from './../api/plans';
import {serverError, startLoading, stopLoading} from './../actions/actions';


class Services extends Component{
    componentDidMount(){
        this.props.setPage();

        if(this.props.plans[0].id === 0){
            this.props.startLoading();
            fullPlans().then(response => {
                if(response.data.success){
                    this.props.setPlans(response.data.plans);
                }else{
                    this.props.serverError();
                }
                this.props.stopLoading();
            });
        }

    }
    render(){
        const text_dir = this.props.locale === "en" ? "text-left" : "text-right";
        return(
            <div>
                <header className={'services-header p-5'}>
                    <div className={'row align-items-center'} style={{height : "100%"}} >
                        <div className={'header-content col-md-6'} >
                            <h1>{this.props.nav_lang.services}</h1>
                        </div>
                        <div className={'header-content col-md-6'} >
                            <Link to="/" >{this.props.nav_lang.home}</Link> / {this.props.nav_lang.services}
                        </div>
                    </div>
                </header>
                <br/><br/>
                <BestService />
                <br/><br/>
                <HowItWorks />
                <br/><br/>
                <PlansAndPricing plans={this.props.plans} />
            </div>
        );
    }
} 

function mapStateToProps(state){
    return{
        nav_lang : state.lang.nav,
        plans : state.plans
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'home'}),
        setPlans: (plans) => dispatch({type : "SETPLANS" ,data : plans}),
        serverError : () => dispatch(serverError),
        startLoading : () => dispatch(startLoading),
        stopLoading : () => dispatch(stopLoading),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Services);
