import React ,{Component} from 'react';
import HomeHeader from './../components/HomeHeader';
import {connect} from 'react-redux';
import HowItWorks from './../components/HowItWorks';
import Statistics from './../components/Statistics';
import BestService from './../components/BestService';
import ClientsOpenions from './../components/ClientsOpenions';
import FromOurBlogs from './../components/FromOurBlogs';
import OurEmployees from './../components/OurEmployees';



class Home extends Component{
    componentDidMount(){
        this.props.setPage();
    }
    render(){
        return(
            <div>
                <HomeHeader locale={this.props.locale} header_lang={this.props.home_lang.header} />
                <br/><br/>
                <HowItWorks />
                <br/><br/>
                <Statistics />
                <br/><br/>
                <BestService />
                <br/><br/>
                <ClientsOpenions />
                <br/><br/>
                <FromOurBlogs />
                <br/><br/>
                <OurEmployees />
            </div>
        );
    }
}


function mapStateToProps(state){

    return{
        locale : state.locale,
        home_lang:state.lang.home
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'home'}),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Home);
