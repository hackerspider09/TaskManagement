import React, { useEffect } from 'react';

const LiComponent = ({ title, path }) => {
    
    useEffect(() => {
        // console.log("in sidebar");
    }, [title, path]);

    return (
        <div>
            <li>
                <a href={`/channel/${path}`} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-bgColor6 dark:text-white">{title}</a>
            </li>
        </div>
    );
};

export default LiComponent;
