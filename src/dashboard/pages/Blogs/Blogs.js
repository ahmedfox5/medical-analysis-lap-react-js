import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {serverError, startLoading ,stopLoading} from './../../../actions/actions';
import {deleteBlog ,getBlogs} from './../../../api/blogs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import Auth from './../../components/auth';

class DBlogs extends React.Component{
    state = {
        blogs : [
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

        getBlogs().then(response => {
            if(response.data.success){
                this.setState({
                    blogs : response.data.blogs
                });
                this.props.stopLoading();
            }else{
                this.props.serverError();
            }
        });
    }

    render() {
        let counter = 0;
        const blogs = this.state.blogs.map(blog => {
            counter++;
            return (
                <tr >
                    <th scope="row">{counter}</th>
                    <td>{blog.title}</td>
                    <td>
                        <img style={{width : '150px'}} src={this.props.url + 'imgs/blogs/' + blog.img} alt='' />
                    </td>
                    <td>
                        <Link to={'/dashboard/blogs/edit/' + blog.id} ><button className={'dash dash-success'}> <FontAwesomeIcon icon={faEdit} /> Edit</button></Link>
                        <button onClick={()=>{this.deleteBlog(blog)}} className={'dash dash-danger'}> <FontAwesomeIcon icon={faTrashAlt} /> Delete</button>
                    </td>
                </tr>
            )
        })
        return(
            <div className={'dashboard p-4'}>
                <Auth/>
                <h4>Blogs </h4>
                <br/>
                <div className={'row mt-3 mb-3'}>
                    <Link exact className={'dash dash-primary m-0'} exact to='/dashboard/blogs/create'> <FontAwesomeIcon icon={faPlus} /> Create</Link>
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
                        {blogs}
                    </tbody>
                    </table>

            </div>
        )
    }

    deleteBlog = (blog) => {
        this.props.startLoading();
        deleteBlog(blog.id).then(response=>{
            if(response.data.success){
                const blogs = [...this.state.blogs];
                const index = blogs.indexOf(blog);
                blogs.splice(index ,1);
                this.setState({
                    blogs : blogs
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

export default connect(mapStateToProps ,mapDispatchToProps)(DBlogs);