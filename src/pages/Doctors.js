import React ,{Component} from 'react';
import './Doctors.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Employee from './../components/Employee';
class Doctors extends Component{
    componentDidMount(){
        this.props.setPage();
    }
    render(){
        const text_dir = this.props.locale === "en" ? "text-left" : "text-right";
        return(
            <div>
                <header className={'doctors-header p-5'}>
                    <div className={'row align-items-center'} style={{height : "100%"}} >
                        <div className={'header-content col-md-6'} >
                            <h1>{this.props.nav_lang.doctors}</h1>
                        </div>
                        <div className={'header-content col-md-6'} >
                            <Link to="/" >{this.props.nav_lang.home}</Link> / {this.props.nav_lang.doctors}
                        </div>
                    </div>
                </header>
                <div className={'p-5'} >
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam esse harum excepturi nesciunt officia, qui vel. Cupiditate modi voluptatibus perspiciatis in id ea fuga earum, voluptatum suscipit ad! Itaque autem praesentium nam, laborum sint nemo? Dolorum veniam sit quisquam dolore velit numquam vel nostrum ipsa nemo nisi quasi obcaecati fugit doloribus atque, quibusdam voluptas suscipit. Veritatis, vel at autem velit voluptate neque fuga consequuntur amet saepe nesciunt impedit est illum minus nulla ex atque omnis esse, doloribus magni
                    </p>
                </div>
                <br/>

                <Employee text_dir={text_dir} order img='emp1.jpg' />
                <Employee text_dir={text_dir} img='emp2.jpg' />
                <Employee text_dir={text_dir} order img='emp3.png' />
                <Employee text_dir={text_dir} img='emp4.png' />
                <Employee text_dir={text_dir} order img='emp5.jpg' />
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

export default connect(mapStateToProps ,mapDispatchToProps)(Doctors);
