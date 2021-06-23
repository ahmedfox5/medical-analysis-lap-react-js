import React from 'react';
import './Blog.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faCalendarAlt} from '@fortawesome/fontawesome-free-regular';
import {faArrowRight } from '@fortawesome/fontawesome-free-solid';
import {connect} from 'react-redux';

function Blog (props){
    const text_dir = props.locale === "en" ? "text-left" : "text-right";
    return(
        <div className={'col-md-4 p-3 '} >
            <div>
                <img className={'w-100'} src={'/imgs/' + props.img} alt='' />
                <div className={text_dir + ' pt-2 blog-content'} >
                    <p>
                        <FontAwesomeIcon icon={faCalendarAlt} /> NOV ,8 ,2020
                        <FontAwesomeIcon className={'ml-3'} icon={faUser} /> ADMIN
                    </p>
                    <h5>Title Of Single Post With image</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inven architecto natus commodi delectus omnis doloribus.
                    </p>
                    <a href='#' >
                        Read More
                        <FontAwesomeIcon className={'ml-2'}  icon={faArrowRight} />
                    </a>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale,
    }
}

export default connect(mapStateToProps)(Blog);