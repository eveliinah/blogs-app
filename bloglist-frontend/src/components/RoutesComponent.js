import { useSelector } from 'react-redux'
import Blogs from './Blogs'
import User from './User'
import Users from './Users'
import BlogDetails from './BlogDetails'

import { Route, Routes } from 'react-router-dom'

const RoutesComponent = ({ blogs }) => {
  const users = useSelector((state) => state.users)
  return (
    <Routes>
      <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />
      <Route path="/users/:id" element={<User users={users} />} />
      <Route path="/" element={<Blogs blogs={blogs} />} />
      <Route path="/users" element={<Users users={users} />} />
    </Routes>
  )
}

export default RoutesComponent
