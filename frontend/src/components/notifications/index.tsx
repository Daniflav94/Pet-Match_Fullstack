import { X } from "lucide-react";
import NotificationsContext from "../../contexts/notificationContext";
import * as S from "./styles";
import { useContext, useEffect } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import notificationOff from "../../assets/images/alerta-de-notificacao.png";
import { Notification } from "./components/notification";
import {
  getNotifications,
  updateNotification,
} from "../../services/notifications.service";
import TokenContext from "../../contexts/tokenContext";

type Props = {
  setIsVisible: (visible: boolean) => void;
};

export function Notifications({ setIsVisible }: Props) {
  const { notifications, setNotifications } = useContext(NotificationsContext);
  const { token } = useContext(TokenContext);

  const newNotification = notifications.some((n) => n.isViewed === false);
  const oldNotifications = notifications.some((n) => n.isViewed === true);

  async function markNotificationAsViewed(id: string) {
    const notification = {
      isViewed: true,
    };

    await updateNotification(id, notification, token);
  }

  async function listNotifications() {
    const res = await getNotifications(token);

    if (res.data) {
      setNotifications(res.data);
    }
  }

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    
 }, []);

 
  function handleVisible() {
    document.body.style.overflowY = 'unset';
    setIsVisible(false)
  }  

  return (
    <S.Container>
      <S.ContentTitle>
        <S.Title>Notificações</S.Title>
        <X color="#707070" onClick={() => handleVisible()} />
      </S.ContentTitle>
      
        <Tabs variant="underlined" color="warning" className="">
          <Tab key="not-viewed" title="Não lidas">
          <S.ContainerNotifications>
            {newNotification ? (
              <>
                {notifications.map((item, key) => (
                  <div key={key}>
                    {!item.isViewed && (
                      <Notification
                        notification={item}
                        markAsViewed={markNotificationAsViewed}
                        listNotifications={listNotifications}
                      />
                    )}
                  </div>
                ))}
              </>
            ) : (
              <S.ContainerDefault>
                <S.Image src={notificationOff} alt="" />
                <S.Span>Você não tem novas notificações!</S.Span>
              </S.ContainerDefault>
            )}
            </S.ContainerNotifications>
          </Tab>
          <Tab key="viewed" title="Lidas">
          <S.ContainerNotifications>
            {oldNotifications ? (
              <>
                {notifications.map((item, key) => (
                  <div key={key}>
                    {item.isViewed && (
                      <Notification
                        notification={item}
                        markAsViewed={markNotificationAsViewed}
                        listNotifications={listNotifications}
                      />
                    )}
                  </div>
                ))}
              </>
            ) : (
              <S.ContainerDefault>
                <S.Image src={notificationOff} alt="" />
                <S.Span>Sem notificações lidas por enquanto!</S.Span>
              </S.ContainerDefault>
            )}
            </S.ContainerNotifications>
          </Tab>
        </Tabs>
      
    </S.Container>
  );
}


