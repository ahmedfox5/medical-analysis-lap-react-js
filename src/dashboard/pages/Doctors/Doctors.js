import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getDoctors ,deleteDoctor} from './../../../api/doctors';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import Auth from './../../components/auth';


class DDoctors extends React.Component{
    state = {
        doctors : [
            {
                id: 1,
                name: "",
                job: "",
                img: "../default.png",
                description :""
            }
        ]
    }
    componentDidMount(){
        this.props.setPage();
        this.props.startLoading();

        getDoctors().then(response => {
            if(response.data.success){
                this.setState({
                    doctors : response.data.doctors
                });
                this.props.stopLoading();
            }else{
                this.props.serverError();
            }
        });
    }

    render() {
        let counter = 0;
        const doctors = this.state.doctors.map(doctor => {
            counter++;
            return (
                <tr >
                    <th scope="row">{counter}</th>
                    <td>{doctor.name}</td>
                    <td>{doctor.job}</td>
                    <td>
                        <img style={{width : '150px'}} src={this.props.url + 'imgs/doctors/' + doctor.img} alt='' />
                    </td>
                    <td>
                        <Link to={'/dashboard/doctors/edit/' + doctor.id} ><button className={'dash dash-success'}><FontAwesomeIcon icon={faTrashAlt} /> Edit</button></Link>
                        <button onClick={()=>{this.deleteDoctor(doctor)}} className={'dash dash-danger'}><FontAwesomeIcon icon={faEdit} /> Delete</button>
                    </td>
                </tr>
            )
        })
        return(
            <div className={'dashboard p-4'}>
                <Auth/>
                <h4>Doctors </h4>
                <br/>
                <div className={'row mt-3 mb-3'}>
                    <Link exact className={'dash dash-primary m-0'} exact to='/dashboard/doctors/create'><FontAwesomeIcon icon={faPlus} /> Create</Link>
                </div>
                <table className="table">
                    <thead className="thead-set">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Job</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors}
                    </tbody>
                    </table>

            </div>
        )
    }

    deleteDoctor = (doctor) => {
        this.props.startLoading();
        deleteDoctor(doctor.id).then(response=>{
            if(response.data.success){
                const doctors = [...this.state.doctors];
                const index = doctors.indexOf(doctor);
                doctors.splice(index ,1);
                this.setState({
                    doctors : doctors
                });
            }else{
                this.props.serverError();
            }
            this.props.stopLoading();
        });
    }

}

function mapStateToProps(state) {
    return{
        url : state.url,
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

export default connect(mapStateToProps ,mapDispatchToProps)(DDoctors);