import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

const Users = (users) => {
  const usersArray = users.users
  return (
    <div style={{ marginTop: 30 }}>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {usersArray.map((user) => (
            <tr key={user.id}>
              <td>
                <Nav.Item>
                  <Nav.Link href={`/users/${user.id}`}>{user.name}</Nav.Link>
                </Nav.Item>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
