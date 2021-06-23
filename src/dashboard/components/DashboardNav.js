import React from 'react';
import './DashboardNav.css';
import { useAlert } from "react-alert";
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faStethoscope , faUsers} from '@fortawesome/fontawesome-free-solid';
import { faAddressCard, faEdit, faMap } from '@fortawesome/fontawesome-free-regular';


function DashboardNav(){
    const alert = useAlert();
    return(
        <div className={'dashboard-nav'}>
            <h4>Dashboard</h4>
            <ul>
                <li>
                    <NavLink exact to='/dashboard' ><button> <FontAwesomeIcon icon={faHome} /> Home </button></NavLink>
                </li>

                <li>
                    <NavLink exact to='/dashboard/abouts' ><button> <FontAwesomeIcon icon={faAddressCard} /> Abouts  </button></NavLink>
                </li>

                <li>
                    <NavLink exact to='/dashboard/blogs' ><button> <FontAwesomeIcon icon={faEdit} /> Blogs</button></NavLink>
                </li>

                <li>
                    <NavLink exact to='/dashboard/doctors' ><button> <FontAwesomeIcon icon={faStethoscope} /> Doctors</button></NavLink>
                </li>

                <li>
                    <NavLink exact to='/dashboard/plans' ><button> <FontAwesomeIcon icon={faMap} /> Plans</button></NavLink>
                </li>

                <li>
                    <NavLink exact to='/dashboard/users' ><button> <FontAwesomeIcon icon={faUsers} /> Users</button></NavLink>
                </li>
            </ul>
        </div>
    )
}


export default DashboardNav;