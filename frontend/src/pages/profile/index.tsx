import * as S from "./styles";
import { IUser } from "../../interfaces/IUser";
import { IOrganization } from "../../interfaces/IOrganization";
import { AdminProfile } from "./components/adminProfile";
import { UserProfile } from "./components/userProfile";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import { getCurrentUser } from "../../services/user.service";
import TokenContext from "../../contexts/tokenContext";

export function Profile() {
  const userLogged: IUser | IOrganization = JSON.parse(
    localStorage.getItem("user") || ""
  );
  const [user, setUser] = useState<IUser | IOrganization>(userLogged);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(TokenContext);

  const handleDataUser = async () => {
    setIsLoading(true);
    const res = await getCurrentUser(token);

    setUser(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    handleDataUser();
  }, []);

  return (
    <S.Container>
      <S.Title>Editar perfil</S.Title>
      {isLoading ? (
        <Spinner className="my-28" />
      ) : (
        <>
          {userLogged && userLogged?.type === "admin" ? (
            <AdminProfile user={user as IOrganization} token={token} />
          ) : (
            <UserProfile user={user as IUser} token={token} />
          )}
        </>
      )}
    </S.Container>
  );
}
