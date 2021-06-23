import React from 'react';
import './FromOurBlogs.css';
import {connect} from 'react-redux';
import Blog from './../components/Blog';

function FromOurBlogs(props){
    const text_dir = props.locale === 'en'?"text-left":"text-right";
    return(
        <div>
            <h3>From Our Blogs</h3>
            <p>Checkout Our last updates</p>
            <div className={'row pl-md-5 pr-md-5 justify-content-center '} >
                <Blog text_dir={text_dir} img='blog1.jpg' />
                <Blog text_dir={text_dir} img='blog2.jpg' />
                <Blog text_dir={text_dir} img='blog3.jpg' />
            </div>
            <br/>
            <button>View All</button>
        </div>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale
    }
}

export default connect(mapStateToProps)(FromOurBlogs);