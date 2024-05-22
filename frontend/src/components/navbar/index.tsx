import * as S from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { IUser } from "../../interfaces/IUser";
import { IOrganization } from "../../interfaces/IOrganization";
import { logout } from "../../services/auth.service";
import { Notifications } from "../notifications";
import NotificationsContext from "../../contexts/notificationContext";
import { AnimatePresence, motion } from "framer-motion";
import { getNotifications } from "../../services/notifications.service";
import TokenContext from "../../contexts/tokenContext";
import { MobileNavbar } from "./components/mobileNavbar";
import { DesktopNavbar } from "./components/desktopNavbar";

export function Navbar() {
  const route = useLocation();
  const navigate = useNavigate();

  const [userLogged, setUserLogged] = useState<IUser | IOrganization>();
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [newNotification, setNewNotification] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const { notifications, setNotifications } = useContext(NotificationsContext);
  const { setToken } = useContext(TokenContext);

  const handleWindowSizeChange = () => {
    setScreenWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])


  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (tokenStorage) {
      setToken(tokenStorage);
      listNotifications(tokenStorage);
    }

    if (user && tokenStorage) {
      const userObject = JSON.parse(user);

      setUserLogged(userObject);
    }
  }, []);

  useEffect(() => {
    const newNotifications = notifications.some((n) => n.isViewed === false);

    setNewNotification(newNotifications);
  }, [notifications]);

  async function listNotifications(token: string) {
    const res = await getNotifications(token);

    if (res.data) {
      setNotifications(res.data);
    }
  }

  const logoutUser = () => {
    setUserLogged(undefined);
    logout();

    navigate("/login");
  };

  return (
    <S.Nav>
      {screenWidth < 750 ? (
         <MobileNavbar
         userLogged={userLogged}
         newNotification={newNotification}
         isNotificationsVisible={isNotificationsVisible}
         setIsNotificationsVisible={setIsNotificationsVisible}
         route={route}
         logoutUser={logoutUser}
       />
     ) : (
       <DesktopNavbar
         userLogged={userLogged}
         newNotification={newNotification}
         isNotificationsVisible={isNotificationsVisible}
         setIsNotificationsVisible={setIsNotificationsVisible}
         route={route}
         logoutUser={logoutUser}
       />
      )}

      {isNotificationsVisible && userLogged && (
        <AnimatePresence>
          <motion.div
            initial={{
              opacity: 0,
              right: -200,
              top: 0,
              position: "absolute",
              zIndex: "999999",
            }}
            animate={{ opacity: 1, right: 0, top: 0, position: "absolute" }}
            transition={{ duration: 0.2 }}
          >
            <Notifications setIsVisible={setIsNotificationsVisible} />
          </motion.div>
        </AnimatePresence>
      )}
    </S.Nav>
  );
}
