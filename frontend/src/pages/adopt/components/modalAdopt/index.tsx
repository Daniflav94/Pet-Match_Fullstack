import * as Dialog from "@radix-ui/react-dialog";
import { RadioGroup, Radio } from "@nextui-org/react";
import { X } from "lucide-react";
import * as S from "./styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { IPet } from "../../../../interfaces/IPet";
import { useEffect, useState } from "react";
import { SuccessMessage } from "../successMessage";
import { InputCustom } from "../../../../components/input";
import { IUser } from "../../../../interfaces/IUser";
import { IFormAdoption } from "../../../../interfaces/IFormAdoption";
import { createRequest } from "../../../../services/requestAdoption.service";

type FormAdopt = {
  name: string;
  birthdate: string;
  email: string;
  state: string;
  city: string;
  liveIn: string;
  children: string;
  isFirstPet: string;
  pets: string;
  describePets?: string;
};

interface Props {
  pet: IPet;
  setIsFormSent: (param: boolean) => void;
}

export function ModalAdopt({ pet, setIsFormSent }: Props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [birthdate, setBirthdate] = useState('');

  const [userLogged, setUserLogged] = useState<IUser>();

  useEffect(() => {
    setError("")
    const user = localStorage.getItem("user");

    if (user) {
      const objectUser = JSON.parse(user);
      setUserLogged(objectUser);
      const birthdateUser = new Date(objectUser.birthdate)
      const birthdateString = birthdateUser.toLocaleDateString()
      setBirthdate(birthdateString)
    }
  }, []);


  const {
    handleSubmit,
    watch,
    setValue,
    control,
    register,
  } = useForm<FormAdopt>();

  const onSubmit: SubmitHandler<FormAdopt> = (data) => {
    setError("");
    setValue("name", userLogged?.name as string)
    setValue("email", userLogged?.email as string)
    setValue("birthdate", birthdate)
    setValue("state", userLogged?.state as string)
    setValue("city", userLogged?.city as string)


    const dataForm: IFormAdoption = {
      name: data.name,
      email: data.email,
      birthdate: birthdate,
      state: data.state,
      city: data.city,
      liveIn: data.liveIn,
      children: data.children,
      isFirstPet: data.isFirstPet,
      pets: data.pets,
      describePets: data.describePets,
      pet,
      uidUser: userLogged?.uid as string
    };

    sentFormAdoption(JSON.parse(JSON.stringify(dataForm)));

  };

  async function sentFormAdoption(form: IFormAdoption) {
    
    const res = await createRequest(form);

    if(!res.error){
      setSuccess(true);
      setIsFormSent(true);
    } else {
      setError("Ocorreu um erro ao tentar enviar o formulário. Tente novamente mais tarde.")
    }
  }

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
          {!success ? (
            <>
              <S.Title>Formulário de adoção</S.Title>
              <S.Subtitle>
                Preencha o formulário abaixo com seus dados, a Ong será
                notificada e irá verificar a compatibilidade de seu perfil com o
                do pet. Alguns campos já foram preenchidos de acordo com o seu cadastro.
              </S.Subtitle>

              <S.PetImage src={pet.photo} />
              <S.NamePet>{pet.name}</S.NamePet>

              <S.Form onSubmit={handleSubmit(onSubmit)}>
                <InputCustom
                  label="Nome completo"
                  color={"primary"}
                  control={control}
                  name={"name"}
                  isRequired
                  type="text"
                  defaultValue={userLogged?.name}
                  isDisabled
                />

                <S.DualInput>
                  <InputCustom
                    type="text"
                    label="Email"
                    color={"primary"}
                    control={control}
                    name={"email"}
                    isRequired
                    defaultValue={userLogged?.email}
                    isDisabled
                  />
                  <InputCustom
                    type="text"
                    label="Data de nascimento"
                    color={"primary"}
                    control={control}
                    name={"birthdate"}
                    isRequired
                    defaultValue={birthdate}
                    isDisabled
                  />
                </S.DualInput>

                <S.DualInput>
                  <InputCustom
                    type="text"
                    label="Estado"
                    color={"primary"}
                    control={control}
                    name={"state"}
                    isRequired
                    defaultValue={userLogged?.state}
                    isDisabled
                  />

                  <InputCustom
                    type="text"
                    label="Cidade"
                    color={"primary"}
                    control={control}
                    name={"city"}
                    isRequired
                    defaultValue={userLogged?.city}
                    isDisabled
                  />
                </S.DualInput>

                <RadioGroup
                  label="Tipo de residência:"
                  size="sm"
                  color="warning"
                  style={{ fontSize: "0.9rem" }}
                  onValueChange={(value) => setValue("liveIn", value)}
                  isRequired
                >
                  <S.DualInput>
                    <Radio value="Casa">Casa</Radio>
                    <Radio value="Apartamento">Apartamento</Radio>
                    <Radio value="Fazenda">Fazenda</Radio>
                  </S.DualInput>
                </RadioGroup>

                <RadioGroup
                  label="Possui crianças?"
                  size="sm"
                  color="warning"
                  style={{ fontSize: "0.9rem" }}
                  onValueChange={(value) => setValue("children", value)}
                  isRequired
                >
                  <S.DualInput>
                    <Radio value="Sim">Sim</Radio>
                    <Radio value="Não">Não</Radio>
                  </S.DualInput>
                </RadioGroup>

                <RadioGroup
                  label="Primeiro pet?"
                  size="sm"
                  color="warning"
                  style={{ fontSize: "0.9rem" }}
                  onValueChange={(value) => setValue("isFirstPet", value)}
                  isRequired
                >
                  <S.DualInput>
                    <Radio value="Sim">Sim</Radio>
                    <Radio value="Não">Não</Radio>
                  </S.DualInput>
                </RadioGroup>

                <RadioGroup
                  label="Possui outros animais?"
                  size="sm"
                  color="warning"
                  style={{ fontSize: "0.9rem" }}
                  onValueChange={(value) => setValue("pets", value)}
                  isRequired
                >
                  <S.DualInput>
                    <Radio value="Sim">Sim</Radio>
                    <Radio value="Não">Não</Radio>
                  </S.DualInput>
                </RadioGroup>

                {watch("pets") === "Sim" && (
                  <InputCustom
                    type="text"
                    label="Quais? Descreva:"
                    color="primary"
                    control={control}
                    name={"describePets"}
                    refs={register("describePets")}
                  />
                )}
                {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                <S.ContainerButtons>
                  <Dialog.Close>
                    <S.ButtonCancel
                      onClick={() => success && setSuccess(false)}
                    >
                      Cancelar
                    </S.ButtonCancel>
                  </Dialog.Close>
                  <S.ButtonSubmit type="submit">Enviar</S.ButtonSubmit>
                </S.ContainerButtons>
              </S.Form>
            </>
          ) : (
            <SuccessMessage />
          )}
        </S.Container>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
