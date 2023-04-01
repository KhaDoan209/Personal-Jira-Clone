import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DispatchType, RootState } from '../redux/configStore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
   createNewProjectAction,
   deleteProjectAction,
   getListProjectAction,
   getProjectDetailAction,
} from '../redux/action/projectAction';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { CreateProjectModel } from '../models/ProjectModel';
import { Bounce } from 'react-toastify';
import { alertToast } from '../utils/alert';
import { useNavigate } from 'react-router-dom';
import { getListUserAction } from '../redux/action/userAction';
import { getAllStatusAction } from '../redux/action/taskAction';
import * as Yup from 'yup';
import { LOGNED_IN } from '../utils/setting';
const Home = () => {
   const navigate = useNavigate();
   const editorRef: any = useRef();
   const dispatch: DispatchType = useDispatch();
   const [idToDelete, setIdToDelete] = useState(0);
   const projectList = useSelector(
      (state: RootState) => state.projectReducer.listProject
   );
   const userLogin = useSelector(
      (state: RootState) => state.accountReducer.signedInAccount
   );

   useEffect(() => {
      dispatch(getListProjectAction());
      if (LOGNED_IN !== null) {
         dispatch(getListUserAction());
         dispatch(getAllStatusAction());
      }
   }, []);
   const formik = useFormik<CreateProjectModel>({
      initialValues: {
         projectName: '',
         description: '',
         alias: '',
         categoryId: 0,
      },
      validationSchema: Yup.object({
         projectName: Yup.string()
            .required('Project name is required')
            .max(100, 'Name should less than 100 letters'),
      }),
      onSubmit: (values: CreateProjectModel) => {
         if (values.categoryId != 0) {
            dispatch(createNewProjectAction(values));
            alertToast.success(
               'Project created successfully',
               'top-center',
               Bounce,
               'colored'
            );
            document.getElementById('closeForm')?.click();
         } else {
            alertToast.error(
               'Please choose category',
               'top-center',
               Bounce,
               'colored'
            );
         }
      },
   });

   const handleOnDelete = (id: number) => {
      dispatch(deleteProjectAction(id));
   };
   const renderDeleteProjectModal = () => {
      return (
         <div
            className='modal'
            tabIndex={-1}
            id='deleteProjectModal'
         >
            <div className='modal-dialog modal-dialog-centered'>
               <div className='modal-content'>
                  <div className='modal-header'>
                     <h5 className='modal-title'>
                        Do you want to delete project ?
                     </h5>
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
                        onClick={() => {
                           if (LOGNED_IN === null) {
                              alertToast.info(
                                 'Please log in first',
                                 'top-center',
                                 Bounce,
                                 'dark'
                              );
                           } else {
                              handleOnDelete(idToDelete);
                           }
                        }}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   };
   const renderTableProject = (currentItems: any) => {
      if (currentItems.length > 0) {
         return (
            <table className='table text-center'>
               <thead className='table-dark'>
                  <tr>
                     <th
                        className='py-2'
                        scope='col'
                     >
                        Id
                     </th>
                     <th
                        className='py-2'
                        scope='col'
                     >
                        Project Name
                     </th>
                     <th
                        className='py-2'
                        scope='col'
                     >
                        Category Name
                     </th>
                     <th
                        className='py-2'
                        scope='col'
                     >
                        Creator
                     </th>
                     <th
                        className='py-2'
                        scope='col'
                     >
                        Members
                     </th>
                     <th
                        className='py-2'
                        scope='col'
                     >
                        Action
                     </th>
                  </tr>
               </thead>
               <tbody className='table-group-divider'>
                  {currentItems.map((project: any, index: number) => {
                     return (
                        <tr key={index}>
                           <th
                              className='py-2'
                              scope='row'
                           >
                              {project.id}
                           </th>
                           <td
                              onClick={() => {
                                 if (LOGNED_IN === null) {
                                    alertToast.info(
                                       'Please log in first',
                                       'top-center',
                                       Bounce,
                                       'dark'
                                    );
                                 } else {
                                    dispatch(
                                       getProjectDetailAction(project.id)
                                    );
                                    navigate(`dashboard/${project.id}`);
                                 }
                              }}
                              className='py-2 link-primary pointer'
                           >
                              {project.projectName}
                           </td>
                           <td className='py-2'>{project.categoryName}</td>
                           <td className='py-2'>{project.creator.name}</td>
                           <td className='py-2 w-25'>
                              <div className='mx-auto'>
                                 {project.members
                                    .slice(0, 3)
                                    .map((item: any) => {
                                       return (
                                          <img
                                             key={item.userId}
                                             style={{
                                                width: '40px',
                                                borderRadius: '50%',
                                             }}
                                             className='img-thumbnail mx-1'
                                             src={item.avatar}
                                             alt=''
                                          />
                                       );
                                    })}{' '}
                                 {project.members.length > 3 ? (
                                    <img
                                       style={{
                                          height: '40px',
                                          width: '40px',
                                          borderRadius: '50%',
                                       }}
                                       className='img-thumbnail'
                                       src='https://media.istockphoto.com/id/1186972006/vector/typing-text-chat-isolated-vector-icon-modern-geometric-illustration-three-dots-for-your.jpg?s=612x612&w=0&k=20&c=Yuz5f5Vy6gAFo0XLPRQ9FWRqroJa38C7Fd4rlIoGGLQ='
                                       alt='...'
                                    />
                                 ) : (
                                    ''
                                 )}
                              </div>
                           </td>
                           <td className='py-2'>
                              <button
                                 onClick={() => {
                                    if (LOGNED_IN === null) {
                                       alertToast.info(
                                          'Please log in first',
                                          'top-center',
                                          Bounce,
                                          'dark'
                                       );
                                    } else {
                                       dispatch(
                                          getProjectDetailAction(project.id)
                                       );
                                       navigate(`detail/${project.id}`);
                                    }
                                 }}
                                 className='btn btn-outline-warning'
                              >
                                 <i className='fa-solid fa-pen-nib'></i>
                              </button>
                              <button
                                 data-bs-toggle='modal'
                                 data-bs-target='#deleteProjectModal'
                                 className='btn btn-outline-danger ms-2'
                                 onClick={() => {
                                    setIdToDelete(project.id);
                                 }}
                              >
                                 <i className='fa-regular fa-trash-can'></i>
                              </button>
                              {renderDeleteProjectModal()}
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
         );
      }
   };
   const handleOnSelect = (e: any) => {
      formik.setFieldValue('categoryId', e.target.value);
   };
   const handleChange = () => {
      formik.setFieldValue('description', editorRef.current.getContent());
   };
   const renderCreateProjectForm = () => {
      return (
         <div
            style={{ width: '35%' }}
            className='offcanvas offcanvas-end'
            tabIndex={-1}
            id='createProjectCanvas'
            aria-labelledby='offcanvasExampleLabel'
         >
            <div className='offcanvas-header'>
               <h3 className='offcanvas-title'>Create New Project</h3>
               <button
                  id='closeForm'
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
               />
            </div>
            <div className='offcanvas-body'>
               <form
                  onSubmit={formik.handleSubmit}
                  className='container'
               >
                  <div className='mb-3'>
                     <label
                        aria-required='true'
                        className='form-label required'
                     >
                        Project Name
                     </label>
                     <input
                        name='projectName'
                        type='text'
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                     />
                     {formik.errors.projectName ? (
                        <span className='text-danger'>
                           {formik.errors.projectName}
                        </span>
                     ) : null}
                  </div>
                  <div className='mb-3'>
                     <label className='form-label required'>
                        Project Category
                     </label>
                     <select
                        onChange={(e) => {
                           handleOnSelect(e);
                        }}
                        className='form-select'
                     >
                        <option defaultValue={0}>
                           Choose project category
                        </option>
                        <option value={1}>Dự án web</option>
                        <option value={2}>Dự án phần mềm</option>
                        <option value={3}>Dự án di động</option>
                     </select>
                  </div>
                  <div className='mb-3'>
                     <label className='form-label'>Description</label>
                     <Editor
                        ref={editorRef}
                        onChange={handleChange}
                        apiKey='x2nbcvp3g9jw6nunby2juwkxq9umdvuaxiqew07kss4zx8ew'
                        onInit={(evt, editor: any) =>
                           (editorRef.current = editor)
                        }
                        initialValue=''
                        init={{
                           height: 400,
                           menubar: false,
                           plugins: [
                              'advlist',
                              'autolink',
                              'lists',
                              'link',
                              'image',
                              'charmap',
                              'preview',
                              'anchor',
                              'searchreplace',
                              'visualblocks',
                              'code',
                              'fullscreen',
                              'insertdatetime',
                              'media',
                              'table',
                              'code',
                              'help',
                              'wordcount',
                           ],
                           toolbar:
                              'undo redo | blocks | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                           content_style:
                              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                     />
                  </div>
                  <div className='d-flex justify-content-end'>
                     <button
                        type='submit'
                        className='btn btn-primary'
                     >
                        Create
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   };
   const items = projectList;
   const [itemOffset, setItemOffset] = useState(0);
   const itemsPerPage = 8;
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = items.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(items.length / itemsPerPage);
   const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
   };
   return (
      <div className='container w-75 mt-5 mb-3'>
         <div className='d-flex justify-content-between align-items-between'>
            <h1 className='mb-4'>Project Dashboard</h1>
            <div>
               {LOGNED_IN !== null ? (
                  <button
                     type='button'
                     data-bs-toggle='offcanvas'
                     data-bs-target='#createProjectCanvas'
                     aria-controls='offcanvasExample'
                     className='btn btn-primary'
                  >
                     Create new project
                  </button>
               ) : (
                  ''
               )}
               {renderCreateProjectForm()}
            </div>
         </div>
         {renderTableProject(currentItems)}
         <ReactPaginate
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            breakLabel='...'
            breakClassName='pagin-list'
            nextLabel={
               <button
                  type='button'
                  className='btn btn-outline-primary ms-3'
               >
                  <i className='fa-solid fa-angle-right'></i>
               </button>
            }
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel={
               <button className='btn btn-outline-primary me-3'>
                  <i className='fa-solid fa-angle-left'></i>
               </button>
            }
            previousLinkClassName='pagin-link'
            nextLinkClassName='pagin-link'
            nextClassName='pagin-list'
            previousClassName='pagin-list'
            pageClassName='pagin-list my-1 mx-1'
            activeLinkClassName='pagin-list active px-3 py-2 m-0'
            containerClassName='d-flex justify-content-end w-90 mt-4'
         />
      </div>
   );
};

export default Home;
