import React from 'react';
import {connect} from 'react-redux';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {getUsers} from './../../../api/users';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faClipboardList } from '@fortawesome/fontawesome-free-solid';
import Auth from './../../components/auth';

class DUsers extends React.Component{

    state = {
        users : [
            {
                id:1,
                first_name : '',
                last_name : '',
                email : '',
                phone : ''
            }
        ]
    }

    componentDidMount(){
        this.props.setPage();
        this.props.startLoading();
        getUsers().then(response => {
           if(response.data.success){
               this.setState({
                   users : response.data.users,
               });
           } else{
               this.props.serverError();
           }
        }).then(()=>{
            this.props.stopLoading();
        });
    }
    render() {
        let counter = 0;
        const users = this.state.users.map(user => {
            if(user.id != 1){
                counter++;
                return (
                    <tr key={user.id}>
                        <th scope="row">{counter}</th>
                        <td>{user.first_name + " " + user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <Link to={'/dashboard/user-results/' + user.id} ><button className={'dash dash-success'}> <FontAwesomeIcon icon={faClipboardList} /> Results</button></Link>
                            <button  className={'dash dash-danger'}> <FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                        </td>
                    </tr>
                );
            }
        });
        return(
            <div className={'dashboard p-4'}>
                <Auth/>
                <h4>Users</h4>
                <br/>

                <table className="table">
                    <thead className="thead-set">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type:'SETPAGE' ,data:'dashboard'}),
        startLoading : () => dispatch(startLoading),
        stopLoading : () => dispatch(stopLoading),
        serverError : () => dispatch(serverError),
    }
}

export default connect(null ,mapDispatchToProps)(DUsers);