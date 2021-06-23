import React from 'react';
import {connect} from 'react-redux';
import Auth from './../components/auth';

class DashboardApp extends React.Component{
    componentDidMount(){
        this.props.setPage();
    }
    render() {
        return(
            <div className={'dashboard'}>
                <Auth />
                dashboard
                <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, ea. Fuga quos quae blanditiis sapiente a labore, reprehenderit odio aspernatur quia pariatur doloribus recusandae praesentium atque, explicabo officiis asperiores dignissimos corrupti possimus est repudiandae officia itaque veritatis obcaecati? Accusantium sapiente ullam dicta tempore ad natus quidem aspernatur commodi corrupti quia animi voluptates adipisci velit illo, explicabo obcaecati culpa tempora sint cum est, mollitia distinctio necessitatibus, quos veniam. Illo quo consequatur autem nisi illum. Non asperiores quos eveniet aperiam itaque! Dolores dignissimos quam alias error ratione molestiae ipsum. Ea, est eveniet.
                </p>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        setPage : () => dispatch({type:'SETPAGE' ,data:'dashboard'})
    }
}

export default connect(null ,mapDispatchToProps)(DashboardApp);