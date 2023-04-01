import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../redux/configStore';
import * as yup from 'yup';
import { FormLoginModel } from '../models/AccountModel';
import { loginAction } from '../redux/action/accountAction';
import * as Yup from 'yup';
type Props = {};
const Login = (props: Props) => {
   const navigate = useNavigate();
   const dispatch: DispatchType = useDispatch();
   const formik = useFormik<FormLoginModel>({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().required('Email is required'),
         password: Yup.string().required('Password is required'),
      }),
      onSubmit: (values: FormLoginModel) => {
         dispatch(loginAction(values, navigate));
      },
   });
   return (
      <div className='container w-75 mt-5'>
         <h1 className='text-center'>Login</h1>
         <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
               <label
                  htmlFor='exampleInputEmail1'
                  className='form-label'
               >
                  Email address
               </label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='email'
                  type='text'
                  className='form-control'
               />
               {formik.errors.email ? (
                  <span className='text-danger'>{formik.errors.email}</span>
               ) : null}
            </div>
            <div className='mb-3'>
               <label className='form-label'>Password</label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='password'
                  type='password'
                  className='form-control'
               />
               {formik.errors.password ? (
                  <span className='text-danger'>{formik.errors.password}</span>
               ) : null}
            </div>
            <div className='w-100 d-flex justify-content-center'>
               <button
                  type='submit'
                  className='btn btn-primary'
               >
                  Log in
               </button>
            </div>
         </form>
      </div>
   );
};

export default Login;
