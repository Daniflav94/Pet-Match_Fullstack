import { useEffect, useState } from "react";
import * as S from "./styles";
import cute from "../../../assets/images/2.png";
import { RegisterPet } from "./components/registerPet";
import { deletePet, listMyPets } from "../../../services/pet.service";
import { IOrganization } from "../../../interfaces/IOrganization";
import { useNavigate } from "react-router-dom";
import { IPet } from "../../../interfaces/IPet";
import { Card } from "../../../components/card/card";
import { Spinner } from "@nextui-org/react";
import { getCurrentUser } from "../../../services/auth.service";

export function MyPets() {
  const [listPets, setListPets] = useState<IPet[]>([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState<IOrganization>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUser();

    if (token) {
      listAll(token);
      setToken(token);
    } else if (!token || user?.type === "user") {
      navigate("/login");
    }
  }, []);

  async function getUser() {
    const res = await getCurrentUser(token);

    if (res.data) {
      setUser(res.data);
    }    
  }

  async function listAll(token: string) {
    const res = await listMyPets(token);

    const resOrdered = res.data?.sort(function (a: { isAdopt: number; }, b: { isAdopt: number; }) {
      return a.isAdopt < b.isAdopt ? -1 : a.isAdopt > b.isAdopt ? 1 : 0;
    });

    if (resOrdered) {
      setListPets(resOrdered);
    }

    setIsLoading(false);
  }

  async function handleDeletePet(id: string) {
    await deletePet(id, token);

    await listAll(token);
  }

  return (
    <S.Container>
      <RegisterPet token={token} listAll={listAll} />
      {isLoading ? (
        <Spinner
          size="lg"
          color="warning"
          style={{ marginTop: "13rem" }}
        ></Spinner>
      ) : (
        <>
          {listPets.length > 0 && (
            <S.ContainerCards>
              {listPets.map((pet) => (
                <Card
                  key={pet.id}
                  pet={pet}
                  typeUser={user?.type}
                  deletePet={handleDeletePet}
                  token={token}
                />
              ))}
            </S.ContainerCards>
          )}
          {listPets.length === 0 && (
            <S.ContainerDefaultValue>
              <S.Text>
                Você ainda não tem peludinhos cadastrados por enquanto! Comece
                preenchendo o formulário acima.
              </S.Text>
              <S.Image src={cute} />
            </S.ContainerDefaultValue>
          )}
        </>
      )}
    </S.Container>
  );
}
