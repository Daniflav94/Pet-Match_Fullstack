import { INotification } from "../../../../../interfaces/INotification";
import { CustomButton } from "../../../../customButton";
import * as S from "../styles";

type Props = {
  data: INotification;
  age: number;
  acceptAdoption: (response: boolean) => void;
  showDeniedComponent: () => void;
  error: string;
};

export function AdminContentNotification({
  data,
  age,
  acceptAdoption,
  showDeniedComponent,
  error,
}: Props) {
  return (
    <>
      <S.Title>Solicitação de adoção</S.Title>
      <S.Content>
        <S.DataPet>
          <S.Subtitle>Deseja adotar:</S.Subtitle>
          <S.PetImage src={data.formAdoption?.pet?.photo} />
          <S.NamePet>{data.formAdoption?.pet?.name}</S.NamePet>
        </S.DataPet>
        <S.DataUser>
          <S.Subtitle>Dados solicitante:</S.Subtitle>
          <span style={{ textAlign: "center" }}>
            {data.formAdoption?.name}, {age} anos - {data.formAdoption?.city} /{" "}
            {data.formAdoption?.state}{" "}
          </span>

          <span style={{ textAlign: "center", marginBottom: "1rem" }}>
            {data.formAdoption?.email}
          </span>

          <div>
            <S.DualInfo>
              <span>
                <b>Mora em:</b> {data.formAdoption?.liveIn}
              </span>

              <span>
                <b>Tem crianças: </b>
                {data.formAdoption?.children}
              </span>
            </S.DualInfo>

            <S.DualInfo>
              <span>
                <b>Seria primeiro pet: </b>
                {data.formAdoption?.isFirstPet}
              </span>
              <span>
                <b>Possui outros pets: </b>
                {data.formAdoption?.pets}
              </span>
            </S.DualInfo>

            {data.formAdoption?.describePets && (
              <span>
                <b>Pets que possui:</b> {data.formAdoption?.describePets}
              </span>
            )}
          </div>
        </S.DataUser>
      </S.Content>

      {data.wasApproved === undefined && (
        <S.ContainerButtons>
          <CustomButton
            type="button"
            backgroundColor="#93bf85"
            width="250px"
            hoverBackgroundColor="#8bb57f"
            onClick={() => acceptAdoption(true)}
          >
            Aprovar adoção
          </CustomButton>

          <CustomButton
            type="button"
            color="#d74f33"
            border="1px solid #d74f33"
            width="250px"
            onClick={() => showDeniedComponent()}
          >
            Recusar adoção
          </CustomButton>
        </S.ContainerButtons>
      )}

      <S.ErrorMessage>{error}</S.ErrorMessage>
    </>
  );
}
