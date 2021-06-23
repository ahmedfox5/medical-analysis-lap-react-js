import React from 'react';
import {connect} from 'react-redux';
import {Formik ,Field ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './LogIn.css';
import {Link} from 'react-router-dom';
import {register} from './../../api/users';
import {startLoading ,stopLoading} from './../../actions/actions';

class Register extends React.Component{

    state={
        checked:false,
        errors:{
            email:null,
            phone:null
        }
    }

    render(){
        return(
            <div>
                <div className={'login-fa'}>
                    <Formik 
                        initialValues={{
                            email:'',
                            password:'',
                            firstName:'',
                            lastName:'',
                            phone:''
                        }}
                        enableReinitialize={true}
                        onSubmit={this.formSubmit}
                        validationSchema={this.formSchema}
                        render= {(formProps) => {
                            return(
                                <div className={'login-cont'} >
                                    <form style={{border:'none'}} onSubmit={formProps.handleSubmit} >
                                        <h2 className={'font-weight-bolder text-center'} >Register</h2>


                                        <div className={'row m-2'} >
                                            {/* <label > Email / Phone number</label> */}
                                            <Field name='firstName' className={'form-field w-100'} placeholder='First Name' />
                                            <p style={{color:'#EA2027'}} ><ErrorMessage name='firstName'/></p>
                                        </div>


                                        <div className={'row m-2'} >
                                            {/* <label > Email / Phone number</label> */}
                                            <Field name='lastName' className={'form-field w-100'} placeholder='Last Name' />
                                            <p style={{color:'#EA2027'}} ><ErrorMessage name='lastName'/></p>
                                        </div>


                                        <div className={'row m-2'} >
                                            {/* <label > Email / Phone number</label> */}
                                            <Field name='email' className={'form-field w-100'} placeholder='Email / Phone number' />
                                            <p style={{color:'#EA2027'}} ><ErrorMessage name='email'/></p>
                                        </div>

                                        <div className={'row m-2'} >
                                            {/* <label > Email / Phone number</label> */}
                                            <Field name='phone' className={'form-field w-100'} placeholder='Phone number' />
                                            <p style={{color:'#EA2027'}} ><ErrorMessage name='phone'/></p>
                                        </div>

                                        <div className={'row m-2'} >
                                            {/* <label > Password</label> */}
                                            <Field name='password' type={this.state.checked?'text':'password'} className={'form-field w-100'} placeholder='Password' />
                                            <p style={{color:'#EA2027'}} ><ErrorMessage name='password'/></p>
                                        </div>

                                        <div className={'row m-3'} >
                                            <input type='checkbox' onChange={()=>{
                                                const checked = this.state.checked;
                                                this.setState({
                                                    checked:!checked
                                                });
                                            }} className={'m-1'} id='chBox' />
                                            <label for='chBox' > Show Password</label>
                                        </div>

                                        {this.state.errors.email?<p style={{color:'#cc3333'}}>{this.state.errors.email}</p>:null}
                                        {this.state.errors.phone?<p style={{color:'#cc3333'}}>{this.state.errors.phone}</p>:null}

            

                                        <div className={'row m-3'} >
                                            <Field style={{background:"#7731FF",border:'none'}} className={'form-submit col-12'} type='submit' value='Register' />
                                        </div>
                                    

                                        <div className={'row m-3'} >
                                            <div className={'col-6 p-0 pr-2 row'} >
                                                <Link exact to='/login' style={{border:'1px solid #7731FF',textDecoration:'none',color:'#000'}} className={'form-submit col-12'} > Login </Link>
                                            </div>
                                            <div className={'col-6 p-0 pl-2 row'} >
                                                <Link exact to='/' style={{border:'1px solid #7731FF',textDecoration:'none',color:'#000'}} className={'form-submit col-12'} > Home </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.props.setPage();
    }

    formSubmit = (values) => {
        this.props.startLoading();
        register(values).then(response => {
            if(response.data.success){
                window.alert('successfuly created');
                this.props.history.push('/login');
            }else{
                this.setState({
                    errors : response.data.errors
                });
            }
        }).then(()=>{
            this.props.stopLoading();
        });
    }

    formSchema = () => {
        const schema = Yup.object().shape({
            firstName : Yup.string().required(),
            lastName : Yup.string().required(),
            email : Yup.string().required(),
            password : Yup.string().required(),
            phone : Yup.number().required(),
        });
        return schema;
    }

}


function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'login'}),
        startLoading : () => dispatch(startLoading),
        stopLoading : () => dispatch(stopLoading),
    } 
}

export default connect(null ,mapDispatchToProps)(Register);
