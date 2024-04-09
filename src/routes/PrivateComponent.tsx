import React from "react";
import { Navigate } from "react-router-dom";
interface IProps {
  children: React.ReactNode;
  userId: any;
}
const PrivateComponent: React.FC<IProps> = ({ userId, children }) => {
  console.log(typeof userId);
  if (userId.uid === "") return <Navigate to="/auth" />;
  return <>{children}</>;
};

export default PrivateComponent;
