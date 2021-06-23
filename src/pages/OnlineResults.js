import React from 'react';
import {connect} from 'react-redux';
import {startLoading ,stopLoading ,serverError} from './../actions/actions';
import {getUser} from './../api/users';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDownload ,faFilePdf } from '@fortawesome/fontawesome-free-solid';
import {Redirect} from 'react-router';

class OnlineResults extends React.Component{

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
        if(sessionStorage.getItem('user')){
            this.props.startLoading();
            getUser(JSON.parse(sessionStorage.getItem('user')).data.id).then(response => {
                if(response.data.success){
                    this.setState({
                        user : response.data.user,
                    });
                }else{
                    this.props.serverError();
                }
             }).then(()=>{
                 this.props.stopLoading();
             });
        }
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
                    </td>
                </tr>
            );

        });
        return(
            <div className={'p-4'}>
                <h4>Results</h4>

                {!sessionStorage.getItem('user') ? <Redirect to="/login" /> : null}

                <p className={'text-left p-0 m-0 mt-1'} >Name : {this.state.user.first_name + " " + this.state.user.last_name}</p>
                <p className={'text-left p-0 m-0 mt-1'} >Email : {this.state.user.email }</p>
                <p className={'text-left p-0 m-0 mt-1'} >Phone : {this.state.user.phone }</p>

                <br/>

                <table className="table">
                    <thead className="thead-set">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
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
        setPage : () => dispatch({type:'SETPAGE' ,data:'home'}),
        startLoading : () => dispatch(startLoading),
        stopLoading : () => dispatch(stopLoading),
        serverError : () => dispatch(serverError),
    }
}

function mapStateToProps(state){
    return{
        url:state.url,
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(OnlineResults);