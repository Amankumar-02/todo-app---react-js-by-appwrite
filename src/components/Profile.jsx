import React, {useEffect, useState} from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import toast from 'react-hot-toast';

function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  useEffect(()=>{
    try {
      const getData = authService.account.get()
      getData.then(
        function(res){
          setUserDetails(res)
        }
      )
    } catch (error) {
      console.log(`Get Data error: `, error)
    }
  }, [])

  const logoutUser = async (e)=>{
    // e.preventDefault();
    try {
      await authService.logout();
      navigate('/');
      console.log(`Logout SuccessFully`)
      toast.success('Successfully Logout!');
    } catch (error) {
      console.error('Log-out failed:', error);
      toast.error(error.message);
    }
  }

  return (
    <>
      {userDetails ? (
        <>
          <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-left py-3 px-3 mt-2 rounded-md">
            <div>
              <p className="text-xl">Hello {userDetails.name}</p>
              <p className="">{userDetails.email}</p>
            </div>
            <div>
              <button className="bg-red-400 text-white p-1 rounded-md" onClick={logoutUser}>
                Logout
              </button>
            </div>
          </div>
          <TodoForm />
          {/* <Todos/> */}
          <Todos userId={userDetails.$id}/>
        </>
      ) : (
        <p className="mt-4">
          Please Login To see Profile{" "}
          <Link to="/">
            <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
              Login
            </span>
          </Link>
        </p>
      )}
    </>
  );
}

export default Profile;
