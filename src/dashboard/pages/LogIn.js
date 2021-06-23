import React from 'react';
import {connect} from 'react-redux';
import {Formik ,Field ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import './LogIn.css';
import {Link} from 'react-router-dom';
import {login} from './../../api/users';
import {stopLoading ,startLoading} from './../../actions/actions';
import Auth from './../components/auth';

class LogIn extends React.Component{

    state={
        checked : false,
        logInError : false,
    }

    render(){
        return(
            <div>
                <Auth data='login' />
                <div className={'login-fa'}>
                    <Formik 
                        initialValues={{
                            email:'',
                            password:''
                        }}
                        enableReinitialize={true}
                        onSubmit={this.formSubmit}
                        validationSchema={this.formSchema}
                        render= {(formProps) => {
                            return(
                                <div className={'login-cont p-4'} >
                                    <form style={{border:'none'}} onSubmit={formProps.handleSubmit} >
                                        <h2 className={'font-weight-bolder text-center'} >Login</h2>
                                        <br/>
                                        <div className={'row m-3'} >
                                            {/* <label > Email / Phone number</label> */}
                                            <Field name='email' className={'form-field w-100'} placeholder='Email / Phone number' />
                                            <p style={{color:'#EA2027'}} ><ErrorMessage name='email'/></p>
                                        </div>

                                        <div className={'row m-3'} >
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

                                        {this.state.logInError?<p style={{color:'#ff2027'}} >Email or password is not correct</p>:null}
            

                                        <div className={'row m-3'} >
                                            <Field style={{background:"#7731FF",border:'none'}} className={'form-submit col-12'} type='submit' value='Login' />
                                        </div>


                                        <div className={'row m-3'} >
                                            <div className={'col-6 p-0 pr-2 row'} >
                                                <Link exact to='/register' style={{border:'1px solid #7731FF',textDecoration:'none',color:'#000'}} className={'form-submit col-12'} > Register </Link>
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
        login(values).then(response => {
            if(response.data.success){
                this.props.setUser(response.data.user);
                sessionStorage.setItem('user' ,JSON.stringify(response.data.user));
                this.props.history.push('/dashboard');
            }else{
                this.setState({
                    logInError : true,
                });
            }
        }).then(()=>{
            this.props.stopLoading();
        });
    }

    formSchema = () => {
        const schema = Yup.object().shape({
            email : Yup.string().required(),
            password : Yup.string().required()
        });

        return schema;
    }

}


function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type : "SETPAGE" ,data : 'login'}),
        startLoading : () => dispatch(startLoading),
        stopLoading : () => dispatch(stopLoading),
        setUser : (data) => dispatch({
            type : 'SETUSER',
            data : data,
        })
    }
}

export default connect(null ,mapDispatchToProps)(LogIn);