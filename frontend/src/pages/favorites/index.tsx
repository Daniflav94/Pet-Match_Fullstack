import { useEffect, useState } from "react";
import * as S from "./styles";
import { IPet } from "../../interfaces/IPet";
import { Card } from "../../components/card/card";
import { IUser } from "../../interfaces/IUser";
import { getListFavorites } from "../../services/pet.service";
import image from "../../assets/images/pets-home.png";
import { Spinner } from "@nextui-org/react";
import { getCurrentUser } from "../../services/auth.service";

interface PetFavorite {
  pet: IPet;
  idUser: string;
}

export function Favorites() {
  const [listPets, setListPets] = useState<PetFavorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState< IUser>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setToken(token);

      getFavorites(token);
    }

    getUser();
  }, []);

  async function getUser() {
    const res = await getCurrentUser(token);

    setUser(res.data);
  }

  async function getFavorites(token: string) {
    setLoading(true);
    const res = await getListFavorites(token);

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
                      key={item.pet.id}
                      pet={item.pet}
                      typeUser={user?.type}
                      token={token}
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
