import React ,{Component} from 'react';
import './Blogs.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Blog from './../components/Blog';


class Blogs extends Component{
    componentDidMount(){
        this.props.setPage();
    }
    render(){
        const text_dir = this.props.locale === "en" ? "text-left" : "text-right";
        console.log(this.props.match);
        return(
            <div>
                <header className={'blogs-header p-5'}>
                    <div className={'row align-items-center'} style={{height : "100%"}} >
                        <div className={'header-content col-md-6'} >
                            <h1>{this.props.nav_lang.blogs}</h1>
                        </div>
                        <div className={'header-content col-md-6'} >
                            <Link to="/" >{this.props.nav_lang.home}</Link> / {this.props.nav_lang.blogs}
                        </div>
                    </div>
                </header>

                <br/>

                <div className={'row pl-md-5 pr-md-5 justify-content-center '} >
                    <Blog img='blog1.jpg' />
                    <Blog img='blog2.jpg' />
                    <Blog img='blog3.jpg' />

                    <Blog img='blog1.jpg' />
                    <Blog img='blog2.jpg' />
                    <Blog img='blog3.jpg' />

                    <Blog img='blog1.jpg' />
                    <Blog img='blog2.jpg' />
                    <Blog img='blog3.jpg' />    
                </div>
            </div>
        );
    }
} 

function mapStateToProps(state){
    return{
        nav_lang : state.lang.nav
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'home'}),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Blogs);
