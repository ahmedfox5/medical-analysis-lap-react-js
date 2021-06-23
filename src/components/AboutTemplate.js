import React from 'react';
import {connect} from 'react-redux';

function AboutTemplate (props){
    const order = props.order ? "order-md-first" : "";
    const text_dir = props.locale === "en" ? "text-left" : "text-right";
    return(
        <div className={'row p-4 align-items-center'} >
            <div className={'col-md-6'} >
                <div className={props.text_dir + " p-4"}>
                    <h5 className={text_dir}>title of about template</h5>
                    <p className={text_dir}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam esse harum excepturi nesciunt officia, qui vel. Cupiditate modi voluptatibus perspiciatis in id ea fuga earum, voluptatum suscipit ad! Itaque autem praesentium nam, laborum sint nemo? Dolorum veniam sit quisquam dolore velit numquam vel nostrum ipsa nemo nisi quasi obcaecati fugit doloribus atque, quibusdam voluptas suscipit. Veritatis, vel at autem velit voluptate neque fuga consequuntur amet saepe nesciunt impedit est illum minus nulla ex atque omnis esse, doloribus magni itaque molestiae. Pariatur ex veritatis porro, distinctio labore error. Similique, fuga! Est.
                    </p>
                </div>
            </div>
            <div className={order + ' col-md-6'} >
                <img className={'w-100'} src={'/imgs/' + props.img} alt='' />
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale,
    }
}
export default connect(mapStateToProps)(AboutTemplate);