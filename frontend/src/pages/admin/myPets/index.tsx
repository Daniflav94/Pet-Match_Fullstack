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

export function MyPets() {
  const [listPets, setListPets] = useState<IPet[]>([]);
  const [userLogged, setUserLogged] = useState<IOrganization>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userObject = JSON.parse(user);
      listAll(userObject.uid);
      setUserLogged(userObject);
    } else if (!user || userLogged?.type === "user") {
      navigate("/login");
    }
  }, []);

  async function listAll(uid: string) {
    const res = await listMyPets(uid);

    const resOrdered = res.data?.sort(function (a, b) {
      return a.isAdopt < b.isAdopt ? -1 : a.isAdopt > b.isAdopt ? 1 : 0;
    });

    if (resOrdered) {
      setListPets(resOrdered);
    }

    setIsLoading(false);
  }

  async function handleDeletePet(uid: string) {
    await deletePet(uid);

    await listAll(userLogged?.uid as string);
  }

  return (
    <S.Container>
      <RegisterPet user={userLogged} listAll={listAll} />
      {isLoading ? (
        <Spinner size="lg" color="warning" style={{marginTop: "13rem"}}></Spinner>
      ) : (
        <>
          {listPets.length > 0 && (
            <S.ContainerCards>
              {listPets.map((pet) => (
                <Card
                  key={pet.uid}
                  pet={pet}
                  typeUser={userLogged?.type}
                  deletePet={handleDeletePet}
                />
              ))}
            </S.ContainerCards>
          )}
          {listPets.length === 0 && (
            <S.ContainerDefaultValue>
              <S.Text>Você ainda não tem peludinhos cadastrados por enquanto! Comece preenchendo o formulário acima.</S.Text>
              <S.Image src={cute} />
            </S.ContainerDefaultValue>
          )}
        </>
      )}
    </S.Container>
  );
}
