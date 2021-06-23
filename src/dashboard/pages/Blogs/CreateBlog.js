import React ,{useEffect} from 'react';
import {connect} from 'react-redux';
import {serverError ,startLoading ,stopLoading} from './../../../actions/actions';
import {Formik ,Field ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { createBlog } from './../../../api/blogs';
import {Link} from 'react-router-dom';
import Auth from './../../components/auth';


function CreateBlog(props){
    useEffect(()=>{
        props.setPage();
    },[]);
    return(
        <div className={'dashboard p-3'}>
            <Auth />
            <h4>
                <Link to='/dashboard/blogs'>Blogs</Link> / Create Blog
            </h4>
            
            <br/><br/>
            <Formik 
                initialValues={{title:'',description:''}}
                enableReinitialize={true}
                onSubmit={()=>{formSubmit(props)}}
                validationSchema={formSchema}
                render={(formProps)=>{
                    return(
                        <form id='formData' onSubmit={formProps.handleSubmit} encType='multipart/form-data'>
                            <div className={'row align-items-center'} >
                                <label>Title of the Blog</label>
                                <Field className={'form-field w-100'} name='title' placeholder='Title of the blog' />
                                <p><ErrorMessage name='title' /></p>
                            </div>

                            <br/>

                            <div className={'row align-items-center'} >
                                <label>Description of the Blog</label>
                                <Field className={'form-field w-100'} name='description' as='textarea' rows='5' placeholder='Description of the blog' />
                                <p><ErrorMessage name='description' /></p>
                            </div>

                            <br/>

                            <div className={'row align-items-center'} >
                                <label>Image of the Blog</label>
                                <div className={'row w-100 align-items-center '} >
                                    <div className={'col-8 p-0'} >
                                        <input onChange={(event)=>{
                                            if(event.target.files && event.target.files[0]){
                                                let reader = new FileReader();
                                                reader.onload = function(e){
                                                    document.getElementById('imgPreview').src = e.target.result;
                                                }
                                                reader.readAsDataURL(event.target.files[0]);
                                            }
                                        }} className={'form-field w-100'} name='img' type='file' placeholder='Description of the about' />
                                    </div>
                                    <div className={'col-4'} >
                                        <img id={'imgPreview'} style={{width:"150px"}} src='/imgs/default.png' alt='' />
                                    </div>
                                </div>
                                <p id='imgError' style={{display:"none"}} >Error with the field of image</p>
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
    createBlog(formData).then(response => {
        if(response.data.success){
            props.history.push('/dashboard/blogs');
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
        description : Yup.string().required(),
    });
    return schema;
}

function mapDispatchToProps(dispatch){
    return{
        setPage : ()=>dispatch({type:'SETPAGE' ,data:'dashboard'}),
        startLoading : ()=>dispatch(startLoading),
        stopLoading : ()=>dispatch(stopLoading),
        serverError : () => dispatch(serverError),
    }
}

export default connect(null ,mapDispatchToProps)(CreateBlog);