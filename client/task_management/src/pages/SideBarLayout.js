import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
const SideBarLayout = () => {
  return (
    <>
    <SideBar />
    <Outlet />
  </>
  )
}

export default SideBarLayout