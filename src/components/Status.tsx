import React from 'react';
import Task from './Task';

type Props = {
   lstTaskDeTail: any;
   statusId: number;
   statusName: string;
   projectDetail: any;
};

const Status = ({
   lstTaskDeTail,
   statusId,
   statusName,
   projectDetail,
}: Props) => {
   const renderStatusNameBackground = () => {
      switch (statusName) {
         case 'BACKLOG':
            return 'bg-dark-subtle px-2 d-inline';
         case 'SELECTED FOR DEVELOPMENT':
            return 'bg-primary-subtle px-2 d-inline';
         case 'IN PROGRESS':
            return 'bg-warning px-2 d-inline';
         case 'DONE':
            return 'bg-success px-2 d-inline text-white';
      }
   };
   return (
      <div
         style={{ minHeight: '400px' }}
         className='bg-body-tertiary p-2 mt-3'
      >
         <p
            style={{ borderRadius: '6px' }}
            className={renderStatusNameBackground()}
         >
            {statusName}
         </p>
         <div className='my-3'>
            <Task
               projectId={projectDetail.id}
               lstTaskDeTail={lstTaskDeTail}
            />
         </div>
      </div>
   );
};

export default Status;
