import React from 'react'
import { Outlet } from 'react-router-dom';
import img from '../assets/img/form-img.jpg';
type Props = {}

const FormTemplate = (props: Props) => {
  return (
    <>
       <div className='row m-0'>
          <div className='col-8 p-0'>
             <img
                src={img}
                className='img-fluid img-form'
             />
          </div>
          <div className='col-4'>
             <Outlet />
          </div>
       </div>
    </>
 );
}

export default FormTemplate