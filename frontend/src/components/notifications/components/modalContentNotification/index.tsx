import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as S from "./styles";
import { useContext, useEffect, useState } from "react";
import { INotification } from "../../../../interfaces/INotification";
import { SuccessMessageAdopt } from "../successMessage";
import {
  createNotification,
  updateNotification,
} from "../../../../services/notifications.service";
import { DeniedAdoption } from "../deniedAdoption";
import { AdminContentNotification } from "./components/adminContent";
import { UserContentNotification } from "./components/userContent";
import { IUser } from "../../../../interfaces/IUser";
import { IFormAdoption } from "../../../../interfaces/IFormAdoption";
import TokenContext from "../../../../contexts/tokenContext";

type Props = {
  data: INotification;
  listNotifications: () => void;
};

export function ModalContentNotification({ data, listNotifications }: Props) {
  const [error, setError] = useState("");
  const [age, setAge] = useState<number>();
  const [success, setSuccess] = useState(false);
  const [confirmAdoptionDenied, setConfirmAdoptionDenied] = useState(false);

  const { token } = useContext(TokenContext);

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

    const birthdate = new Date((data.formAdoption?.user as IUser).birthdate as Date);
    const birthdate_year = birthdate?.getFullYear();
    const birthdate_month = birthdate?.getMonth();
    const birthdate_day = birthdate?.getDay();

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
      formAdoptionId: (data.formAdoption as IFormAdoption).id,
      wasApproved: isAccept,
      message: isAccept ? "" : message,
      idReceiver: (data.formAdoption?.user as IUser).id as string,
      mailTo: (data.formAdoption?.user as IUser).email
    };

    await updateNotification(data.id as string, {
      wasApproved: isAccept
    }, token);

    const res = await createNotification(notification, token);

    if (!res.errors) {
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
            <S.IconClose onClick={() => {setSuccess(false); listNotifications()}}>
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
