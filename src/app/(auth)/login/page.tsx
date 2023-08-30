"use client";
import { getDataService } from "@/redux/service/auth.service";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
export default function LoginPage() {
  // const [user, setUser] = useState([]);

  const name = useSelector((state) => state.authReducer.name);
  console.log("8888888888", name);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataService());
  }, []);

  return <div>Login page</div>;
}
