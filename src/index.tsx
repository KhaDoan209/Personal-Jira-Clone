import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HomeTemplate from './templates/HomeTemplate';
import FormTemplate from './templates/FormTemplate';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
import { store } from './redux/configStore';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ProjectDetail from './pages/ProjectDetail';
import ProjectBoard from './pages/ProjectDashBoard';
const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
);

root.render(
   <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
         <Routes>
            <Route
               path=''
               element={<App />}
            >
               <Route
                  path=''
                  element={<HomeTemplate />}
               >
                  <Route
                     index
                     path='/'
                     element={<Home />}
                  />
                  <Route path='/detail'>
                     <Route
                        path=':id'
                        element={<ProjectDetail />}
                     />
                  </Route>
                  <Route path='/dashboard'>
                     <Route
                        path=':id'
                        element={<ProjectBoard />}
                     />
                  </Route>
                  <Route
                     path='/*'
                     element={<Navigate to={'home'} />}
                  />
               </Route>
            </Route>
            <Route
               path=''
               element={<FormTemplate />}
            >
               <Route
                  path='/login'
                  element={<Login />}
               />
            </Route>
         </Routes>
      </BrowserRouter>
   </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
