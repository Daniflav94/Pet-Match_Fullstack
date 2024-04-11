import React, { useState, createContext } from "react";
import { INotification } from "../interfaces/INotification";

type PropsNotificationsContext = {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}

const DEFAULT_VALUE = {
  notifications : [{
      idReceiver: '',
      type: '', 
  }],
  setNotifications: () => {},
}

interface Props {
  children: React.ReactNode
}

export const NotificationsContext = createContext<PropsNotificationsContext>(DEFAULT_VALUE);

const NotificationsContextProvider: React.FC<Props> = ({children}) => {
  const [notifications, setNotifications] = useState(DEFAULT_VALUE.notifications);

  return(
      <NotificationsContext.Provider
          value={{
              notifications,
              setNotifications,
          }}
          >
          {children}
      </NotificationsContext.Provider>
  );
};

export {NotificationsContextProvider};
export default NotificationsContext;
