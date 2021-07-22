import React, { useState, useEffect } from "react";
//import { toast } from "react-toastify";
import { getUser } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUser();
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <div className="row">
      <div className="col">
        <div className="d-flex flex-column align-items-center">
          {loading ?
            <div className="d-flex justify-content-center">
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div> : <>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
