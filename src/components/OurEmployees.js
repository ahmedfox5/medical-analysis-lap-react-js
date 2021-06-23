import React from 'react';
import {connect} from 'react-redux';
import Employee from './../components/Employee';
 
function OurEmployees (props){
    const text_dir = props.locale === 'en' ? "text-left" : "text-right";
    
    return(
        <div>
            <h3>Our Employees</h3>
            <Employee text_dir={text_dir} order img='emp1.jpg' />
            <Employee text_dir={text_dir} img='emp2.jpg' />
        </div>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale
    }
}

export default connect(mapStateToProps)(OurEmployees);