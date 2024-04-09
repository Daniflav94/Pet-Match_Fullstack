import { IPet } from "../../interfaces/IPet";
import * as S from "./styles";
import dogicon from "../../assets/icons/dog-running.png";
import caticon from "../../assets/icons/gato.png";
import paw from "../../assets/icons/pata.png";
import gender from "../../assets/icons/genero.png";
import * as Dialog from "@radix-ui/react-dialog";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ModalAdopt } from "../../pages/adopt/components/modalAdopt";
import { Heart, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { addPetListFavorites, editPet, removePetListFavorites } from "../../services/pet.service";
import Lottie from "react-lottie";
import animationSuccess from "../../assets/animations/animationSuccess.json";
import { IUser } from "../../interfaces/IUser";
import { IOrganization } from "../../interfaces/IOrganization";
import { IFormAdoption } from "../../interfaces/IFormAdoption";

interface Props {
  pet: IPet;
  typeUser?: string;
  deletePet?: (id: string) => void;
  userLogged?: IUser | IOrganization;
  favorites?: PetFavorite[];
  listRequestAdoption?: IFormAdoption[];
}

interface PetFavorite {
  pet: IPet;
  uidUser: string;
}

export function Card({
  pet,
  typeUser,
  deletePet,
  userLogged,
  favorites,
  listRequestAdoption,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdopt, setIsAdopt] = useState(pet.isAdopt);
  const [isFormSent, setIsFormSent] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [idPetAdopted, setIdPetAdopted] = useState("");

  const defaultOptions = {
    loop: false,
    autoplay: playAnimation,
    animationData: animationSuccess,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function handleAdopt(adopt: boolean, uid: string) {
    setPlayAnimation(false);
    const edit = {
      isAdopt: adopt,
    };
    if (adopt == true) {
      setIdPetAdopted(uid);
      setPlayAnimation(true);
    }
    setTimeout(async () => {
      setIsAdopt(adopt);
      await editPet(pet.uid as string, edit);
    }, 700);
  }

  async function setPetFavorite(pet: IPet) {
    setIsFavorite(!isFavorite);
    if (userLogged && !isFavorite) {
      await addPetListFavorites(pet, userLogged.uid as string);

    }else if(userLogged && isFavorite){
      await removePetListFavorites(pet.uid as string, userLogged.uid as string)
    }
  }

  useEffect(() => {
    favorites?.map((p) => {
      if (p.pet.uid === pet.uid) {
        setIsFavorite(true);       
      }
    });
    
  }, []);

  useEffect(() => {
    listRequestAdoption?.map((p) => {
      if (p.pet.uid === pet.uid) {
        setIsFormSent(true);       
      }
    });
    
  }, []);

  return (
    <Dialog.Root>
      <S.ContainerCard
        style={
          isAdopt
            ? { filter: "grayscale(100%)", opacity: "0.6" }
            : { filter: "grayscale(0)", opacity: "1" }
        }
      >
        {playAnimation && !isAdopt && idPetAdopted === pet.uid && (
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
            onClick={() => deletePet && deletePet(pet.uid as string)}
          >
            <Trash2 color="#c15722" size={20} />
          </motion.button>
        )}

        <S.Image src={pet.photo} alt="" />
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
            <S.Button>Adotar</S.Button>
          </Dialog.Trigger>
        )}

        {!isFormSent && typeUser === undefined && <S.Button>Adotar</S.Button>}
        {!isFormSent && typeUser === "admin" && (
          <S.Button>
            Adotado?{" "}
            <button onClick={() => handleAdopt(true, pet?.uid as string)}>
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
            </button>
            <button onClick={() => handleAdopt(false, pet?.uid as string)}>
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
            </button>
          </S.Button>
        )}

        {isFormSent && <S.ButtonDisabled>Adoção solicitada</S.ButtonDisabled>}
      </S.ContainerCard>
      <ModalAdopt pet={pet} setIsFormSent={setIsFormSent} />
    </Dialog.Root>
  );
}
