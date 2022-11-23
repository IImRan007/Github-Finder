import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_GITHUB_URL}/users`
    );

    const data = await response.data;
    setUsers(data);
    setLoading(false);
  };

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.login}</h3>
          </div>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;