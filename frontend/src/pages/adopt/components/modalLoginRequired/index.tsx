import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as S from "./styles";
import { Link } from "react-router-dom";
import warning from "../../../../assets/gifs/warning.gif"

export function ModalLoginRequired() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="inset-0 fixed bg-black/50" />
      <Dialog.Content>
        <S.Container>
          <Dialog.Close>
            <S.IconClose>
              <X size={25} color="#ABB2BF" />
            </S.IconClose>
          </Dialog.Close>
          <>
            <S.Gif src={warning} />
            <S.Title>Login necessário</S.Title>
            <S.Subtitle>
              Faça login para navegar na página de adoção e ter a chance de
              adotar um novo amigo!
            </S.Subtitle>
            <Link to="/login">
              <S.Button>Fazer login</S.Button>
            </Link>
          </>
        </S.Container>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
