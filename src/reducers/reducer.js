import {getAr ,getEn} from './../api/language';
let lang_ar = {} ,lang_en = {};

getEn().then(response => {
    lang_en = response.data;
});
getAr().then(response => {
    lang_ar = response.data;
});

const initState = {
    locale:'en',
    serverError:null,
    loading : false,
    page : 'home',
    url : "http://127.0.0.1:8000/",
    user : {
        signedin:false,
        api_token:null,
        job:'',
        data : {
            firstName:'',
            lastName:''
        }
    },
    lang : {
        nav : {
            home : "Home",
            services : "Services",
            about : "About Us",
            doctors : "Doctors",
            blogs : "Blogs"
        },
    
        home:{
            header : {
                title : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nisi!",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nisi!Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nisi!",
                learnMore : "Learn More"
            },
            howItWorks:{
                title : 'How It Works',
                getResult : {
                    title : 'Get Your Result In 1h',
                    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsa eligendi dicta hic. Deserunt modi praesentium, nam quaerat numquam nisi."
                },
                helpfullTest : {
                    title : 'Helpfull Test Tips',
                    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsa eligendi dicta hic. Deserunt modi praesentium, nam quaerat numquam nisi."
                },
                testAtHome : {
                    title : 'Teast At Home',
                    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsa eligendi dicta hic. Deserunt modi praesentium, nam quaerat numquam nisi."
                },
            }
        },
        statistics : {
            yearsOfExperiences : "Years of Experiences",
            deliveryBeforeTheDate : "Delivery before the date",
            ourDoctors : "Our Doctors",
            clientsLoveOurWork : "Clients Love Our Work"
        },
        services : {
            homeHealth : {
                title : "Home Health",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur ipsam non cum temporibus, doloremque ipsum eos voluptatum cumque repudiandae blanditiis vitae ratione nam. Cupiditate, quos.",
            },
            acuteCare : {
                title : "Acute Care",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur ipsam non cum temporibus, doloremque ipsum eos voluptatum cumque repudiandae blanditiis vitae ratione nam. Cupiditate, quos.",
            },
            skilledWorkers : {
                title : "Skilled Workers",
                description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam pariatur ipsam non cum temporibus, doloremque ipsum eos voluptatum cumque repudiandae blanditiis vitae ratione nam. Cupiditate, quos.",
            },
        },
        plansAndPricing : {
            title : "Plans And Pricing",
        }
    },
    plans : [
        {
            id : 0,
            title : "",
            price : "",
            sections: [
                {
                  "id": 0,
                  "title": "",
                  "active": 0
                },
            ],    
        }
    ],
};



const reducer = function(state = initState ,action){
    switch (action.type){
        case "AR" :{
            return {
                ...state ,
                locale : "ar",
                lang : lang_ar
            }
        }
            
            

        case "EN" :{
            return {
                ...state ,
                locale : "en",
                lang : lang_en
            }
            
        }

        case "SERVERERROR" :{
            return {
                ...state ,
                serverError : true,
            }
            
        }

        case "STARTLOADING" :{
            return{
                ...state,
                loading : true
            }
        }

        case "STOPLOADING" : {
            return{
                ...state,
                loading : false,
            }
        }

        case "SETPAGE" : {
            return{
                ...state,
                page : action.data,
            }
        }

        case "SETPLANS" : {
            return {
                ...state,
                plans : action.data
            }
        }

        case "SETUSER" : {
            return{
                ...state,
                user : action.data,
            }
        }

        default:
            return state;
    }
    console.log(state);
}

export default reducer;