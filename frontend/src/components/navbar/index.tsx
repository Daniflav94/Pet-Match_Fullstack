import logo from "../../assets/icons/pet-house.png";
import heart from "../../assets/icons/coracao.png";
import bell from "../../assets/icons/sino.png";
import logoutIcon from "../../assets/icons/logout.png";
import * as S from "./styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { IUser } from "../../interfaces/IUser";
import { IOrganization } from "../../interfaces/IOrganization";
import { Tooltip } from "@nextui-org/react";
import { logout } from "../../services/auth.service";
import { Badge } from "@nextui-org/react";
import { Notifications } from "../notifications";
import NotificationsContext from "../../contexts/notificationContext";
import { AnimatePresence, motion } from "framer-motion";
import { getNotifications } from "../../services/notifications.service";
import TokenContext from "../../contexts/tokenContext";

export function Navbar() {
  const route = useLocation();
  const navigate = useNavigate();

  const [userLogged, setUserLogged] = useState<IUser | IOrganization>();
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [newNotification, setNewNotification] = useState(false);

  const { notifications, setNotifications } = useContext(NotificationsContext);
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (tokenStorage) {
      setToken(tokenStorage);
      listNotifications(tokenStorage)
    }

    if (user) {
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
      <S.Ul>
        <Link to="/">
          <S.Logo>
            <S.Img src={logo} alt="logo pet match" />
            <S.LogoText>pet match</S.LogoText>
          </S.Logo>
        </Link>
        <S.Div>
          <li>
            <Link to="/">
              <S.Span
                style={
                  route.pathname === "/"
                    ? { borderBottom: "2px solid #ECB159" }
                    : {}
                }
              >
                Início
              </S.Span>
            </Link>
          </li>
          <li>
            <Link to="/sobre">
              <S.Span
                style={
                  route.pathname === "/sobre"
                    ? { borderBottom: "2px solid #ECB159" }
                    : {}
                }
              >
                Sobre
              </S.Span>
            </Link>
          </li>
          {userLogged?.type != "admin" ? (
            <li>
              <Link to="/adotar">
                <S.Span
                  style={
                    route.pathname === "/adotar"
                      ? { borderBottom: "2px solid #ECB159" }
                      : {}
                  }
                >
                  Adotar
                </S.Span>
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/meus-pets">
                <S.Span
                  style={
                    route.pathname === "/meus-pets"
                      ? { borderBottom: "2px solid #ECB159" }
                      : {}
                  }
                >
                  Meus Pets
                </S.Span>
              </Link>
            </li>
          )}

          <S.Container>
            {userLogged?.type === "user" && (
              <li>
                <Link to="/favoritos">
                  <S.Container>
                    <S.IconHeart src={heart} alt="" />
                  </S.Container>
                </Link>
              </li>
            )}
            {userLogged?.type && (
              <li>
                <S.Container
                  onClick={() =>
                    setIsNotificationsVisible(!isNotificationsVisible)
                  }
                >
                  {newNotification ? (
                    <Badge content="" color="warning" shape="circle">
                      <S.IconBell src={bell} alt="" />
                    </Badge>
                  ) : (
                    <S.IconBell src={bell} alt="" />
                  )}
                </S.Container>
              </li>
            )}
            <li>
              {userLogged ? (
                <S.ContainerButtonsLogged>
                  <S.Container>
                    <S.Login>Olá, {userLogged.name.split(" ")[0]}</S.Login>
                  </S.Container>

                  <Tooltip content="Sair" placement="bottom-start" size="sm">
                    <button onClick={logoutUser}>
                      <S.Icon src={logoutIcon} />
                    </button>
                  </Tooltip>
                </S.ContainerButtonsLogged>
              ) : (
                <Link to="/login">
                  <S.Login>Entrar</S.Login>
                </Link>
              )}
            </li>
          </S.Container>
        </S.Div>
      </S.Ul>
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
            <Notifications
              setIsVisible={setIsNotificationsVisible}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </S.Nav>
  );
}
