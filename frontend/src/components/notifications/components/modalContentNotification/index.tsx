import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { INotification } from "../../../../interfaces/INotification";
import { SuccessMessageAdopt } from "../successMessage";
import {
  createNotification,
  updateNotification,
} from "../../../../services/notifications.service";
import { DeniedAdoption } from "../deniedAdoption";
import { AdminContentNotification } from "./components/adminContent";
import { UserContentNotification } from "./components/userContent";

type Props = {
  data: INotification;
  listNotifications: () => void;
};

export function ModalContentNotification({ data, listNotifications }: Props) {
  const [error, setError] = useState("");
  const [age, setAge] = useState<number>();
  const [success, setSuccess] = useState(false);
  const [confirmAdoptionDenied, setConfirmAdoptionDenied] = useState(false);

  useEffect(() => {
    if (data.type === "request_adoption") {
      calcAge();
    }
  }, []);

  function calcAge() {
    const now = new Date();
    const current_year = now.getFullYear();
    const current_month = now.getMonth() + 1;
    const current_day = now.getDate();

    const birthdate = data.formAdoption?.birthdate as string;
    const birthdate_year = Number(birthdate.slice(6));
    const birthdate_month = Number(birthdate.slice(3, 5));
    const birthdate_day = Number(birthdate.slice(0, 2));

    let age = current_year - birthdate_year;

    if (
      (current_month < birthdate_month || current_month == birthdate_month) &&
      current_day < birthdate_day
    ) {
      age--;
    }

    setAge(age);
  }

  async function acceptAdoption(isAccept: boolean, message?: string) {
    const notification: INotification = {
      type: "response_adoption",
      formAdoption: data.formAdoption,
      uidReceiver: data.formAdoption?.uidUser as string,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      isViewed: false,
      wasApproved: isAccept,
      message: isAccept ? "" : message,
    };

    await updateNotification(data.uid as string, {
      wasApproved: isAccept,
    });

    const res = await createNotification(notification);

    if (!res.error) {
      if (isAccept) {
        setSuccess(true);
      } else {
        listNotifications();
      }
    } else {
      setError("Erro. Tente novamente mais tarde!");
    }
  }

  function showDeniedComponent() {
    setConfirmAdoptionDenied(true);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/50" />
      <Dialog.Content>
        <S.Container>
          <Dialog.Close>
            <S.IconClose onClick={() => listNotifications()}>
              <X size={25} color="#ABB2BF" />
            </S.IconClose>
          </Dialog.Close>
          {!success && !confirmAdoptionDenied && (
            <>
              {" "}
              {data.type === "request_adoption" ? (
                <AdminContentNotification
                  data={data}
                  age={age as number}
                  acceptAdoption={acceptAdoption}
                  showDeniedComponent={showDeniedComponent}
                  error={error}
                />
              ) : (
                <UserContentNotification data={data} />
              )}
            </>
          )}
          {success && !confirmAdoptionDenied && <SuccessMessageAdopt />}
          {!success && confirmAdoptionDenied && (
            <DeniedAdoption
              data={data}
              acceptAdoption={acceptAdoption}
              setConfirmAdoptionDenied={setConfirmAdoptionDenied}
            />
          )}
        </S.Container>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
