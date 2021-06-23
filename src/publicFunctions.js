export var animator = function(ele ,styles,properties){
    this.ele = null;
    this.loop = false;
    this.delay = 0;
    this.startEvent = null;
    this.firstClick = true;
    this.elementOfEvent = null;
    this.distanceToStart = 200;
    this.time = 1;
    this.properties = properties
    this.styles = styles;


    if(typeof(ele) == 'string'){
        this.ele = document.querySelector(ele);
    }else{
        this.ele = ele;
    }


    if(this.properties){
        if(this.properties.loop){
            this.loop = this.properties.loop;
        }
        if(this.properties.startEvent){
            this.startEvent = this.properties.startEvent;
        }
        if(this.properties.delay){
            this.delay = this.properties.delay;
        }
        if(this.properties.elementOfEvent){
            this.elementOfEvent = document.querySelector(this.properties.elementOfEvent);
        }
        if(this.properties.distanceToStart){
            this.distanceToStart = this.properties.distanceToStart;
        }
        if(this.properties.time){
            this.time = this.properties.time;
        }
    }



    for(let i = 0 ;i < this.styles.length ;i++){
        this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].start + ";";
    }

    this.movement = () => {
        if(this.ele.getBoundingClientRect().top < window.innerHeight - this.distanceToStart && this.startEvent == null){
            if(this.delay != null){
                setTimeout(this.fdelay , this.delay);
            }else{
                this.fdelay();
            }
        }else if(this.loop && this.ele.getBoundingClientRect().top > window.innerHeight && this.startEvent == null){
            for(let i = 0 ;i < this.styles.length ;i++){
                this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].start + ";";
            }
        }

        if(this.startEvent != null && this.startEvent === "click"){
            this.eventFunc();
        }else if(this.startEvent != null && this.startEvent === "mousedown"){
            this.eventFunc();
            window.addEventListener("mouseup" ,this.eventFunc);
        }else if(this.startEvent != null && this.startEvent === "mouseenter"){
            this.eventFunc();
            window.addEventListener("mouseleave" ,this.eventFunc);
        }
    }

    this.eventFunc = () => {
        if(this.firstClick){
            this.firstClick = false;
            for(let i = 0 ;i < this.styles.length ;i++){
                if(this.styles[i].delay == null){
                    this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].start + ";";
                }else{
                    if(this.styles[i].delay > 0){
                        this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].start + ";";
                    }else{
                        setTimeout(() => {
                            if(!this.firstClick){
                                this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].start + ";";
                            }
                        }, (this.time * 1000 + Math.abs(this.styles[i].delay)));
                    }
                }
            }
        }else{
            this.firstClick = true;
            if(this.delay != null){
                setTimeout(this.fdelay , this.delay);
            }else{
                this.fdelay();
            }
        }
    }

    this.fdelay = () => {
        this.ele.style.cssText += "transition" + ":" + "all "+ this.time +"s ease-in-out" + ";";
        for(let i = 0 ;i < this.styles.length ;i++){
            if(this.styles[i].delay == null ){
                setTimeout(() => {
                    this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].end + ";";
                }, 10);
            }else{
                if(this.styles[i].delay > 0 && this.firstClick){
                    setTimeout(() => {
                        this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].end + ";";
                    }, this.styles[i].delay);
                }else{
                    setTimeout(() => {
                        this.ele.style.cssText += this.styles[i].property + ":" + this.styles[i].end + ";";
                    }, 1);
                }
            }
        }
    }

    this.movement();

    if(this.startEvent == null){
        window.addEventListener("scroll" ,this.movement);
    }
    

    if(this.startEvent != null && this.elementOfEvent != null){
        this.elementOfEvent.addEventListener(this.startEvent ,this.movement);
    }
}
