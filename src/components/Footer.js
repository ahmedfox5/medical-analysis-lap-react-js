import React ,{useEffect} from 'react';
import './Footer.css';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleUp, faArrowRight} from '@fortawesome/fontawesome-free-solid';
import {Link} from 'react-router-dom';

function Footer (props){
    const text_dir = props.locale === 'en' ? "text-left" : "text-right";
    
    useEffect(()=>{
        function showGoUp(){
            if(document.getElementById('goTop')){
                if(window.scrollY > 50){
                    document.getElementById('goTop').style.display = "block";
                }else{
                    document.getElementById('goTop').style.display = "none";
                }
            }
        }
        showGoUp();
        window.onscroll = showGoUp;
        document.getElementById('goTop').onclick = function(){
            window.scrollTo(0 ,0);
        }
    },[]);

    return(
        <footer className={'Footer pt-4 mt-5'} >
            <div className={'footer-content'} >
                <div className={ text_dir + ' row '} >
                    <div className={'col-md-4 p-5 '} >
                        <h6>ADDRESS</h6>
                        <br/>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem amet molestias assumenda odio praesentium autem ea ipsum ipsam temporibus!Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem ipsam temporibus!
                        </p>
                    </div>
                    <div className={'col-md-4 p-5 PRACTICEAREA '} >
                        <h6>PRACTICE AREA</h6>
                        <br/>
                        <a href='#' >Our services <FontAwesomeIcon className={'ml-2'} icon={faArrowRight} /></a>
                        <Link exact to='/online-results' >Online Results <FontAwesomeIcon className={'ml-2'} icon={faArrowRight} /></Link>
                        <a href='#' >Account Settings <FontAwesomeIcon className={'ml-2'} icon={faArrowRight} /></a>
                        <a href='#' >Price plans <FontAwesomeIcon className={'ml-2'} icon={faArrowRight} /></a>
                        <a href='#' >Contact Us <FontAwesomeIcon className={'ml-2'} icon={faArrowRight} /></a>
                    </div>
                    <div className={'col-md-4 p-5 '} >
                        <h6>BUSINESS HOURS</h6>
                        <br/>
                        <p>
                        Lorem ipsum dolor sit amet <br/> consectetur adipisicing elit.<br/><br/> Reprehenderit dolorem amet molestias <br/> assumenda odio praesentium <br/> autem ea ipsum ipsam temporibus!
                        </p>
                    </div>
                </div>
                <div className={' footer-footer p-4 mt-2'} >
                    <h6>&copy;All Copyrights resevied for <span>Medical Analysis Lap</span> 2021</h6>
                </div>
                <button id='goTop' ><FontAwesomeIcon icon={faAngleUp} /></button>
            </div>
        </footer>
    )
}

function mapStateToProps(state){
    return{
        locale : state.locale,
    }
}
export default connect(mapStateToProps)(Footer);