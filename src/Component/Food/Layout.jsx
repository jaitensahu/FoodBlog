import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Headroom from 'react-headroom'

const Layout = () => {
  return (
    <div>
      <Headroom>
        <Header />
      </Headroom>
      <Outlet />
    </div>
  );
}

export default Layout
