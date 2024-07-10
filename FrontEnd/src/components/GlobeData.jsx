import React, { useEffect, useMemo, useState } from 'react'

export const UserContext =React.createContext();

const GlobeData = ({children}) => {
    const [LoggedIn,setLog]=useState(()=>{
      const sdata=localStorage.getItem('LoggedIn');
      return sdata?JSON.parse(sdata):null;
    });
    const [adminaa,setadm]=useState(()=>{
      const addata=localStorage.getItem('adminaa');
      return addata?JSON.parse(addata):null;
    });
    const [ADOUser,setADOUser]=useState(()=>
    {
      const sdata=localStorage.getItem('ADOUser');
      return sdata?JSON.parse(sdata):null;
    });
    const GUserdatamod = useMemo(() => {
        return ({
            ADOUser,LoggedIn,adminaa,
            LogIn:(Udata)=>{setADOUser(Udata);setLog(true);setadm(Udata.admin)},
            Update:(Ndata)=>{
              setADOUser(Ndata);
            },
            LogOut:()=>{setADOUser({})
            localStorage.removeItem('ADOUser');
            localStorage.removeItem('LoggedIn');
            localStorage.removeItem('adminaa');
            ;setLog(false);setadm(false)}
        });
    },[ADOUser,LoggedIn,adminaa]);
    useEffect(()=>
    {
      localStorage.setItem('ADOUser',JSON.stringify(ADOUser));
      localStorage.setItem('LoggedIn',JSON.stringify(LoggedIn));
      localStorage.setItem('adminaa',JSON.stringify(adminaa));
    },[ADOUser,LoggedIn,adminaa])
  return (
    <UserContext.Provider value={GUserdatamod}>
        {children}
    </UserContext.Provider>
  )
}

export default GlobeData