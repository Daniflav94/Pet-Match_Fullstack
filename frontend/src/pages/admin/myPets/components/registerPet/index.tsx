import { useContext, useState } from "react";
import * as S from "./styles";
import dogIcon from "../../../../../assets/icons/dog.svg";
import catIcon from "../../../../../assets/icons/cat.svg";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { IPet } from "../../../../../interfaces/IPet";
import { Input, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import addPhoto from "../../../../../assets/images/adicionar-foto.png";
import { CustomButton } from "../../../../../components/customButton";
import { createPet } from "../../../../../services/pet.service";
import { Toaster, toast } from "sonner";
import TokenContext from "../../../../../contexts/tokenContext";

type Props = {
  listAll: (id: string) => void;
};

export function RegisterPet({ listAll }: Props) {
  const { handleSubmit, watch, setValue, register, reset, control } =
    useForm<IPet>();

  const personalities = [
    "Ágil",
    "Alegre",
    "Amigável",
    "Bravo(a)",
    "Brincalhão",
    "Calmo(a)",
    "Carinhoso(a)",
    "Companheiro(a)",
    "Curioso(a)",
    "Dócil",
    "Enérgico(a)",
    "Fofo(a)",
    "Independente",
    "Inteligente",
    "Medroso(a)",
    "Meigo(a)",
    "Obediente",
    "Quieto(a)",
    "Sapeca",
    "Sociável",
  ];

  const { token } = useContext(TokenContext);

  const [personality, setPersonality] = useState<string[]>([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState(false);

  function handleSelect(value: string) {
    const newArray = value.split(",");

    setPersonality(newArray);
  }

  const handleImageChange = async (event: any) => {
    setLoadingImage(true);
    const file = event.target.files[0];
    if (file) {
      setLoadingImage(false);
      setImage(file);
    }
  };

  const onSubmit: SubmitHandler<IPet> = async (data) => {
    setLoading(true);
    const newPet = {
      type: data.type,
      name: data.name,
      age: data.age,
      gender: data.gender,
      size: data.size,
      photo: image,
      personality: personality,
    };

    if (!data.age || !data.gender || !data.size || image === "") {
      setError(true);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    const keys = Object.keys(newPet) as Array<keyof typeof newPet>;

    keys.forEach((key) => {
      if (key === "personality") {
        personality.forEach((item) => {
          formData.append(key, item as string);
        });
      } else {
        formData.append(key, newPet[key] as string | Blob);
      }
    });

    const res = await createPet(formData, token);

    if (!res.errors) {
      toast.success("Pet cadastrado com sucesso!");

      listAll(token);
    } else {
      toast.error("Ocorreu um erro ao cadastrar. Tente novamente mais tarde.");
    }

    setLoading(false);
    reset();
    setPersonality([]);
    setValue("gender", "");
    setValue("age", "");
    setValue("size", "");
    setImage(undefined);
    setError(false);
  };

  return (
    <S.Container>
      <S.ContainerRegister>
        <S.H3>Cadastre seu pet</S.H3>
        <S.ContentRegister>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.ContainerForm>
              <S.ContainerIcons>
                <S.ContentIcon
                  onClick={() => setValue("type", "dog")}
                  style={
                    watch("type") === "dog"
                      ? { border: "1px solid #ECB159" }
                      : { border: "none" }
                  }
                >
                  <S.Icon src={dogIcon} alt="" />
                  <S.IconText>Cão</S.IconText>
                </S.ContentIcon>

                <S.ContentIcon
                  onClick={() => setValue("type", "cat")}
                  style={
                    watch("type") === "cat"
                      ? { border: "1px solid #ECB159" }
                      : { border: "none" }
                  }
                >
                  <S.Icon src={catIcon} alt="" />
                  <S.IconText>Gato</S.IconText>
                </S.ContentIcon>
              </S.ContainerIcons>
              <S.DualInput>
                <Input
                  label="Nome"
                  {...register("name")}
                  isRequired
                  type="text"
                  size="sm"
                  variant="bordered"
                  color="primary"
                  classNames={{ label: "text-slate-600" }}
                />
                <Select
                  label="Personalidade"
                  placeholder="Selecione até 3 atributos"
                  selectionMode="multiple"
                  variant="bordered"
                  size="sm"
                  classNames={{
                    label: ["font-[Poppins]"],
                  }}
                  style={{ border: "2px solid #e4e4e7" }}
                  isRequired
                  selectedKeys={personality}
                  onChange={(e) => {
                    handleSelect(e.target.value);
                  }}
                  isInvalid={personality.length > 3}
                  errorMessage={
                    personality.length > 3 && "Selecione apenas 3 atributos"
                  }
                >
                  {personalities.map((item) => (
                    <SelectItem
                      className="text-default-500 text-[0.5rem]"
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              </S.DualInput>

              <S.DualInput>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      label="Gênero:"
                      size="sm"
                      color="warning"
                      style={{ fontSize: "0.9rem" }}
                      {...field}
                      value={watch("gender")}
                      errorMessage={
                        error &&
                        watch("gender") === undefined &&
                        "Campo obrigatório"
                      }
                    >
                      <S.ContainerRadio>
                        <Radio value="Macho">Macho</Radio>
                        <Radio value="Fêmea">Fêmea</Radio>
                      </S.ContainerRadio>
                    </RadioGroup>
                  )}
                />

                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      label="Porte:"
                      size="sm"
                      color="warning"
                      style={{ fontSize: "0.9rem" }}
                      {...field}
                      errorMessage={
                        error &&
                        watch("size") === undefined &&
                        "Campo obrigatório"
                      }
                      value={watch("size")}
                    >
                      <S.ContainerRadio>
                        <Radio value="Pequeno">Pequeno</Radio>
                        <Radio value="Médio">Médio</Radio>
                        <Radio value="Grande">Grande</Radio>
                      </S.ContainerRadio>
                    </RadioGroup>
                  )}
                />
              </S.DualInput>

              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    label="Idade:"
                    size="sm"
                    color="warning"
                    style={{ fontSize: "0.9rem" }}
                    {...field}
                    errorMessage={
                      error && watch("age") === undefined && "Campo obrigatório"
                    }
                    value={watch("age")}
                  >
                    <S.ContainerRadio>
                      <Radio value="Filhote">Filhote</Radio>
                      <Radio value="Jovem">Jovem</Radio>
                      <Radio value="Adulto">Adulto</Radio>
                      <Radio value="Idoso">Idoso</Radio>
                    </S.ContainerRadio>
                  </RadioGroup>
                )}
              />

              <S.InputFile>
                <label>
                  {image ? (
                    <S.Image src={URL.createObjectURL(image)} />
                  ) : (
                    <S.ContainerImage>
                      {loadingImage ? (
                        <Spinner color="default" size="sm" />
                      ) : (
                        <S.DefaultImage src={addPhoto} />
                      )}
                    </S.ContainerImage>
                  )}
                  <input
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {error && image === "" && (
                    <S.Error>Insira uma imagem</S.Error>
                  )}
                </label>
              </S.InputFile>
            </S.ContainerForm>

            {!loading ? (
              <CustomButton
                type="submit"
                backgroundColor={"#B67352"}
                hoverBackgroundColor={"#c27a56"}
              >
                Cadastrar
              </CustomButton>
            ) : (
              <CustomButton
                type="submit"
                backgroundColor={"#B67352"}
                hoverBackgroundColor={"#c27a56"}
                disabled={true}
              >
                <Spinner color="default" size="sm" />
              </CustomButton>
            )}
          </S.Form>
        </S.ContentRegister>
        <Toaster position="top-right" richColors />
      </S.ContainerRegister>
    </S.Container>
  );
}
