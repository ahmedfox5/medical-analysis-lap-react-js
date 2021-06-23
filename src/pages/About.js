import React ,{Component} from 'react';
import './About.css';
import {Link} from 'react-router-dom';
import AboutTemplate from './../components/AboutTemplate';
import Statistics from './../components/Statistics';
import ClientsOpenions from './../components/ClientsOpenions';
import {connect} from 'react-redux';


class About extends Component{
    componentDidMount(){
        this.props.setPage();
    }
    render(){
        const text_dir = this.props.locale === "en" ? "text-left" : "text-right";
        return(
            <div>
                <header className={'about-header p-5'}>
                    <div className={'row align-items-center'} style={{height : "100%"}} >
                        <div className={'header-content col-md-6'} >
                            <h1>{this.props.nav_lang.about}</h1>
                        </div>
                        <div className={'header-content col-md-6'} >
                            <Link to="/" >{this.props.nav_lang.home}</Link> / {this.props.nav_lang.about}
                        </div>
                    </div>
                </header>
                <br/>
                <div>
                    <AboutTemplate img='blog3.jpg' />
                    <AboutTemplate order img='blog1.jpg' />
                    <br/>
                    <Statistics />
                    <br/>
                    <ClientsOpenions />
                </div>
            </div>
        );
    }
} 

function mapStateToProps(state){
    return{
        locale : state.locale,
        nav_lang : state.lang.nav
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'home'}),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(About);
