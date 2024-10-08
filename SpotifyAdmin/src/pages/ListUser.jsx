import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { toast } from 'react-toastify';
const ListUser = () => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);

      if (response.data.success) {
        setData(response.data.users);
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.post(`${url}/api/user/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchUsers();
      }
    } catch (error) {
      toast.error("Error occured");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="text-white">
      <p>All Users</p>
      <br />
      <div>
        <div className="grid grid-cols-[1fr_1fr_2fr] items-center gap-2.5 p-3 border border-white text-sm mr-5 bg-gray-800">
        <b>PFP</b>
          <b>Email</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_2fr] items_center gap-1 p-1 border border-white bg-gray-800 text-sm mr-5"
            >
              <img className="w-12" src={item.email} />
              <p>{item.password}</p>
              <p className='cursor-pointer' onClick={() => removeUser(item._id)}>Remove</p>
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default ListUser;
