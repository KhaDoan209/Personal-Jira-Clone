import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Status from '../components/Status';
import { UpdateProjectModel, UserProjectModel } from '../models/ProjectModel';
import { UserModel } from '../models/UserModel';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
   removeUserProjectAction,
   updateUserProjectAction,
} from '../redux/action/projectAction';
import { DispatchType, RootState } from '../redux/configStore';
import { CreateTaskModel } from '../models/TaskModel';
import { alertToast } from '../utils/alert';
import { Bounce } from 'react-toastify';
import { createTaskAction } from '../redux/action/taskAction';

type Props = {};

const ProjectDashboard = (props: Props) => {
   const editorRef: any = useRef();
   const dispatch: DispatchType = useDispatch();
   const [listAssignedUser, setlistAssignedUser] = useState<any>([]);
   const listUser = useSelector(
      (state: RootState) => state.userReducer.listUser
   );
   const projectDetail: any = useSelector(
      (state: RootState) => state.projectReducer.projectDetail
   );
   const taskStatus = useSelector(
      (state: RootState) => state.taskReducer.listStatus
   );

   const formik = useFormik<CreateTaskModel>({
      enableReinitialize: true,
      initialValues: {
         listUserAsign: [],
         taskName: '',
         description: '',
         statusId: 1,
         originalEstimate: 0,
         timeTrackingSpent: 0,
         timeTrackingRemaining: 0,
         projectId: projectDetail?.id,
         typeId: 1,
         priorityId: 4,
      },
      validationSchema: Yup.object({
         taskName: Yup.string()
            .required('Project name is required')
            .max(100, 'Name should less than 100 letters'),
      }),
      onSubmit: (values: CreateTaskModel) => {
         dispatch(createTaskAction(values));
      },
   });
   const handleChange = () => {
      formik.setFieldValue('description', editorRef.current.getContent());
   };
   const handleOnSelect = (e: any) => {
      let { name, value } = e.target;
      return formik.setFieldValue(name, Number(value));
   };
   const handleOnAddAssignedMember = (e: any) => {
      let { value } = e.target;

      let userToAssigned = Number(value);
      if (listAssignedUser.length > 0) {
         let existed = false;
         listAssignedUser.map((item: any) => {
            if (item == userToAssigned) {
               alertToast.error(
                  'User is already in the list',
                  'top-center',
                  Bounce,
                  'colored'
               );
               existed = true;
            }
         });
         if (!existed) {
            setlistAssignedUser([...listAssignedUser, userToAssigned]);
         }
      } else {
         setlistAssignedUser([...listAssignedUser, userToAssigned]);
      }
   };
   const handleOnRemoveAssignedMember = (e: any) => {
      let array = [];
      let { value } = e.target;
      array = listAssignedUser.filter((item: any) => {
         return item != value;
      });
      setlistAssignedUser(array);
   };
   const renderAssignedMember = () => {
      if (listAssignedUser.length > 0) {
         return listAssignedUser.map((item: any) => {
            return projectDetail.members.map((member: any) => {
               if (member.userId == item) {
                  return (
                     <option
                        key={member.userId}
                        value={member.userId}
                     >
                        ID: <>{member.userId}</>&nbsp; Name: &nbsp;
                        <>{member.name}</>
                     </option>
                  );
               }
            });
         });
      }
   };
   const renderMemberInProject = () => {
      if (projectDetail !== null || projectDetail !== undefined) {
         return (
            <div className='mx-auto'>
               {projectDetail?.members.slice(0, 3).map((item: any) => {
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
               })}
               {projectDetail.members.length > 3 ? (
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
               <button
                  type='button'
                  className='btn btn-success mx-1'
                  data-bs-toggle='modal'
                  data-bs-target='#addMemberModal'
                  style={{
                     borderRadius: '55%',
                  }}
               >
                  <i className='fa-solid fa-plus'></i>
               </button>
               {renderModalAddMember()}
            </div>
         );
      }
   };
   const renderAvailableMember = () => {
      let array: any = [];
      if (projectDetail !== null) {
         listUser.map((item: any) => {
            let inValid: boolean = false;
            for (const member of projectDetail.members) {
               if (item.userId === member.userId) {
                  inValid = true;
               }
            }
            if (!inValid) {
               array.push(item);
            }
         });
      }
      return array.map((item: any) => {
         return (
            <div
               key={item.userId}
               className='container mx-auto my-3'
            >
               <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                     <img
                        style={{
                           height: '50px',
                           width: '50px',
                           borderRadius: '50%',
                        }}
                        className='img-thumbnail'
                        src={item.avatar}
                     />
                     <div className='ms-3'>
                        <p className='p-0 m-0'>{item.name}</p>
                        <span>User ID: {item.userId}</span>
                     </div>
                  </div>
                  <div>
                     <button
                        onClick={() => {
                           let value: UserProjectModel = {
                              projectId: projectDetail.id,
                              userId: item.userId,
                           };
                           dispatch(
                              updateUserProjectAction(projectDetail.id, value)
                           );
                        }}
                        className='btn btn-success'
                     >
                        Add
                     </button>
                  </div>
               </div>
            </div>
         );
      });
   };
   const renderAddedMember = () => {
      if (projectDetail !== null) {
         return projectDetail.members.map((item: any) => {
            return (
               <div
                  key={item.userId}
                  className='w-100 container mx-auto my-3'
               >
                  <div className='d-flex justify-content-between'>
                     <div className='d-flex'>
                        <img
                           style={{
                              height: '50px',
                              width: '50px',
                              borderRadius: '50%',
                           }}
                           className='img-thumbnail'
                           src={item.avatar}
                        />
                        <div className='ms-3'>
                           <p className='p-0 m-0'>{item.name}</p>
                           <span>User ID: {item.userId}</span>
                        </div>
                     </div>
                     <div>
                        <button
                           onClick={() => {
                              let value: UserProjectModel = {
                                 projectId: projectDetail.id,
                                 userId: item.userId,
                              };
                              dispatch(
                                 removeUserProjectAction(
                                    projectDetail.id,
                                    value
                                 )
                              );
                           }}
                           className='btn btn-danger'
                        >
                           Remove
                        </button>
                     </div>
                  </div>
               </div>
            );
         });
      }
   };
   const renderModalAddMember = () => {
      return (
         <>
            <div
               className='modal fade'
               id='addMemberModal'
               tabIndex={-1}
               aria-labelledby='exampleModalLabel'
               aria-hidden='true'
            >
               <div className='modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable'>
                  <div className='modal-content'>
                     <div className='modal-header'>
                        <h1
                           className='modal-title fs-5'
                           id='exampleModalLabel'
                        >
                           Add Member
                        </h1>
                        <button
                           type='button'
                           className='btn-close'
                           data-bs-dismiss='modal'
                           aria-label='Close'
                        />
                     </div>
                     <div className='modal-body'>
                        <div className='container'>
                           <div className='row mx-auto'>
                              <div className='col-6'>
                                 <div
                                    style={{ height: '400px' }}
                                    className='overflow-y-auto'
                                 >
                                    <div className='h-50'>
                                       <h4 className='text-center text-success'>
                                          Available Member
                                       </h4>
                                       {renderAvailableMember()}
                                    </div>
                                 </div>
                              </div>
                              <div className='col-6'>
                                 <div
                                    style={{ height: '400px' }}
                                    className='overflow-y-auto'
                                 >
                                    <div className='h-50'>
                                       <h4 className='text-center text-danger'>
                                          Added Member
                                       </h4>
                                       {renderAddedMember()}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='modal-footer'>
                        <button
                           type='button'
                           className='btn btn-secondary'
                           data-bs-dismiss='modal'
                        >
                           Close
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   };
   const renderCreateTaskForm = () => {
      return (
         <div
            style={{ width: '40%' }}
            className='offcanvas offcanvas-end'
            tabIndex={-1}
            id='createTaskCanvas'
         >
            <div className='offcanvas-header'>
               <h3 className='offcanvas-title'>Create New Task</h3>
               <button
                  id='closeForm'
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='offcanvas'
                  aria-label='Close'
               />
            </div>
            <div className='offcanvas-body'>
               <form className='container'>
                  <div className='mb-3'>
                     <label
                        aria-required='true'
                        className='form-label required'
                     >
                        Task Name
                     </label>
                     <input
                        name='taskName'
                        type='text'
                        className='form-control'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                     />
                     {formik.errors.taskName ? (
                        <span className='text-danger'>
                           Task name is required
                        </span>
                     ) : null}
                  </div>
                  <div className='mb-3'>
                     <label className='form-label required'>Status</label>
                     <select
                        name='statusId'
                        onChange={(e) => {
                           handleOnSelect(e);
                        }}
                        className='form-select'
                     >
                        {taskStatus.map((item: any) => {
                           return (
                              <option
                                 key={item.statusId}
                                 value={item.statusId}
                              >
                                 {item.statusName}
                              </option>
                           );
                        })}
                     </select>
                  </div>
                  <div className='mb-3 row'>
                     <div className='col-6'>
                        <label className='form-label required'>Priority</label>
                        <select
                           name='priorityId'
                           onChange={(e) => {
                              handleOnSelect(e);
                           }}
                           className='form-select'
                        >
                           <option value={1}>High</option>
                           <option value={2}>Medium</option>
                           <option value={3}>Low</option>
                           <option value={4}>Lowest</option>
                        </select>
                     </div>
                     <div className='col-6'>
                        <label className='form-label required'>Task Type</label>
                        <select
                           name='typeId'
                           onChange={(e) => {
                              handleOnSelect(e);
                           }}
                           className='form-select'
                        >
                           <option value={1}>Bug</option>
                           <option value={2}>New Task</option>
                        </select>
                     </div>
                  </div>
                  <div className='mb-3'>
                     <label className='form-label required'>Assignees</label>
                     <select
                        onChange={(e) => {
                           handleOnAddAssignedMember(e);
                        }}
                        name='listUserAsign'
                        className='form-select pointer'
                        multiple
                     >
                        {' '}
                        {projectDetail !== null &&
                        projectDetail.members.length === 0 ? (
                           <option
                              disabled={true}
                              className='cursor'
                           >
                              No member in project
                           </option>
                        ) : (
                           ''
                        )}
                        {projectDetail !== null
                           ? projectDetail.members.map((item: any) => {
                                return (
                                   <option
                                      className='cursor'
                                      key={item.userId}
                                      value={item.userId}
                                   >
                                      ID: <>{item.userId}</>&nbsp; Name:{' '}
                                      <>{item.name}</>
                                   </option>
                                );
                             })
                           : ''}
                     </select>
                     <label className='form-label mt-4'>Will be added</label>
                     <select
                        onChange={(e) => {
                           handleOnRemoveAssignedMember(e);
                        }}
                        name='listUserAsign'
                        className='form-select pointer'
                        multiple
                        data-live-search='true'
                     >
                        {renderAssignedMember()}
                     </select>
                  </div>
                  <div className='mb-3'>
                     <label className='form-label required'>
                        Total Estimated Hours
                     </label>
                     <input
                        onChange={formik.handleChange}
                        defaultValue={0}
                        min={0}
                        name='originalEstimate'
                        type='number'
                        className='form-control'
                     />
                  </div>
                  <div className='mb-3'>
                     <label className='form-label required'>Description</label>
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
                        onClick={(e) => {
                           handleOnSubmitForm(e);
                        }}
                     >
                        Create
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   };
   const handleOnSubmitForm = (e: any) => {
      e.preventDefault();
      formik.setFieldValue('listUserAsign', listAssignedUser);
      formik.handleSubmit();
   };

   return (
      <div className='container'>
         <div className='d-flex justify-content-between align-items-baseline'>
            <div className='d-flex justify-content-start mt-5 align-items-center'>
               <h1>Project Dashboard</h1>
               <div className='ms-5 d-flex align-items-baseline'>
                  <h5 className='me-3'>Member:</h5>
                  {projectDetail !== null ? renderMemberInProject() : ''}
               </div>
            </div>
            <div>
               <button
                  data-bs-toggle='offcanvas'
                  data-bs-target='#createTaskCanvas'
                  aria-controls='offcanvasExample'
                  className='btn btn-primary'
               >
                  New task
               </button>
               {renderCreateTaskForm()}
            </div>
         </div>
         <div className='row'>
            {projectDetail !== null
               ? projectDetail.lstTask.map((item: any) => {
                    return (
                       <div
                          key={item.statusId}
                          className='col-3'
                       >
                          <Status
                             projectDetail={projectDetail}
                             lstTaskDeTail={item.lstTaskDeTail}
                             statusId={item.statusId}
                             statusName={item.statusName}
                          />
                       </div>
                    );
                 })
               : ''}
         </div>
      </div>
   );
};

export default ProjectDashboard;
