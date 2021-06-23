import React ,{useEffect} from 'react';
import './nav.css';
import {NavLink} from 'react-router-dom';
import {ar ,en} from "./../actions/actions";
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone ,faEnvelope} from "@fortawesome/fontawesome-free-solid";
import {animator} from './../publicFunctions';


function NavBar (props){

    useEffect(()=>{
        var canvas = document.createElement('canvas');
        document.getElementById('logo_cont').appendChild(canvas);

        function setCanvasCoordinates(){
            canvas.width = 200;
            canvas.height = 70;
        }
        setCanvasCoordinates();

        var ctx = canvas.getContext("2d");
        var mouse = {
            x : 0 ,
            y : 0,
            radius : 50,
        }
        var particleArray = [];
        window.addEventListener("mousemove" ,(e) => {
            mouse.x = e.pageX - 5;
            mouse.y = e.pageY - (window.screenY == 0? window.scrollY + 10:window.scrollY);
        });

        class Particle {
            constructor(x ,y ,color){
                this.x = x ;
                this.y = y ;
                this.baseX = x;
                this.baseY = y;
                this.color = color;
                this.denecity = Math.random() * 40 + 5;
            }

            draw(){
                ctx.beginPath();
                ctx.fillStyle = "rgb("+ this.color.r +","+ this.color.g +" ,"+ this.color.b  +" ,"+ this.color.a +")";
                ctx.rect(this.x ,this.y ,2 ,2);
                ctx.closePath();
                ctx.fill();
            }

            update(){
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                var distance = Math.sqrt((Math.pow( (dx) ,2) + Math.pow( (dy) ,2)));
                var forceX = dx / distance;
                var forceY = dy / distance;
                var forceDirectionX = distance - mouse.radius;
                var force = (mouse.radius - distance) / (mouse.radius );
                if (distance < mouse.radius){
                    this.x -= forceX * force * this.denecity;
                    this.y -= forceY * force * this.denecity;
                }else{
                    if(this.x !== this.baseX){
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if(this.y !== this.baseY){
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        } // end of particles class


        var img = new Image();
        img.src = "/imgs/logo.png";
        var imgData = [];
        img.onload = function(){
            ctx.drawImage(img ,0 ,0 ,50 ,50);
            imgData = ctx.getImageData(0 , 0 ,50 ,50);
            init();
            animate();
        }

        function init(){
            particleArray = [];
            for (let y = 0; y < imgData.height; y++) {
                for (let x = 0; x < imgData.width; x++) {
                    if(imgData.data[((y * 4 * imgData.height) + (x * 4))] < 255){
                        particleArray.push(new Particle(x * 1 + 70,y * 1 + 10 ,{
                            r : imgData.data[((y * 4 * imgData.height) + (x * 4))] ,
                            g : imgData.data[((y * 4 * imgData.height) + (x * 4 + 1))],
                            b : imgData.data[((y * 4 * imgData.height) + (x * 4 + 2))],
                            a : imgData.data[((y * 4 * imgData.height) + (x * 4 + 3))] - 200,
                        }));
                    }
                } 
            }
        }
        
        function animate(){
            requestAnimationFrame(animate);
            ctx.clearRect(0 ,0 ,canvas.width ,canvas.height);
            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].draw();
                particleArray[i].update();
            }
        }

        let mouseOnCanvas = false ,logoCanvasCounter = 0;
        canvas.onmouseover = function(){
            mouseOnCanvas = true;
        }

        canvas.onmouseleave = function(){
            mouseOnCanvas = false;
            logoCanvasCounter = 0;
        }
        function randomParticlesPosition(){
            if(!mouseOnCanvas){
                for (let i = 0; i < particleArray.length; i++) {
                    particleArray[i].x = Math.floor(Math.random() * (canvas.width - 50) + 50);
                    particleArray[i].y = Math.floor(Math.random() * (canvas.height - 50) + 50);  
                }  
            }  
        }
        function repeatLogoEffect(){
            requestAnimationFrame(repeatLogoEffect);
            logoCanvasCounter ++;
            if(logoCanvasCounter === 60 * 5 ){
                randomParticlesPosition();
                logoCanvasCounter = 0;
            }
        }
        repeatLogoEffect();

        // edit nav bar position while scrolling
        window.addEventListener('scroll' ,function(){
            if(document.querySelector('.nav-links')){
                let navBar = document.querySelector('.nav-bar');
                if(window.scrollY > 70){
                    navBar.style.position = 'fixed';
                    navBar.style.top = 0;
                    document.querySelector('.top-nav').style.marginBottom = '100px';
                }else if(window.scrollY <= 70){
                    navBar.style.position = 'relative';
                    navBar.style.top = 'auto';
                    document.querySelector('.top-nav').style.marginBottom = 0;
                }
            }
            
        });


        var navLinks = document.getElementsByClassName("nav-link");

        function editNavDisplay(){
            if(document.querySelector('.nav-links')){
                if(window.innerWidth >= 768){
                    document.querySelector('.nav-links').style.cssText += 'display:flex;left:0';
                    for(let i = 0 ;i < navLinks.length ;i++){
                        navLinks[i].style.cssText += 'left:0';
                    }
                }else{
                    document.querySelector('.nav-links').style.cssText = 'display:none;';
                    for(let i = 0 ;i < navLinks.length ;i++){
                        navLinks[i].style.cssText += 'position:relative;';
                    }
                }
            }
        }

        window.addEventListener('resize' ,editNavDisplay);

        new animator('.nav-links' ,[
            {property : "display" ,start : "none" , end : "block" ,delay : -1}, 
            {property : "left" ,start : "-100%" , end : "0" },
        ], {
            startEvent : "click" ,
            elementOfEvent : "#navSlider",
            time : 0.3,
        });

        
        for(let i = 0 ;i < navLinks.length ;i++){
            new animator(navLinks[i] ,[
                {property : "left" ,start : "-100%" , end : "0" },
            ], {
                startEvent : "click" ,
                elementOfEvent : "#navSlider",
                time : 0.3 + i * 0.15,
            });
        }

        new animator('#nbb1' ,[
            {property : "transform" ,start : "rotate(0)" , end : "rotate(45deg)"}, 
            {property : "top" ,start : "6px" , end : "16px"}, 
        ], {
            startEvent : "click" ,
            elementOfEvent : "#navSlider",
            time:0.5,
        });

        new animator('#nbb2' ,[
            {property : "display" ,start : "inline-block" , end : "none", delay : -1}, 
        ], {
            startEvent : "click" ,
            elementOfEvent : "#navSlider",
            time:0.5,
        });

        new animator('#nbb3' ,[
            {property : "transform" ,start : "rotate(0)" , end : "rotate(-45deg)"}, 
            {property : "top" ,start : "26px" , end : "16px"}, 
        ], {
            startEvent : "click" ,
            elementOfEvent : "#navSlider",
            time:0.5,
        });
        setTimeout(editNavDisplay,500);


    } ,[]);
    

    return(
        <div style={{width:"100vw"}} >
            <nav className={'top-nav row align-items-center'} >
                <div className={'col-1 col-md-2 '} >
                    {
                        props.locale == 'ar'? <button className={'p-0 pl-1 pr-1 '} onClick={()=>props.setEn()}>EN</button> 
                        : 
                        <button className={'p-0 pl-1 pr-1 '} onClick={()=>props.setAr()}>AR</button>
                    }
                </div>
                <div className={'col-11 pl-1 col-md-10'} >
                    <span className={'ml-4'}><FontAwesomeIcon icon={faPhone}/> +20 01012345678</span>
                    <span className={'ml-4'}><FontAwesomeIcon icon={faEnvelope}/> email@example.com</span>
                </div>
            </nav>

            <nav className={'nav-bar'} >
                <div className={'row'} >
                    <div className={'col-2'} id="logo_cont" ></div>
                    <div style={{height:"70px"}} className={'col-md-10 nav-links '} >
                        <NavLink className={'nav-link'} exact to='/' >{props.nav_lang.home}</NavLink>
                        <NavLink className={'nav-link'} to='/about' >{props.nav_lang.about}</NavLink>
                        <NavLink className={'nav-link'} to='/services' >{props.nav_lang.services}</NavLink>
                        <NavLink className={'nav-link'} to='/doctors' >{props.nav_lang.doctors}</NavLink>
                        <NavLink className={'nav-link'} to='/blogs' >{props.nav_lang.blogs}</NavLink>
                    </div>
                    <button id='navSlider'>
                        <div>
                            <span id='nbb1'></span>
                            <span id='nbb2'></span>
                            <span id='nbb3'></span>
                        </div>
                    </button>
                </div>
            </nav>
        </div>
    );

    
}



function mapDispatchToProps(dispatch){
    return {
        setAr : () => dispatch(ar),
        setEn : () => dispatch(en),
    }
}

function mapStateToProps(state){
    return{
        locale : state.locale,
        nav_lang : state.lang.nav,
    }
}


export default connect(mapStateToProps ,mapDispatchToProps)(NavBar);