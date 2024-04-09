import * as S from "./styles";
import dog from "../../../../assets/images/25.png";
import { INotification } from "../../../../interfaces/INotification";
import { CustomButton } from "../../../customButton";
import { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Dialog } from "@radix-ui/themes";

type Props = {
  data: INotification;
  acceptAdoption: (isAccept: boolean, message?: string) => void;
  setConfirmAdoptionDenied: (param: boolean) => void;
};

export function DeniedAdoption({
  data,
  acceptAdoption,
  setConfirmAdoptionDenied,
}: Props) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  return (
    <S.Container>
      <S.Rounded>
        <S.Image src={dog} alt="" />
      </S.Rounded>

      <S.Title>Tem certeza que deseja negar essa adoção?</S.Title>
      <S.Description>
        Você está muito perto de conseguir a adoção do{" "}
        {data.formAdoption?.pet.name}. Mas caso após avaliar os
        dados do solicitante viu que é a melhor escolha, descreva abaixo os
        motivos da recusa para darmos um retorno ao solicitante.
      </S.Description>
      <Textarea
        placeholder="Descreva aqui os motivos"
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      <S.ContainerButtons>
        <CustomButton
          type="button"
          color="#ECB159"
          border="1px solid #ECB159"
          width="250px"
          onClick={() => setConfirmAdoptionDenied(false)}
        >
          Voltar
        </CustomButton>

        <Dialog.Close>
          <CustomButton
            type="button"
            backgroundColor="#d74f33"
            hoverBackgroundColor="#e05e44"
            width="250px"
            onClick={() =>
              message.length > 5
                ? acceptAdoption(false, message)
                : setError("Campo de descrição é obrigatório.")
            }
          >
            Recusar adoção
          </CustomButton>
        </Dialog.Close>
      </S.ContainerButtons>
    </S.Container>
  );
}
