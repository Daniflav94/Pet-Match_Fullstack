import { INotification } from "../../../../../interfaces/INotification";
import * as S from "../styles";
import dog from "../../../../../assets/images/13.png";
import iconAttention from "../../../../../assets/images/area-restrita.png";
import { Dialog } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { IOrganization } from "../../../../../interfaces/IOrganization";
import { uploads } from "../../../../../utils/config";
import { IPet } from "../../../../../interfaces/IPet";

type Props = {
  data: INotification;
};

export function UserContentNotification({ data }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {data.wasApproved && (
        <S.ContentOrganization>
          <S.Title>Adoção aprovada!</S.Title>
          <S.Description>
            Que notícia maravilhosa, sua solicitação de adoção foi aprovada e
            agora você pode ir conhecer {(data.formAdoption?.pet as IPet).name}. Segue
            abaixo os dados da ONG:
          </S.Description>
          <S.Image src={`${uploads}/organizations/${((data.formAdoption?.pet as IPet).organization as IOrganization).photo}`} alt="" />

          <S.NameOrganization>
            {((data.formAdoption?.pet as IPet).organization as IOrganization).name}
          </S.NameOrganization>
          <S.ContainerDescription>
            <S.Description>
              <b>Endereço:</b> {((data.formAdoption?.pet as IPet).organization as IOrganization).street},{" "}
              {((data.formAdoption?.pet as IPet).organization as IOrganization).number},{" "}
              {((data.formAdoption?.pet as IPet).organization as IOrganization).neighborhood} -{" "}
              {((data.formAdoption?.pet as IPet).organization as IOrganization).city} /{" "}
              {((data.formAdoption?.pet as IPet).organization as IOrganization).state} -{" "}
              {((data.formAdoption?.pet as IPet).organization as IOrganization).cep}
              <br />
            </S.Description>

            <S.DualInfo>
              {((data.formAdoption?.pet as IPet).organization as IOrganization).phone ? (
                <S.Description>
                  <b>Telefones:</b> {((data.formAdoption?.pet as IPet).organization as IOrganization).cellPhone} |{" "}
                  {((data.formAdoption?.pet as IPet).organization as IOrganization).phone}
                </S.Description>
              ) : (
                <S.Description>
                  <b>Telefone:</b> {((data.formAdoption?.pet as IPet).organization as IOrganization).cellPhone}
                </S.Description>
              )}
              <S.Description>
                <b>Email:</b> {((data.formAdoption?.pet as IPet).organization as IOrganization).email}
              </S.Description>
            </S.DualInfo>

            <S.Description>
              <b>Horário de funcionamento:</b>{" "}
              {((data.formAdoption?.pet as IPet).organization as IOrganization).openingHours}
            </S.Description>
          </S.ContainerDescription>
        </S.ContentOrganization>
      )}
      {data.wasApproved === false && (
        <S.DataUser>
          <S.Title>Adoção recusada!</S.Title>

          <S.ContainerImage>
            <S.Icon src={iconAttention} alt="" />
            <S.Image src={dog} alt="" />
          </S.ContainerImage>

          <S.Description>
            Infelizmente seu pedido de adoção foi recusado. Mas não fique
            triste, temos muitos outros peludinhos aguardando um lar.
          </S.Description>
          <br />
          <S.Description>
            <b>Resposta: </b>
            {data.message}
          </S.Description>
          <Dialog.Close onClick={() => navigate("/adotar")}>
            <S.Button>Buscar outro peludinho</S.Button>
          </Dialog.Close>
        </S.DataUser>
      )}
    </>
  );
}
