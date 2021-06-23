import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/fontawesome-free-solid';
import {Redirect} from 'react-router';


export default class LogOutBtn extends React.Component{
    render(){
        const redirects = ()=>{
                <Redirect to='/login' />
        }
        return(
            <div className={'LogOutBtn'}>
                
                {
                    sessionStorage.getItem('user')? <button onClick={()=>{
                            sessionStorage.clear();
                            window.location.href = '/login';
                        }} >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>:null
                }

            </div>
        )
    }
}
