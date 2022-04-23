import React from "react";
import IAccount from "../interfaces/IAccount";

const UserContext = React.createContext<Omit<IAccount,'password'>|null>(null);
export default UserContext;