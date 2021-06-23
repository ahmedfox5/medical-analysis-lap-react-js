import './App.css';
import {BrowserRouter ,Route ,Switch} from 'react-router-dom';
import {Redirect} from 'react-router';
import NavBar from './components/nav';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import {connect} from 'react-redux';
import React ,{useEffect} from 'react';
import Footer from './components/Footer';
import Blogs from './pages/Blogs';
import Loading from './components/Loading';
import DashboardApp from './dashboard/layouts/DashboardApp';
import {startLoading ,stopLoading} from './actions/actions';
import {positions, Provider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// dashboard
import DashboardNav from './dashboard/components/DashboardNav';
import DAbouts from './dashboard/pages/Abouts/Abouts';
import DBlogs from './dashboard/pages/Blogs/Blogs';
import DDoctors from './dashboard/pages/Doctors/Doctors';
import DPlans from './dashboard/pages/Plans/Plans';
import DUsers from './dashboard/pages/Users/Users';
import EditAbout from './dashboard/pages/Abouts/EditAbout';
import CreateAbout from './dashboard/pages/Abouts/CreateAbout';
import EditBlog from './dashboard/pages/Blogs/EditBlog';
import CreateBlog from './dashboard/pages/Blogs/CreateBlog';
import CreateDoctor from './dashboard/pages/Doctors/CreateDoctor';
import EditDoctor from './dashboard/pages/Doctors/EditDoctor';
import CreatePlane from './dashboard/pages/Plans/CreatePlan';
import EditPlane from './dashboard/pages/Plans/EditPlane';
import LogIn from './dashboard/pages/LogIn';
import Register from './dashboard/pages/Register';
import LogOutBtn from './components/LogOutBtn';
import Results from './dashboard/pages/Users/Results';
import CreateResult from './dashboard/pages/Users/CreateResult';
import OnlineResults from './pages/OnlineResults';
import ServerError from './pages/ServerError';
import ScrollToTop from './components/ScrollToTop';

////scroll to top


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

function App (props){
  const user = JSON.parse(sessionStorage.getItem('user'));
   useEffect(()=>{
     
   },[]);
  return(
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <div className="App">
          {props.loading ? <Loading /> : null}
          {props.page === "dashboard" ? <DashboardNav /> : props.page === 'login'? null : <NavBar />}
          
          {props.serverError?<Redirect to='/server-error'/>:null}
          
            <Switch>
    <ScrollToTop>
              <Route exact path='/server-error' component={ServerError} />
              
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/services' component={Services} />
              <Route exact path='/doctors' component={Doctors} />
              <Route exact path='/blogs' component={Blogs} />
              
              {/* dashboard */}
              <Route exact path='/dashboard' component={DashboardApp} />

              <Route exact path='/dashboard/abouts' component={DAbouts} />
              <Route exact path='/dashboard/abouts/edit/:id' component={EditAbout} />
              <Route exact path='/dashboard/abouts/create' component={CreateAbout} />
              
              <Route exact path='/dashboard/blogs' component={DBlogs} />
              <Route exact path='/dashboard/blogs/edit/:id' component={EditBlog} />
              <Route exact path='/dashboard/blogs/create' component={CreateBlog} />

              <Route exact path='/dashboard/doctors' component={DDoctors} />
              <Route exact path='/dashboard/doctors/edit/:id' component={EditDoctor} />
              <Route exact path='/dashboard/doctors/create' component={CreateDoctor} />

              <Route exact path='/dashboard/plans' component={DPlans} />
              <Route exact path='/dashboard/plans/edit/:id' component={EditPlane} />
              <Route exact path='/dashboard/plans/create' component={CreatePlane} />

              <Route exact path='/dashboard/users' component={DUsers} />
              <Route exact path='/login' component={LogIn} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/dashboard/user-results/:id' component={Results} />
              <Route exact path='/dashboard/result/create/:id' component={CreateResult} />
              <Route exact path='/online-results' component={OnlineResults} />
              

              </ScrollToTop>

            </Switch>
          {props.page !== "dashboard" && props.page !== 'login' ? <Footer /> : null}

          <LogOutBtn />
          
        </div>
      </BrowserRouter>

    </Provider>
  );
}

function mapStateToProps (state){
  return{
    lang : state.lang,
    loading : state.loading,
    page : state.page,
    serverError : state.serverError,
  }
}

function mapDispatchToProps(dispatch){
  return{
    startLoading : () => dispatch(startLoading),
    stopLoading : () => dispatch(stopLoading),
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(App);
