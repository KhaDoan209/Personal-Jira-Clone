import { useDispatch } from 'react-redux';
import {
   getTaskDetailAction,
   removeTaskAction,
   updateTaskDetailAction,
} from '../redux/action/taskAction';
import { DispatchType, RootState } from '../redux/configStore';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { alertToast } from '../utils/alert';
import { Bounce } from 'react-toastify';
import { CreateTaskModel } from '../models/TaskModel';

type Props = { lstTaskDeTail: any; projectId: number };

const Task = ({ lstTaskDeTail, projectId }: Props) => {
   const arrayToRender: any[] = [];
   const arrayToStorage: any[] = [];
   const priorityList = [
      { priorityName: 'High', priorityId: 1 },
      { priorityName: 'Medium', priorityId: 2 },
      { priorityName: 'Low', priorityId: 3 },
      { priorityName: 'Lowest', priorityId: 4 },
   ];
   const taskTypeList = [
      { taskTypeName: 'Bug', typeId: 1 },
      { taskTypeName: 'New Task', typeId: 2 },
   ];
   const dispatch: DispatchType = useDispatch();
   const taskDetail = useSelector(
      (state: RootState) => state.taskReducer.taskDetail
   );

   if (taskDetail !== null) {
      taskDetail.assigness.map((item: any) => {
         arrayToStorage.push(item.id);
         let userToRender = {
            userId: item.id,
            name: item.name,
         };
         arrayToRender.push(userToRender);
      });
   }
   const editorRef: any = useRef();
   const projectDetail: any = useSelector(
      (state: RootState) => state.projectReducer.projectDetail
   );
   const taskStatus = useSelector(
      (state: RootState) => state.taskReducer.listStatus
   );
   const [listAssignedUser, setlistAssignedUser] =
      useState<any>(arrayToStorage);
   const formik = useFormik<CreateTaskModel>({
      enableReinitialize: true,
      initialValues: {
         listUserAsign: arrayToStorage,
         taskName: taskDetail?.taskName,
         description: taskDetail?.description,
         statusId: taskDetail?.statusId,
         originalEstimate: taskDetail?.originalEstimate,
         timeTrackingSpent: taskDetail?.timeTrackingSpent,
         timeTrackingRemaining: taskDetail?.timeTrackingRemaining,
         projectId: taskDetail?.projectId,
         typeId: taskDetail?.typeId,
         priorityId: taskDetail?.priorityId,
         taskId: taskDetail?.taskId,
      },
      onSubmit: (values: CreateTaskModel) => {
         if (listAssignedUser.length > 0) {
            values.listUserAsign = listAssignedUser;
         } else {
            values.listUserAsign = arrayToStorage;
         }
         values.timeTrackingRemaining =
            values.originalEstimate - values.timeTrackingSpent;
         dispatch(updateTaskDetailAction(values));
         document.getElementById('closeUpdateForm')?.click();
      },
   });
   const handleChange = () => {
      formik.setFieldValue('description', editorRef.current.getContent());
   };
   const handleOnSelect = (e: any) => {
      let { name, value } = e.target;
      return formik.setFieldValue(name, Number(value));
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
   const renderTaskDetailModal = () => {
      return (
         <div
            className='modal fade'
            id='taskDetailModal'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
         >
            <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
               <div className='modal-content'>
                  <div className='modal-header'>
                     <h1
                        className='modal-title fs-5'
                        id='exampleModalLabel'
                     >
                        Update Task
                     </h1>
                     <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        id='closeUpdateForm'
                     />
                  </div>
                  <div className='modal-body'>
                     <form
                        onSubmit={formik.handleSubmit}
                        className='container'
                     >
                        <div className='mb-3'>
                           <label
                              aria-required='true'
                              className='form-label required'
                           >
                              Task Name
                           </label>
                           <input
                              defaultValue={formik.initialValues.taskName}
                              name='taskName'
                              type='text'
                              className='form-control'
                              onChange={formik.handleChange}
                           />
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
                              <option value={taskDetail?.statusId}>
                                 {taskStatus.map((item: any) => {
                                    if (item.statusId == taskDetail?.statusId) {
                                       return (
                                          <React.Fragment key={item.statusId}>
                                             {item.statusName}
                                          </React.Fragment>
                                       );
                                    }
                                 })}
                              </option>
                              {taskStatus.map((item: any) => {
                                 if (item.statusId !== taskDetail?.statusId) {
                                    return (
                                       <option
                                          key={item.statusId}
                                          value={item.statusId}
                                       >
                                          {item.statusName}
                                       </option>
                                    );
                                 }
                              })}
                           </select>
                        </div>

                        <div className='mb-3 row'>
                           <div className='col-6'>
                              <label className='form-label required'>
                                 Priority
                              </label>
                              <select
                                 name='priorityId'
                                 onChange={(e) => {
                                    handleOnSelect(e);
                                 }}
                                 className='form-select'
                              >
                                 <option value={taskDetail?.priorityId}>
                                    {priorityList.map((item: any) => {
                                       if (
                                          item.priorityId ==
                                          taskDetail?.priorityId
                                       ) {
                                          return (
                                             <React.Fragment
                                                key={item.priorityId}
                                             >
                                                {item.priorityName}
                                             </React.Fragment>
                                          );
                                       }
                                    })}
                                 </option>
                                 {priorityList.map((item: any) => {
                                    if (
                                       item.priorityId !==
                                       taskDetail?.priorityId
                                    ) {
                                       return (
                                          <option
                                             key={item.priorityId}
                                             value={item.priorityId}
                                          >
                                             {item.priorityName}
                                          </option>
                                       );
                                    }
                                 })}
                              </select>
                           </div>
                           <div className='col-6'>
                              <label className='form-label required'>
                                 Task Type
                              </label>
                              <select
                                 name='typeId'
                                 onChange={(e) => {
                                    handleOnSelect(e);
                                 }}
                                 className='form-select'
                              >
                                 <option value={taskDetail?.typeId}>
                                    {taskTypeList.map((item: any) => {
                                       if (item.typeId == taskDetail?.typeId) {
                                          return (
                                             <React.Fragment key={item.typeId}>
                                                {item.taskTypeName}
                                             </React.Fragment>
                                          );
                                       }
                                    })}
                                 </option>
                                 {taskTypeList.map((item: any) => {
                                    if (item.typeId !== taskDetail?.typeId) {
                                       return (
                                          <option
                                             key={item.typeId}
                                             value={item.typeId}
                                          >
                                             {item.taskTypeName}
                                          </option>
                                       );
                                    }
                                 })}
                              </select>
                           </div>
                        </div>

                        <div className='mb-3'>
                           <label className='form-label required'>
                              Already In Project
                           </label>
                           <select
                              disabled={true}
                              name='listUserAsign'
                              className='form-select'
                              multiple
                           >
                              {arrayToRender !== null
                                 ? arrayToRender.map((item: any) => {
                                      return (
                                         <option
                                            className='cursor'
                                            key={item.userId}
                                            value={item.userId}
                                         >
                                            ID: <>{item.userId}</>&nbsp; Name:
                                            &nbsp;
                                            <>{item.name}</>
                                         </option>
                                      );
                                   })
                                 : ''}
                           </select>
                           <label className='form-label required mt-4'>
                              Assignees
                           </label>
                           <select
                              onChange={(e) => {
                                 handleOnAddAssignedMember(e);
                              }}
                              name='listUserAsign'
                              className='form-select pointer'
                              multiple
                           >
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
                           <label className='form-label required mt-4'>
                              Will be added
                           </label>
                           <i
                              className='d-block text-danger'
                              style={{ fontSize: '12px' }}
                           >
                              Attention: People in the box below will REPLACE
                              all people already in task
                           </i>
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
                              defaultValue={
                                 formik.initialValues.originalEstimate
                              }
                              min={0}
                              name='originalEstimate'
                              type='number'
                              className='form-control'
                           />
                           <label className='form-label required'>
                              Hour Spents
                           </label>
                           <input
                              onChange={formik.handleChange}
                              defaultValue={
                                 formik.initialValues.timeTrackingSpent
                              }
                              min={0}
                              name='timeTrackingSpent'
                              type='number'
                              className='form-control'
                           />
                           <label className='form-label required'>
                              Time Remaining
                           </label>
                           <input
                              disabled={true}
                              defaultValue={
                                 formik.initialValues.timeTrackingRemaining
                              }
                              min={0}
                              name='timeTrackingRemaining'
                              type='number'
                              className='form-control'
                           />
                        </div>
                        <div className='mb-3'>
                           <label className='form-label required'>
                              Description
                           </label>
                           <Editor
                              ref={editorRef}
                              onChange={handleChange}
                              apiKey='x2nbcvp3g9jw6nunby2juwkxq9umdvuaxiqew07kss4zx8ew'
                              onInit={(evt, editor: any) =>
                                 (editorRef.current = editor)
                              }
                              initialValue={formik.initialValues.description}
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
                     </form>
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
                        type='submit'
                        className='btn btn-primary'
                        onClick={(e) => {
                           handleOnSubmitForm(e);
                        }}
                     >
                        Update
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   };
   const handleOnAddAssignedMember = (e: any) => {
      let { value } = e.target;

      let userToAssigned = Number(value);
      if (listAssignedUser.length > 0) {
         let existed = false;
         listAssignedUser.map((item: any) => {
            if (item == userToAssigned) {
               alertToast.warning(
                  'User is already in the list',
                  'top-center',
                  Bounce,
                  'dark'
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
   const handleOnSubmitForm = (e: any) => {
      e.preventDefault();
      formik.setFieldValue('listUserAsign', listAssignedUser);
      formik.handleSubmit();
   };

   return (
      <div>
         {lstTaskDeTail.map((item: any) => {
            return (
               <div
                  style={{
                     boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                     borderRadius: '3px',
                  }}
                  key={item.taskId}
                  className='my-4 bg-light p-3 '
               >
                  <div className='d-flex align-items-baseline'>
                     <div className='w-100'>
                        <b
                           data-bs-toggle='modal'
                           data-bs-target='#taskDetailModal'
                           className='pointer link-primary'
                           onClick={() => {
                              dispatch(getTaskDetailAction(item.taskId));
                           }}
                        >
                           {item.taskName}
                        </b>
                     </div>
                     <div className='w-25'>
                        <div className='w-75 mx-auto'>
                           <button
                              onClick={() => {
                                 dispatch(
                                    removeTaskAction(projectId, item.taskId)
                                 );
                              }}
                              className='btn btn-danger px-2 py-1'
                           >
                              <i className='fa-regular fa-trash-can'></i>
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className='text-wrap d-flex mt-3'>
                     Assigned to: &nbsp;
                     {item.assigness.length > 0 ? (
                        item.assigness.map((item: any) => {
                           return (
                              <img
                                 key={item.id}
                                 style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                 }}
                                 className='mx-1'
                                 src={item.avatar}
                                 alt='...'
                              />
                           );
                        })
                     ) : (
                        <b>Unassigned</b>
                     )}
                  </div>
               </div>
            );
         })}
         {renderTaskDetailModal()}
      </div>
   );
};

export default Task;
