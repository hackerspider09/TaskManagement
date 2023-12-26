import React,{useEffect,useState,useContext} from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { AxiosInstance,addAuthToken } from '../utils/axiosconfig';
import { setToken,getToken } from '../utils/utils';
import { APIContext } from '../context/APIcontext';





const PieChartComponent = ({pieData}) => {
  // console.log(pieData)

  return (
    <div>
        <PieChart
      series={[
        {
          data: [
            { id: 0, value: pieData?.totalTask, label: 'Total Task' },
            { id: 1, value: pieData?.completedTask, label: 'Completed Task' },
            { id: 2, value: pieData?.incompleteTask, label: 'Incomplete Task' },
          ],
        },
      ]}
      // width={400}
      height={200}
    />
    </div>
  )
}

export default PieChartComponent


