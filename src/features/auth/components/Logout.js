import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutAsync } from "../authSlice";

function Logout() {
    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(signOutAsync())
    })
  return <>
  {!user && <Navigate to='/' replace={true}></Navigate>}
  </>;
}

export default Logout;
