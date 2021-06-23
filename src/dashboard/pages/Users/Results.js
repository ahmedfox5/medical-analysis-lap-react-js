import React from 'react';
import {connect} from 'react-redux';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {getUser} from './../../../api/users';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import {faDownload ,faFilePdf,faPlus, faUpload } from '@fortawesome/fontawesome-free-solid';
import {Link} from 'react-router-dom';
import Auth from './../../components/auth';

class Results extends React.Component{

    state = {
        user:{
            first_name:'',
            last_name:'',
            email:'',
            phone:'',
            results : [
                {
                    id:1,
                    name : '',
                    title : '',
                    time : '',
                    created_at:'',
                }
            ]
        }
    }

    componentDidMount(){
        this.props.setPage();
        this.props.startLoading();
        getUser(this.props.match.params.id).then(response => {
           if(response.data.success){
               this.setState({
                   user : response.data.user,
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
        const results = this.state.user.results.map(result => {
            counter++;
            let date = result.created_at.slice(0 ,10);            
            return (
                <tr key={result.id}>
                    <th scope="row">{counter}</th>
                    <td>{result.title}</td>
                    <td>{result.name}</td>
                    <td><FontAwesomeIcon style={{fontSize:'30px'}} icon={faFilePdf} /></td>
                    <td>{date}</td>
                    <td>
                        <a href={this.props.url + 'results/' + result.name} ><button className={'dash dash-success'}> <FontAwesomeIcon icon={faDownload} /> Download</button></a>
                        <button  className={'dash dash-danger'}> <FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                    </td>
                </tr>
            );

        });
        return(
            <div className={'dashboard p-4'}>
                <Auth />
                <h4>Results</h4>

                <p className={'text-left p-0 m-0 mt-1'} >Name : {this.state.user.first_name + " " + this.state.user.last_name}</p>
                <p className={'text-left p-0 m-0 mt-1'} >Email : {this.state.user.email }</p>
                <p className={'text-left p-0 m-0 mt-1'} >Phone : {this.state.user.phone }</p>

                <div className={'row mt-3 mb-3'}>
                    <Link exact className={'dash dash-primary m-0'} exact to={'/dashboard/result/create/' + this.props.match.params.id}> <FontAwesomeIcon icon={faUpload} /> Upload</Link>
                </div>
                <table className="table">
                    <thead className="thead-set">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Title</th>
                        <th scope="col">Type</th>
                        <th scope="col">Time</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results}
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
        serverError : () =>dispatch(serverError),
    }
}

function mapStateToProps(state){
    return{
        url:state.url,
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Results);