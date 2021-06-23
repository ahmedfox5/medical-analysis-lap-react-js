import React ,{useEffect ,useState} from 'react';
import {connect} from 'react-redux';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {Formik ,Field ,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { getPlane, editPlan } from './../../../api/plans';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/fontawesome-free-solid';
import {useAlert} from 'react-alert';
import Auth from './../../components/auth';

function EditPlane(props){
    const alert = useAlert();
    const[counter ,setCounter] = useState(2);
    const[inputsList,setInputsList] = useState([{name:'section1',value:null ,active:null}]);
    const [sections,setSections] = useState([{
        id:1,
        active:0,
        title:""
    }]);
    const sectionInputs = inputsList.map(input=>{
        return (
            <div className={'row align-items-center pb-4'}>
                <div className={'row col-10 align-items-center'} >
                    <label>Section of the plan</label>
                    <div className={'row align-items-center w-100 p-0 m-0'} >
                        <div className={'col-9 p-0'}>
                            <Field className={'form-field w-100 section'} onChange={(e)=>{
                                const inputs = [...inputsList];
                                const index = inputs.indexOf(input);
                                inputs[index].value = e.target.value;
                                setInputsList(inputs);
                            }} value={input.value} name={input.name} placeholder='Section of the plan' />
                        </div>
                        <div className={'col-3'}>

                            {input.active == 1? <input type='checkbox' onChange={(e)=>{
                                const inputs = [...inputsList];
                                const index = inputs.indexOf(input);
                                if(e.target.checked){
                                    inputs[index].active = 1;
                                }else{
                                    inputs[index].active = 0;
                                }
                                setInputsList(inputs);
                            }} checked='true'  name={'C' + input.name} id={input.name} className={'m-2'} /> : 
                            
                            <input type='checkbox' onChange={(e)=>{
                                const inputs = [...inputsList];
                                const index = inputs.indexOf(input);
                                if(e.target.checked){
                                    inputs[index].active = 1;
                                }else{
                                    inputs[index].active = 0;
                                }
                                setInputsList(inputs);
                            }}  name={'C' + input.name} id={input.name} className={'m-2'} />}
                            
                            <label for={input.name} > Available</label> 
                        </div>
                    </div>
                    {input.name === 'section1'? <p><ErrorMessage name={input.name} /></p> : null}
                </div>
                <div className={'col-2'}>
                    {/* delete section input */}
                    {
                        input.name === 'section1'?null:<button onClick={(e)=>{
                            e.preventDefault();
                            const inputs = [...inputsList];
                            const index = inputs.indexOf(input);
                            inputs.splice(index ,1);
                            setInputsList(inputs);
                        }} className={'dash dash-danger'} ><FontAwesomeIcon icon={faTimes} /></button>
                    }
                </div>
            </div>
        )
    });
    const[plan,setPlan] = useState({
        title:'',
        price:'',
        sections : [
            {
                id:1,
                title:'',
                active:1
            }
        ]
    });
    useEffect(()=>{
        props.setPage();
        props.startLoading();
        getPlane(props.match.params.id).then(response => {
            if(response.data.success){
                setPlan(response.data.plan);
                let sectionsArr = [];
                const theSections = response.data.plan.sections;
                let counter = 0;
                for (let i = 0; i < theSections.length; i++) {
                    counter++;
                    sectionsArr.push({
                        name:'sectionE' + counter,
                        value : theSections[i].title,
                        active : theSections[i].active
                    });
                }
                setInputsList(sectionsArr);
            
            }else{
                props.serverError();
            }
        }).then(()=>{
            props.stopLoading();
        })
    },[]);
    return(
        <div className={'dashboard p-3'}>
            <Auth/>
            <h4>
                <Link to='/dashboard/plans'>Plans</Link> / Create Plans
            </h4>
            <br/><br/>
            <Formik 
                initialValues={{title:plan.title,price:plan.price ,section1:inputsList[0].value}}
                enableReinitialize={true}
                onSubmit={()=>{formSubmit(props , alert)}}
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

                                <div className={'border p-3 m-2'}>
                                    <h6>Plan Sections</h6>

                                    {sectionInputs}

                                    <div className={'row justify-content-end pt-3'}>
                                        {/* add section input */}
                                        <button onClick={(e)=>{
                                            e.preventDefault();
                                            setCounter(counter + 1);
                                            let inputs = [...inputsList];
                                            inputs.push({name:'section' + counter});
                                            setInputsList(inputs);
                                        }} className={'dash dash-primary'} ><FontAwesomeIcon icon={faPlus} /> Add section </button>
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

function formSubmit(props ,alert){
    props.startLoading();
    let formData = new FormData(document.getElementById('formData'));
    formData.append('id',props.match.params.id);
    editPlan(formData).then(response => {
        if(response.data.success){
            alert.success('Updated Successfuly :)');
        }else {
            window.alert('error!!');
        }
    }).then(()=>{
        props.stopLoading();
    });
}

function formSchema(){
    const schema = Yup.object().shape({
        title : Yup.string().required(),
        price : Yup.number().required(),
        section1 : Yup.string().required(),
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

export default connect(null ,mapDispatchToProps)(EditPlane);