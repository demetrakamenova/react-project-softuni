import React, { useEffect } from 'react';
import './App.css';
import Navigation from '../Navigation/Navigation';
import Aside from '../Aside/Aside';
import TaskList from '../tasks/TaskList/TaskList';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import CreateTask from '../tasks/CreateTask/CreateTask';
import UserList from '../UserList/UserList';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import userService from '../services/user-service';
import Logout from '../Logout/Logout';
import TaskDetails from '../tasks/TaskDetails/TaskDetails';


export const AuthContext = React.createContext();

let initialState = {
  isAuthenticated: false,
  userId: JSON.parse(localStorage.getItem("userId")),
  token: JSON.parse(localStorage.getItem("token")),
  isAdmin: null,
};

const reducer = (state, action) => {

  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userId", JSON.stringify(action.payload._id));
      localStorage.setItem("token", JSON.stringify(action.payload._kmd.authtoken));    
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username,
        userId: action.payload._id,
        token: action.payload._kmd.authtoken,
        isAdmin: action.payload.isAdmin,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
        user: null,
        token: null,
        isAdmin: null,
      };
      case "AUTH_RELOAD_PAGE":
        return {
          ...state,
          isAuthenticated: true,
          userId: action.payload._id,
          user: action.payload.username,
          token: localStorage.getItem('token'),
          isAdmin: action.payload.isAdmin,
        };

    default:
      return state;
  }
};


function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    useEffect(() => {
        if(state.token){
        userService.getUser(state.userId).then((data) => {
          //console.log(data)
          dispatch({
            type: "AUTH_RELOAD_PAGE",
            payload: data
          });
        });
      }
      
    },[]);
    
    return (
   
       <BrowserRouter>
        <AuthContext.Provider value={{ state, dispatch }}>
        <div className="App">
           <Navigation />
           <div className="Container">
               <Aside />
                <Switch>
                  {state.isAuthenticated && <Route path="/tasks"  render={(props)=><Main title="Tasks"><TaskList {...props} typeList="open" userId={state.userId}/></Main> }/>}
                  {state.isAuthenticated && <Route path="/user-tasks" component={()=><Main title="My Task"><TaskList typeList="myTasks" userId={state.userId}/></Main> }/>}
                  {state.isAuthenticated && <Route path="/task-in-progress" component={()=><Main title="In Progress"><TaskList  typeList="inProgress" userId={state.userId}/></Main> }/>}
                  {state.isAuthenticated && <Route path="/completed-tasks" component={()=><Main title="Completed Task"><TaskList typeList="completed"/></Main> }/>}
                  {state.isAuthenticated && <Route path="/profile" render={()=><Main title="Profile"><Profile user={state.user} userId={state.userId}/></Main> }/>}

                  {state.isAuthenticated && <Route path="/task-details/:id"  render={(props)=><Main title="Task Details"><TaskDetails {...props}/></Main> }/>}
                 
                  {state.isAuthenticated && <Route path="/logout"  render={()=><Logout/>} />}
                  {state.isAdmin && <Route path="/create-task"  render={(props)=><Main title="Create Task">{<CreateTask { ...props} username={state.user}/>}</Main> }/>}
                  {state.isAdmin && <Route path="/manage-list" render={()=><Main title="Permissions">{<UserList/>}</Main> }/>}
                  {state.isAdmin && <Route path="/pending-tasks" component={()=><Main title="Pending Task"><TaskList typeList="pending" userId={state.userId}/></Main> }/>}
                  {!state.isAuthenticated ?  <Route path="/login" exact render={()=><Main title="Login"><Login/></Main>}/>:<Redirect to="/tasks"/> }
                  {!state.isAuthenticated ?  <Route path="/register" render={(props)=><Main title="Register"><Register {...props}/></Main>}/>:<Redirect to="/tasks"/> }
                 
                  <Route path="*">
                   <Redirect to="/login"/>
                   {/* <Main title="Something went wrong"><NotFound/></Main> */}
                  </Route>
                  </Switch>    
           </div>
           <Footer/>
        </div>
        </AuthContext.Provider>
        </BrowserRouter>
  );
}

export default App;
