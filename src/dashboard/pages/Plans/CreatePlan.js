import React ,{useEffect} from 'react';
import {connect} from 'react-redux';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {Formik ,Field ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { createPlane } from './../../../api/plans';
import {Link} from 'react-router-dom';
import Auth from './../../components/auth';

function CreatePlan(props){
    useEffect(()=>{
        props.setPage();
    },[]);
    return(
        <div className={'dashboard p-3'}>
            <Auth />
            <h4>
                <Link to='/dashboard/plans'>Plans</Link> / Create Plans
            </h4>
            <br/><br/>
            <Formik 
                initialValues={{title:'',price:'' ,section1:''}}
                enableReinitialize={true}
                onSubmit={()=>{formSubmit(props)}}
                validationSchema={formSchema}
                render={(formProps)=>{
                    return(
                        <form id='formData' onSubmit={formProps.handleSubmit} encType='multipart/form-data'>
                            <div id='form_cont'>
                                <div className={'border p-3 m-2'}>
                                    <h6>Main Plane</h6>
                                    <div className={'row align-items-center'} >
                                        <label>Title of the plan</label>
                                        <Field className={'form-field w-100'} name='title' placeholder='Title of the plan' />
                                        <p><ErrorMessage name='title' /></p>
                                    </div>

                                    <br/>


                                    <div className={'row align-items-center'} >
                                        <label>Price of the plan</label>
                                        <Field className={'form-field w-100'} name='price' placeholder='Price of the plan' />
                                        <p><ErrorMessage name='price' /></p>
                                    </div>
                                </div>

                            </div>


                            <br/>

                            <Field className={'form-submit'} type='submit'  value='Submit' />
                        </form>
                    );
                }}
            />

        </div>
    )
}

function formSubmit(props){
    props.startLoading();
    let formData = new FormData(document.getElementById('formData'));
    createPlane(formData).then(response => {
        if(response.data.success){
            props.history.push('/dashboard/plans');
        }else if(response.data.error){
            document.getElementById('imgError').style.display = 'block';
        }else{
            props.serverError();
        }
    }).then(()=>{
        props.stopLoading();
    });
}

function formSchema(){
    const schema = Yup.object().shape({
        title : Yup.string().required(),
        price : Yup.number().required(),
    });
    return schema;
}

function mapDispatchToProps(dispatch){
    return{
        setPage : ()=>dispatch({type:'SETPAGE' ,data:'dashboard'}),
        startLoading : ()=>dispatch(startLoading),
        stopLoading : ()=>dispatch(stopLoading),
        serverError : ()=>dispatch(serverError),
    }
}

export default connect(null ,mapDispatchToProps)(CreatePlan);