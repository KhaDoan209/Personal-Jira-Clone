import React, { useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { UpdateProjectModel, ProjectDetailModel } from '../models/ProjectModel';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DispatchType, RootState } from '../redux/configStore';
import {
   getProjectDetailAction,
   updateProjectAction,
} from '../redux/action/projectAction';
import { useNavigate } from 'react-router-dom';
type Props = {};
const ProjectDetail = (props: Props) => {
   const categoryList = [
      { value: 1, name: 'Dự án web' },
      { value: 2, name: 'Dự án phần mềm' },
      { value: 3, name: 'Dự án di động' },
   ];
   const navigate = useNavigate();
   const dispatch: DispatchType = useDispatch();
   const editorRef: any = useRef();
   const projectDetail = useSelector(
      (state: RootState) => state.projectReducer.projectDetail
   );
   const formik = useFormik<UpdateProjectModel>({
      enableReinitialize: true,
      initialValues: {
         id: projectDetail?.id,
         projectName: projectDetail?.projectName,
         description: projectDetail?.description,
         categoryId: projectDetail?.projectCategory.id,
         creator: projectDetail?.creator.id,
      },
      onSubmit: (values: UpdateProjectModel) => {
         dispatch(updateProjectAction(values.id, values));
         navigate('/');
      },
   });
   const handleOnSelect = (e: any) => {
      formik.setFieldValue('categoryId', e.target.value);
   };
   const handleChange = () => {
      formik.setFieldValue('description', editorRef.current.getContent());
   };
   return (
      <div className='container'>
         <div className='mx-auto w-75 my-4'>
            <h2>Update Project</h2>
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
                     defaultValue={projectDetail?.projectName}
                     name='projectName'
                     type='text'
                     className='form-control'
                     onChange={formik.handleChange}
                  />
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
                     <>
                        <option value={projectDetail?.projectCategory.id}>
                           {projectDetail?.projectCategory.name}
                        </option>
                        {categoryList.map((item: any) => {
                           if (
                              item.value !== projectDetail?.projectCategory.id
                           ) {
                              return (
                                 <option
                                    key={item.value}
                                    value={item.value}
                                 >
                                    {item.name}
                                 </option>
                              );
                           }
                        })}
                     </>
                  </select>
               </div>
               <div className='mb-3'>
                  <label className='form-label required'>Description</label>
                  <Editor
                     ref={editorRef}
                     onChange={handleChange}
                     apiKey='x2nbcvp3g9jw6nunby2juwkxq9umdvuaxiqew07kss4zx8ew'
                     onInit={(evt, editor: any) => (editorRef.current = editor)}
                     initialValue={projectDetail?.description}
                     init={{
                        height: 300,
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
               <button
                  type='submit'
                  className='btn btn-primary'
               >
                  Update
               </button>
            </form>
         </div>
      </div>
   );
};

export default ProjectDetail;
