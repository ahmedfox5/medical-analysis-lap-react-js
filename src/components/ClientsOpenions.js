import React ,{Component ,useEffect} from 'react';
import './ClientsOpenions.css';
import {connect} from 'react-redux';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

function ClientsOpenions (props){

    useEffect(()=>{
        new Swiper('.swiper-container');
    },[]);

    return (
        <div className={'clientsOpenions'} >
            <h3>Clients Openions</h3>
            <div className={'row align-items-center p-5'} >
                <div className={'col-md-6'} >
                    <img src='/imgs/client.png' alt='' />
                </div>
                <div className={'col-md-6'} >
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quo rerum ipsa dolorem quos consequuntur maxime voluptates iure ab animi sequi ea libero ut numquam voluptatibus rem eligendi cupiditate voluptas, ad adipisci necessitatibus iusto, velit dignissimos sint? Est rem voluptatem praesentium id cum illo. Doloribus reiciendis unde animi magnam perferendis.</p>
                                <h5>Ahmed Ali</h5>

                            </div>
                            <div className="swiper-slide">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quo rerum ipsa dolorem quos consequuntur maxime voluptates iure ab animi sequi ea libero ut numquam voluptatibus rem eligendi cupiditate voluptas, ad adipisci necessitatibus iusto, velit dignissimos sint? Est rem voluptatem praesentium id cum illo. Doloribus reiciendis unde animi magnam perferendis.</p>
                                <h5>Ahmed Ali</h5>

                            </div>
                            <div className="swiper-slide">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quo rerum ipsa dolorem quos consequuntur maxime voluptates iure ab animi sequi ea libero ut numquam voluptatibus rem eligendi cupiditate voluptas, ad adipisci necessitatibus iusto, velit dignissimos sint? Est rem voluptatem praesentium id cum illo. Doloribus reiciendis unde animi magnam perferendis.</p>
                                <h5>Ahmed Ali</h5>

                            </div>
                            <div className="swiper-slide">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quo rerum ipsa dolorem quos consequuntur maxime voluptates iure ab animi sequi ea libero ut numquam voluptatibus rem eligendi cupiditate voluptas, ad adipisci necessitatibus iusto, velit dignissimos sint? Est rem voluptatem praesentium id cum illo. Doloribus reiciendis unde animi magnam perferendis.</p>
                                <h5>Ahmed Ali</h5>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(ClientsOpenions);