

import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
        <div className="">
          <Outlet />
        </div>
    </div>
  )
}

export default AuthLayout
