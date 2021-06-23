import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getAbouts ,deleteAbout} from './../../../api/abouts';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import Auth from './../../components/auth';

class DAbouts extends React.Component{
    state = {
        abouts : [
            {
                id: 1,
                title: "",
                img: "../default.png",
                description :""
            }
        ]
    }
    componentDidMount(){
        this.props.setPage();
        this.props.startLoading();

        getAbouts().then(response => {
            if(response.data.success){
                this.setState({
                    abouts : response.data.abouts
                });
                this.props.stopLoading();
            }else{
                this.props.serverError();
            }
        });
    }

    render() {
        let counter = 0;
        const abouts = this.state.abouts.map(about => {
            counter++;
            return (
                <tr key={about.id}>
                    <th scope="row">{counter}</th>
                    <td>{about.title}</td>
                    <td>
                        {about.img? <img style={{width : '150px'}} src={this.props.url + 'imgs/about/' + about.img} alt='' />:null}
                    </td>
                    <td>
                        <Link to={'/dashboard/abouts/edit/' + about.id} ><button className={'dash dash-success'}><FontAwesomeIcon icon={faEdit} /> Edit</button></Link>
                        <button onClick={()=>{this.deleteAbout(about)}} className={'dash dash-danger'}> <FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                    </td>
                </tr>
            )
        })
        return(
            <div className={'dashboard p-4'}>
                <Auth />
                <h4>About </h4>
                <div className={'row mt-3 mb-3'}>
                    <Link exact className={'dash dash-primary m-0'} exact to='/dashboard/abouts/create'> <FontAwesomeIcon icon={faPlus} /> Create</Link>
                </div>
                <table className="table">
                    <thead className="thead-set">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abouts}
                    </tbody>
                    </table>

            </div>
        )
    }


    deleteAbout = (about) => {
        this.props.startLoading();
        deleteAbout(about.id).then(response=>{
            if(response.data.success){
                const abouts = [...this.state.abouts];
                const index = abouts.indexOf(about);
                abouts.splice(index ,1);
                this.setState({
                    abouts : abouts
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
        serverError : () => dispatch(serverError),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(DAbouts);