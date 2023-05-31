import './App.css';
import {BrowserRouter, Routes, Route, Link, Outlet, Navigate} from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Header from "./components/static/Header";
import Footer from "./components/static/Footer";
import Forum from "./components/pages/forum/Forum";
import { gapi } from "gapi-script";
import {  getCurrentUser } from './utils/user.auth.service';
import Profile from './components/pages/profile/Profile';
import HomeHeader from './components/static/HomeHeader';
import AddQuestion from './components/pages/forum/AddQuestion';
import Question from './components/pages/forum/Question';
import AllQuestions from './components/pages/forum/AllQuestions';
import UserProfile from './components/pages/profile/UserProfile';
import UpdateQuestion from './components/pages/forum/UpdateQuestion';
import SearchResults from './components/pages/forum/SearchResults';
import BlogList from './components/pages/blog/BlogList';
import AddBlog from './components/pages/blog/AddBlog';
import BlogDetails from './components/pages/blog/BlogDetails';
import UpdateBlog from './components/pages/blog/UpdateBlog';
import SideBar from './components/pages/chat/SideBar';
import SingleChat from './components/pages/chat/SingleChat';
import Sender from './components/pages/chat/Sender';
import Receiver from './components/pages/chat/Receiver';
import HomeProjects from './components/pages/task/HomeProjects';
import ProjectBoard from './components/pages/task/ProjectBoard';


function App() {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

    return (
    <BrowserRouter>

        <Routes>
            <Route path="/home" element={<CheckHomeAuthRoute/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<CheckProfileAuthRoute/>}/>
            <Route path="user_profile/:id" element={<CheckUserProfileAuthRoute />} />
            <Route path="/chat" element={<CheckChatAuthRoute />} />
            <Route path="/sender/:id" element={<Sender />} />
            <Route path="/receiver/:id_receiver/:id_peer" element={<Receiver />} />
            <Route path="/home_projects" element={<HomeProjects />} />
            <Route path="/board/:id" element={<ProjectBoard />} />

            
                <Route exact path="/" element={<CheckAuthRoute />}>
                   <Route path="forum" element={<Forum />} />
                   <Route path="add_question" element={<AddQuestion />} />
                   <Route path="update_question/:id" element={<UpdateQuestion />} />
                   <Route path="question_details/:id" element={<Question />} />
                   <Route path="all_questions" element={<AllQuestions />} />
                   <Route path="/search" element={<SearchResults/>} />
                   <Route path="/blog" element={<BlogList/>} />
                   <Route path="/add_blog" element={<AddBlog/>} />
                   <Route path="/blog_details/:id" element={<BlogDetails/>} />
                   <Route path="update_blog/:id" element={<UpdateBlog />} />


                </Route>

        </Routes>
        
    </BrowserRouter>
    )
}

export default App;

function HomeOutleter(){
  return(
    <div className='body_wrapper'>
      <HomeHeader/>
      <Home/>
      <Footer/>
    </div>
  )
}

function Outleter() {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
    
  }

  function ChatOutleter() {
    return (
      <div className="main-layout">
        <SideBar />
        <SingleChat />
      </div>
    );
    
  }


  const CheckAuthRoute = () => {
    const user = getCurrentUser();

    return user ? <Outleter /> : <Navigate to="/login" />;
}

const CheckHomeAuthRoute=()=>{
  const user=getCurrentUser();
  return user?<HomeOutleter/> : <Navigate to="/login"/>;
}

const CheckProfileAuthRoute= ()=>{
  const user=getCurrentUser();
  return user?<Profile/> : <Navigate to="/login"/>;
}

const CheckUserProfileAuthRoute= ()=>{
  const user=getCurrentUser();
  return user?<UserProfile/> : <Navigate to="/login"/>;
}

const CheckChatAuthRoute= ()=>{
  const user=getCurrentUser();
  return user?<SideBar/> : <Navigate to="/login"/>;
}
