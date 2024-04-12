import { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import cute from "../../../assets/images/2.png";
import { RegisterPet } from "./components/registerPet";
import { deletePet, listMyPets } from "../../../services/pet.service";
import { IOrganization } from "../../../interfaces/IOrganization";
import { useNavigate } from "react-router-dom";
import { IPet } from "../../../interfaces/IPet";
import { Card } from "../../../components/card/card";
import { Spinner } from "@nextui-org/react";
import TokenContext from "../../../contexts/tokenContext";

export function MyPets() {
  const [listPets, setListPets] = useState<IPet[]>([]);
  const [user, setUser] = useState<IOrganization>();
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");

    if (token && userStorage) {
      listAll(token);
      setUser(JSON.parse(userStorage));

    } else if (!token || user?.type === "user") {
      navigate("/login");
    }
  }, []);

  async function listAll(token: string) {
    const res = await listMyPets(token);

    const resOrdered = res.data?.sort(function (
      a: { isAdopt: number },
      b: { isAdopt: number }
    ) {
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
      <RegisterPet listAll={listAll} />
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
