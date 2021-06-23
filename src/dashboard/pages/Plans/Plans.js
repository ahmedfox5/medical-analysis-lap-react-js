import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getPlans ,deletePlane} from './../../../api/plans';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import Auth from './../../components/auth';

class DPlans extends React.Component{

    state = {
        plans : [
            {
                id : 1,
                title : "",
                price : ""
            }
        ]
    }

    componentDidMount(){
        this.props.setPage();

        this.props.startLoading();
        getPlans().then(response => {
            if(response.data.success){
                this.setState({
                    plans : response.data.plans,
                });
            }else{
                this.props.serverError();
            }
        }).then(()=>{
            this.props.stopLoading();
        });
    }
    render() {

        let counter = 0;
        const plans = this.state.plans.map(plan => {
            counter++;
            return (
                <tr key={plan.id}>
                    <th scope="row">{counter}</th>
                    <td>{plan.title}</td>
                    <td>{plan.price}$</td>
                    <td>
                        <Link to={'/dashboard/plans/edit/' + plan.id} ><button className={'dash dash-success'}> <FontAwesomeIcon icon={ faEdit} /> Edit</button></Link>
                        <button onClick={()=>{this.deletePlane(plan)}} className={'dash dash-danger'}> <FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                    </td>
                </tr>
            )
        });

        return(
            <div className={'dashboard p-4'}>
                <Auth />
                <h4>Plans </h4>
                <br/>
                <div className={'row mt-3 mb-3'}>
                    <Link exact className={'dash dash-primary m-0'} exact to='/dashboard/plans/create'> <FontAwesomeIcon icon={faPlus} /> Create</Link>
                </div>
                <table className="table">
                    <thead className="thead-set">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {plans}

                    </tbody>
                </table>
            </div>
        )
    }

    deletePlane = (plan) => {
        this.props.startLoading();
        deletePlane(plan.id).then(response=>{
            if(response.data.success){
                const plans = [...this.state.plans];
                const index = plans.indexOf(plan);
                plans.splice(index ,1);
                this.setState({
                    plans : plans
                });
            }else{
                this.props.serverError();
            }
        }).then(()=>{
            this.props.stopLoading();
        });
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type:'SETPAGE' ,data:'dashboard'}),
        startLoading : () => dispatch(startLoading),
        stopLoading : () => dispatch(stopLoading),
        serverError : ()=>dispatch(serverError),
    }
}

export default connect(null ,mapDispatchToProps)(DPlans);