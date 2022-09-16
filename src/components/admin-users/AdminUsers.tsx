import { NavLink, Route, Routes } from 'react-router-dom';
import { adminUsersData } from '../../api';

const AdminUsers: React.FC = () => {
  return (
    <div>
      <ul className="admin-sections">
        {adminUsersData.map(user => (
          <li key={user.id}>
            <NavLink
              to={`${user.id}`}
              className={({ isActive }) => {
                return isActive ? 'admin-link-active' : '';
              }}
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path=":id" element={<AdminUser />} />
      </Routes>
    </div>
  );
};

export default AdminUsers;
