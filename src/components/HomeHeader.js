import React ,{useEffect} from 'react';
import './HomeHeader.css';



let canvas = '';
let ctx = '';

export default function HomeHeader(props){

    useEffect(()=>{
        canvas = document.getElementById("header_background");
        function setHeaderCanvasWidth(){
            canvas.width = window.innerWidth;
            if(window.innerWidth <= 768){
                canvas.height = window.innerHeight + 115;
            }else{
                canvas.height = window.innerHeight + 70;
            }
        }
        window.addEventListener('resize' ,setHeaderCanvasWidth);
        setHeaderCanvasWidth();
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "#7631FE";
        ctx.fillRect(0 ,0 ,canvas.width ,canvas.height);


        let triangles = [];
        for (let i = 0; i < 8; i++) {
            triangles.push(new triangle());
        }

        function header_animate (){
            requestAnimationFrame(header_animate);
            ctx.fillStyle = "#7631FE";
            ctx.fillRect(0 ,0 ,canvas.width ,canvas.height);
            for (let i = 0; i < triangles.length; i++) {
                const element = triangles[i];
                element.update();
                element.draw();
            }
        }
        header_animate();
    },[]);
    const text_dir = props.locale === 'en'?'text-left':'text-right';
    return(
        <header className={'home-header '}>
            <canvas id="header_background">Your borwser dosen't support html5 canvas</canvas>
            <div className={'row align-items-center'} >
                <div className={'col-md-6 p-5'} >
                    <div className={ props.locale == 'en'?"row justify-content-start":"row justify-content-end"}>
                        <h1 className={text_dir}>{props.header_lang.title}</h1>
                        <p className={text_dir}>{props.header_lang.description}</p>
                        <button className={text_dir}>{props.header_lang.learnMore}</button>
                    </div>
                </div>

                <div className={'col-md-6'} style={{overflow:"hidden" ,height:"100%"}} >
                    <img className={'w-100 pt-4'} src='/imgs/home-header.png' alt='' />
                </div>
            </div>
        </header>
    );
    
}




class point{
    constructor(x ,y ,canvas){
        this.x = x;
        this.y = y;
        this.adderX = Math.random() * 2 - Math.random() * 2;
        this.adderY = Math.random() * 2- Math.random() * 2;

    }
}

class triangle {
    constructor(){
        this.points = [
            new point(Math.random() * canvas.width + 50 , Math.random() * canvas.height + 50),
            new point(Math.random() * canvas.width + 50 , Math.random() * canvas.height + 50),
            new point(Math.random() * canvas.width + 50 , Math.random() * canvas.height + 50),
        ];
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.points[0].x ,this.points[0].y);
        ctx.lineTo(this.points[1].x ,this.points[1].y);
        ctx.lineTo(this.points[2].x ,this.points[2].y);
        ctx.lineTo(this.points[0].x ,this.points[0].y);
        ctx.fillStyle = "#9D58FF55";
        ctx.fill();
    }

    update(){
        for (let i = 0; i < this.points.length; i++) {
            const element = this.points[i];
            if(element.x > window.innerWidth + 200 || element.x < -100){
                element.adderX *= -1;
            }
            if(element.y > window.innerHeight + 200 || element.y < -100){
                element.adderY *= -1;
            }
            element.x += element.adderX;
            element.y += element.adderY;
        }
    }
}