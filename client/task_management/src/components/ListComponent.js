import React, { useEffect } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import PersonIcon from '@mui/icons-material/Person';

const ListComponent = ({ data }) => {
    
    useEffect(() => {
        // console.log("in listComponent");
    }, [data]);

    return (
        <div>
            <li className='bg-bgColor5 flex justify-center p-2 w-full  rounded-lg  text-white'>
              {data.status=='admin' ? <AdminPanelSettingsIcon /> : <PersonIcon />}  {data.name}
            </li>
        </div>
    );
};

export default ListComponent;
