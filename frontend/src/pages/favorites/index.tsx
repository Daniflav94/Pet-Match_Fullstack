import { useEffect, useState } from "react";
import * as S from "./styles";
import { IPet } from "../../interfaces/IPet";
import { Card } from "../../components/card/card";
import { IUser } from "../../interfaces/IUser";
import { getListFavorites } from "../../services/pet.service";
import image from "../../assets/images/pets-home.png";
import { Spinner } from "@nextui-org/react";

interface PetFavorite {
  pet: IPet;
  uidUser: string;
}

export function Favorites() {
  const [listPets, setListPets] = useState<PetFavorite[]>([]);
  const [userLogged, setUserLogged] = useState<IUser>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userObject = JSON.parse(user);
      setUserLogged(userObject);

      getFavorites(userObject.uid);
    }
  }, []);

  async function getFavorites(uid: string) {
    setLoading(true);
    const res = await getListFavorites(uid);

    if (res.data) {
      setListPets(res.data);

      setLoading(false);
    }
  }

  return (
    <S.Container>
      <h2>Meus favoritos</h2>
      {loading ? (
        <Spinner color="default" size="lg" style={{marginTop: "8rem"}} />
      ) : (
        <>
          {listPets.length > 0 ? (
            <>
              <S.Text>
                Esses foram os pets que deram match com seu coração. O que acha
                de solicitar a adoção e conhecê-los pessoalmente?{" "}
              </S.Text>
              <S.ContainerCards>
                {listPets &&
                  listPets.map((item) => (
                    <Card
                      key={item.pet.uid}
                      pet={item.pet}
                      typeUser={userLogged?.type}
                      userLogged={userLogged}
                      favorites={listPets}
                    />
                  ))}
              </S.ContainerCards>
            </>
          ) : (
            <>
              <S.Text>
                Você ainda não favoritou um pet. Vá para a página de adoção e
                clique no ícone de coração no card do pet que te conquistar!
              </S.Text>
              <S.Image src={image} alt="" />
            </>
          )}
        </>
      )}
    </S.Container>
  );
}
