import { useParams } from 'react-router-dom';

import { getAdminUsers } from '../../api';

const AdminUser: React.FC = () => {
  const params = useParams();

  if (!params.id) return null;

  const id = parseInt(params.id, 10);
  const users = getAdminUsers();

  const user = users.filter(u => u.id === id)[0];

  return (
    <div>
      <div>
        <b>Id: </b>
        <span>{user.id.toString()}</span>
      </div>
      <div>
        <b>Is Admin: </b>
        <span>{user.isAdmin.toString()}</span>
      </div>
    </div>
  );
};

export default AdminUser;
