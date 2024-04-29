import { IPet } from "../../interfaces/IPet";
import * as S from "./styles";
import dogicon from "../../assets/icons/dog-running.png";
import caticon from "../../assets/icons/gato.png";
import paw from "../../assets/icons/pata.png";
import gender from "../../assets/icons/genero.png";
import * as Dialog from "@radix-ui/react-dialog";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ModalAdopt } from "../../pages/adopt/components/modalAdopt";
import { Heart, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { addPetListFavorites, editPet, removePetListFavorites } from "../../services/pet.service";
import Lottie from "react-lottie";
import animationSuccess from "../../assets/animations/animationSuccess.json";
import { IFormAdoption } from "../../interfaces/IFormAdoption";
import { uploads } from "../../utils/config";
import TokenContext from "../../contexts/tokenContext";

interface Props {
  pet: IPet;
  typeUser?: string;
  deletePet?: (id: string) => void;
  favorites?: PetFavorite[];
  listRequestAdoption?: IFormAdoption[];
}

interface PetFavorite {
  pet: IPet;
}

export function Card({
  pet,
  typeUser,
  deletePet,
  favorites,
  listRequestAdoption,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdopt, setIsAdopt] = useState(pet.isAdopt);
  const [isFormSent, setIsFormSent] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [idPetAdopted, setIdPetAdopted] = useState("");

  const { token } = useContext(TokenContext);

  const defaultOptions = {
    loop: false,
    autoplay: playAnimation,
    animationData: animationSuccess,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function handleAdopt(adopt: boolean, id: string) {
    setPlayAnimation(false);
    const edit = {
      isAdopt: adopt,
    };
    if (adopt == true) {
      setIdPetAdopted(id);
      setPlayAnimation(true);
    }
    setTimeout(async () => {
      setIsAdopt(adopt);
      await editPet(pet.id as string, edit, token as string);
    }, 700);
  }

  async function setPetFavorite(pet: IPet) {
    setIsFavorite(!isFavorite);
    if (token && !isFavorite) {
      await addPetListFavorites(pet.id as string, token);

    }else if(token && isFavorite){
      await removePetListFavorites(pet.id as string, token)
    }
  }

  useEffect(() => {
    favorites?.map((p) => {
      if ((p.pet as IPet).id === pet.id) {
        setIsFavorite(true);       
      }
    });
    
  }, [favorites]);

  useEffect(() => {
    listRequestAdoption?.map((p) => {
      if ((p.pet as IPet).id === pet.id) {
        setIsFormSent(true);       
      }
    });
    
  }, [listRequestAdoption]);

  return (
    <Dialog.Root>
      <S.ContainerCard
        style={
          isAdopt
            ? { filter: "grayscale(100%)", opacity: "0.6" }
            : { filter: "grayscale(0)", opacity: "1" }
        }
      >
        {playAnimation && !isAdopt && idPetAdopted === pet.id && (
          <S.Lottie>
            <Lottie options={defaultOptions} height={100} width={100} />
          </S.Lottie>
        )}
        {typeUser != "admin" ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ position: "absolute", top: "1rem", left: "1rem" }}
            onClick={() => setPetFavorite(pet)}
          >
            {isFavorite ? (
              <Heart
                size={24}
                color="#c15722"
                fill="#c15722"
                strokeWidth={1}
                absoluteStrokeWidth
              />
            ) : (
              <Heart
                size={24}
                color="#c15722"
                strokeWidth={1}
                absoluteStrokeWidth
              />
            )}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ position: "absolute", top: "1rem", left: "1rem" }}
            onClick={() => deletePet && deletePet(pet.id as string)}
          >
            <Trash2 color="#c15722" size={20} />
          </motion.button>
        )}

        <S.Image src={`${uploads}/pets/${pet.photo}`} alt="" />
        <S.Title>{pet.name}</S.Title>
        <S.ContentCard>
          <S.ContainerItem>
            <S.Icon src={pet.type === "dog" ? dogicon : caticon} />
            <S.Text>{pet.size}</S.Text>
          </S.ContainerItem>
          <S.ContainerItem>
            <S.Icon src={paw} />
            <S.Text>{pet.age}</S.Text>
          </S.ContainerItem>
          <S.ContainerItem>
            <S.Icon src={gender} />
            <S.Text>{pet.gender}</S.Text>
          </S.ContainerItem>
          <S.ContainerPersonality>
            {pet.personality.map((item, index) => (
              <S.ItemPersonality key={index}>{item}</S.ItemPersonality>
            ))}
          </S.ContainerPersonality>
          
        </S.ContentCard>

        {!isFormSent && typeUser === "user" && (
          <Dialog.Trigger>
            <S.Button data-testid="btn-adopt">Adotar</S.Button>
          </Dialog.Trigger>
        )}

        {!isFormSent && typeUser === undefined && <S.Button>Adotar</S.Button>}
        {!isFormSent && typeUser === "admin" && (
          <S.Button>
            Adotado?{" "}
            <span onClick={() => handleAdopt(true, pet?.id as string)}>
              {!isAdopt ? (
                <>
                  <ThumbsUp color="#008000" strokeWidth={1.5} size={18} />
                </>
              ) : (
                <ThumbsUp
                  color="#008000"
                  fill="#145e14"
                  strokeWidth={1.5}
                  size={18}
                />
              )}
            </span>
            <span onClick={() => handleAdopt(false, pet?.id as string)}>
              {!isAdopt ? (
                <ThumbsDown
                  color="#ec2300"
                  fill="#e46953"
                  strokeWidth={1.5}
                  size={18}
                />
              ) : (
                <ThumbsDown color="#ec2300" strokeWidth={1.5} size={18} />
              )}
            </span>
          </S.Button>
        )}

        {isFormSent && <S.ButtonDisabled>Adoção solicitada</S.ButtonDisabled>}
      </S.ContainerCard>
      <ModalAdopt pet={pet} setIsFormSent={setIsFormSent} />
    </Dialog.Root>
  );
}
