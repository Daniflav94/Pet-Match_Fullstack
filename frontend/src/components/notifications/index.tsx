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

type Props = {
  setIsVisible: (visible: boolean) => void;
  token: string;
};

export function Notifications({ setIsVisible, token }: Props) {
  const { notifications, setNotifications } = useContext(NotificationsContext);

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

  return (
    <S.Container>
      <S.ContentTitle>
        <S.Title>Notificações</S.Title>
        <X color="#707070" onClick={() => setIsVisible(false)} />
      </S.ContentTitle>
      <S.ContainerNotifications>
        <Tabs variant="underlined" color="warning" className="">
          <Tab key="not-viewed" title="Não lidas">
            {newNotification ? (
              <>
                {notifications.map((item, key) => (
                  <div key={key}>
                    {!item.isViewed && (
                      <Notification
                        notification={item}
                        markAsViewed={markNotificationAsViewed}
                        listNotifications={listNotifications}
                        token={token}
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
          </Tab>
          <Tab key="viewed" title="Lidas">
            {oldNotifications ? (
              <>
                {notifications.map((item, key) => (
                  <div key={key}>
                    {item.isViewed && (
                      <Notification
                        notification={item}
                        markAsViewed={markNotificationAsViewed}
                        listNotifications={listNotifications}
                        token={token}
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
          </Tab>
        </Tabs>
      </S.ContainerNotifications>
    </S.Container>
  );
}