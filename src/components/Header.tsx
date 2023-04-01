import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../redux/configStore';
const Header: React.FC = () => {
   const showActiveStyle = () => {
      return ({ isActive }: any) =>
         isActive ? 'nav-link bg-primary' : 'nav-link';
   };
   const signedInAccount = useSelector(
      (state: RootState) => state.accountReducer.signedInAccount
   );
   const handleOnLogOut = () => {};
   const renderModalLogOut = () => {
      return (
         <div
            className='modal fade '
            id='modalLogout'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
         >
            <div className='modal-dialog modal-dialog modal-dialog-centered'>
               <div className='modal-content'>
                  <div className='modal-header'>
                     <h1 className='modal-title fs-5 text-light'>
                        Do you want to log out ?
                     </h1>
                     <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                     />
                  </div>
                  <div className='modal-footer'>
                     <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                     >
                        Close
                     </button>
                     <button
                        type='button'
                        className='btn btn-danger'
                     >
                        Log Out
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   };
   return (
      <div>
         <nav
            className='navbar navbar-expand-lg bg-dark py-3'
            data-bs-theme='dark'
         >
            <div className='container'>
               <NavLink
                  to='/'
                  className='navbar-brand'
               >
                  Jira Clone
               </NavLink>
               <button
                  className='navbar-toggler'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarText'
                  aria-controls='navbarText'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
               >
                  <span className='navbar-toggler-icon' />
               </button>
               <div
                  className='collapse navbar-collapse'
                  id='navbarText'
               >
                  <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                     <li className='nav-item'>
                        <NavLink
                           className={showActiveStyle()}
                           aria-current='page'
                           to='/'
                        >
                           Home
                        </NavLink>
                     </li>
                  </ul>
                  <ul className='navbar-nav  d-flex justify-content-end'>
                     <li className='nav-item'>
                        {signedInAccount ? (
                           <div className='d-flex'>
                              <a className='nav-link'>
                                 Hello {signedInAccount.email}
                              </a>
                              <button
                                 data-bs-toggle='modal'
                                 data-bs-target='#modalLogout'
                                 className='btn btn-outline-danger ms-3'
                              >
                                 <i className='fa-solid fa-arrow-right-from-bracket'></i>
                              </button>
                           </div>
                        ) : (
                           <NavLink
                              className='nav-link'
                              to='login'
                           >
                              Login
                           </NavLink>
                        )}
                     </li>
                     {renderModalLogOut()}
                  </ul>
               </div>
            </div>
         </nav>
      </div>
   );
};

export default Header;
