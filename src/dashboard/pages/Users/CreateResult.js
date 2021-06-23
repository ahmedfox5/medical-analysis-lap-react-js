import React ,{useEffect} from 'react';
import {connect} from 'react-redux';
import {startLoading ,stopLoading} from './../../../actions/actions';
import {Formik ,Field ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { createResult } from './../../../api/users';
import {Link} from 'react-router-dom';
import Auth from './../../components/auth';

function CreateResult(props){
    useEffect(()=>{
        props.setPage();
    },[]);
    return(
        <div className={'dashboard p-3'}>
            <Auth />
            <h4>
                <Link to={'/dashboard/user-results/' + props.match.params.id}>Results</Link> / Create Result
            </h4>
            <br/><br/>
            <Formik 
                initialValues={{title:''}}
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
                                <label>File of the result</label>
                                <div className={'row w-100 align-items-center '} >
                                    <div className={'col-12 p-0'} >
                                        <input accept='.pdf' className={'form-field w-100'} name='file' type='file' />
                                    </div>
                                </div>
                                <p id='fileError' style={{display:"none"}} >Error with the field of file</p>
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
    formData.append('user_id' ,props.match.params.id);
    createResult(formData).then(response => {
        if(response.data.success){
            props.history.push('/dashboard/user-results/' + props.match.params.id);
        }else if(response.data.error){
            document.getElementById('fileError').style.display = 'block';
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
    });
    return schema;
}

function mapDispatchToProps(dispatch){
    return{
        setPage : ()=>dispatch({type:'SETPAGE' ,data:'dashboard'}),
        startLoading : ()=>dispatch(startLoading),
        stopLoading : ()=>dispatch(stopLoading),
        serverError : ()=>dispatch(stopLoading),
    }
}

export default connect(null ,mapDispatchToProps)(CreateResult);