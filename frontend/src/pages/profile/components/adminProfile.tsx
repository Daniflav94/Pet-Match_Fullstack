import { IOrganization } from "../../../interfaces/IOrganization";
import * as S from "../styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  normalizeCepNumber,
  normalizeCnpjNumber,
  normalizePhoneNumber,
} from "../../../masks/mask";
import { Toaster, toast } from "sonner";
import { getDataCep } from "../../../services/viaCep";
import { editAdmin } from "../../../services/user.service";
import { InputCustom } from "../../../components/input";
import { Spinner } from "@nextui-org/react";
import { CustomButton } from "../../../components/customButton";
import { ApiCNPJ } from "../../../services/apiCNPJ";
import { uploads } from "../../../utils/config";

interface Props {
  user: IOrganization;
  token: string;
}

type DataCep = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type QueryCnpj = {
  STATUS: string;
};

type AdminEdit = Omit<IOrganization, "password">;

export function AdminProfile({ user, token }: Props) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup.string().required("Campo obrigatório"),
        email: yup
          .string()
          .email("Insira um formato de email válido")
          .required("Campo obrigatório"),
        cnpj: yup
          .string()
          .required("Campo obrigatório")
          .length(18, "CNPJ precisa ter 14 dígitos."),
        cep: yup
          .string()
          .required("Campo obrigatório")
          .length(9, "CEP precisa ter 8 dígitos"),
        street: yup.string().required("Campo obrigatório"),
        neighborhood: yup.string().required("Campo obrigatório"),
        number: yup.string().required("Campo obrigatório"),
        state: yup.string().required("Campo obrigatório"),
        city: yup.string().required("Campo obrigatório"),
        cellPhone: yup
          .string()
          .required("Campo obrigatório")
          .length(15, "Verifique o número digitado"),
        phone: yup.string().optional(),
        openingHours: yup.string().required("Campo obrigatório"),
        photo: yup.string(),
      }),
    []
  );

  const {
    handleSubmit,
    watch,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm<AdminEdit>({ resolver: yupResolver(schema) });

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  const cellPhoneValue = watch("cellPhone") || user.cellPhone;
  const phoneValue = watch("phone") || user.phone;
  const cnpjValue = watch("cnpj") || user.cnpj;
  const cepValue = watch("cep") || user.cep;

  const verifyCNPJ = async (cnpj: string) => {
    const resQueryCNPJ: QueryCnpj = await ApiCNPJ(cnpj.replace(/[^\d]+/g, ""));

    if (resQueryCNPJ.STATUS !== "ATIVA") {
      toast.custom((t) => (
        <div>
          <h1>Custom toast</h1>
          <button onClick={() => toast.dismiss(t)}>Dismiss</button>
        </div>
      ));

      toast.error(
        "Seu CNPJ parece não estar ativo. Infelizmente não conseguiremos prosseguir com seu cadastro."
      );

      return false;
    } else {
      return true;
    }
  };

  const onSubmit: SubmitHandler<AdminEdit> = async (data) => {
    setLoading(true);

    const isValidCNPJ = await verifyCNPJ(data.cnpj);

    if (isValidCNPJ) {
      const edit = {
        ...data,
        photo: image,
        type: "admin"
      };

      const formData = new FormData();
      const keys = Object.keys(edit) as Array<keyof typeof edit>;

      keys.forEach((key) => formData.append(key, edit[key] as string | Blob));

      const resEditUser = await editAdmin(token, user.id as string, formData);

      if (resEditUser.data) {
        toast.success("Perfil editado com sucesso!");
      } else {
        toast.error("Ocorreu um erro ao editar. Tente novamente mais tarde.");
      }

      setLoading(false);
    }
  };

  const handleImageChange = async (event: any) => {
    setLoadingImage(true);
    const file = event.target.files[0];
    if (file) {
      setLoadingImage(false);
      setImage(file);
    }
  };

  const getAdressByCep = async (cep: string) => {
    const res: DataCep = await getDataCep(cep);

    setValue("street", res.logradouro);
    setValue("neighborhood", res.bairro);
    setValue("city", res.localidade);
    setValue("state", res.uf);
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("cnpj", user.cnpj);
    setValue("cep", user.cep);
    setValue("street", user.street);
    setValue("neighborhood", user.neighborhood);
    setValue("city", user.city);
    setValue("state", user.state);
    setValue("number", user.number);
    setValue("phone", user.phone);
    setValue("cellPhone", user.cellPhone);
    setValue("openingHours", user.openingHours);
  }, []);

  useEffect(() => {
    setValue("cellPhone", normalizePhoneNumber(cellPhoneValue));
  }, [cellPhoneValue]);

  useEffect(() => {
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    setValue("cnpj", normalizeCnpjNumber(cnpjValue));
  }, [cnpjValue]);

  useEffect(() => {
    setValue("cep", normalizeCepNumber(cepValue));

    if (cepValue?.length === 9) {
      getAdressByCep(cepValue.replace("-", ""));
    }
  }, [cepValue]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <InputCustom
        type="text"
        label="Nome estabelecimento"
        color={"primary"}
        control={control}
        name={"name"}
        refs={register("name")}
        isRequired
      />

      <InputCustom
        type="email"
        label="Email"
        control={control}
        name={"email"}
        refs={register("email")}
        isRequired
        color={errors.email ? "danger" : "primary"}
        errorMessage={errors.email?.message}
        isInvalid={errors.email ? true : false}
        isDisabled
      />

      <S.DualInput>
        <InputCustom
          type="text"
          label="CNPJ"
          control={control}
          name={"cnpj"}
          refs={register("cnpj")}
          isRequired
          color={errors.cnpj ? "danger" : "primary"}
          errorMessage={errors.cnpj?.message}
          isInvalid={errors.cnpj ? true : false}
        />

        <InputCustom
          type="text"
          label="CEP"
          control={control}
          name={"cep"}
          refs={register("cep")}
          isRequired
          color={errors.cep ? "danger" : "primary"}
          errorMessage={errors.cep?.message}
          isInvalid={errors.cep ? true : false}
        />
      </S.DualInput>

      <InputCustom
        type="text"
        label="Rua"
        control={control}
        name={"street"}
        refs={register("street")}
        isRequired
      />

      <S.DualInput>
        <InputCustom
          type="text"
          label="Bairro"
          color={"primary"}
          control={control}
          name={"neighborhood"}
          refs={register("neighborhood")}
          isRequired
        />

        <InputCustom
          type="text"
          label="Número"
          color={"primary"}
          control={control}
          name={"number"}
          refs={register("number")}
          isRequired
        />
      </S.DualInput>

      <S.DualInput>
        <InputCustom
          type="text"
          label="Estado"
          color={"primary"}
          control={control}
          name={"state"}
          refs={register("state")}
          isRequired
        />

        <InputCustom
          type="text"
          label="Cidade"
          color={"primary"}
          control={control}
          name={"city"}
          refs={register("city")}
          isRequired
        />
      </S.DualInput>

      <S.DualInput>
        <InputCustom
          type="tel"
          label="Celular"
          control={control}
          name={"cel"}
          refs={register("cellPhone")}
          isRequired
          color={errors.cellPhone ? "danger" : "primary"}
          errorMessage={errors.cellPhone?.message}
          isInvalid={errors.cellPhone ? true : false}
        />

        <InputCustom
          type="tel"
          label="Telefone"
          control={control}
          name={"phone"}
          refs={register("phone")}
          color={errors.phone ? "danger" : "primary"}
          errorMessage={errors.phone?.message}
          isInvalid={errors.phone ? true : false}
        />
      </S.DualInput>
      <InputCustom
        type="text"
        label="Horário de funcionamento"
        control={control}
        name={"openingHours"}
        refs={register("openingHours")}
        color={"primary"}
        isRequired
        placeholder="Ex: Segunda à sexta: 08h ás 17h, Sábados: 09h ás 13h"
      />

      <S.InputFile>
        <S.ContentInputFile>
          <span>
            Selecione uma foto para seu estabelecimento{" "}
            <span style={{ color: "red" }}>*</span>
          </span>
          <label>
            <S.ButtonImage>Escolher imagem</S.ButtonImage>
            <input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              name="file"
            />
          </label>
        </S.ContentInputFile>

        {image ? (
          <S.Image src={image} />
        ) : (
          <S.ContainerImage>
            {loadingImage ? (
              <Spinner color="default" size="sm" />
            ) : (
              <S.DefaultImage src={`${uploads}/organizations/${user.photo}`} />
            )}
          </S.ContainerImage>
        )}
      </S.InputFile>

      {!loading ? (
        <CustomButton
          type="submit"
          backgroundColor="#ECB159"
          hoverBackgroundColor="#e5ac58"
          fontSize="1rem"
          width="100%"
        >
          Salvar
        </CustomButton>
      ) : (
        <CustomButton
          type="submit"
          backgroundColor="#ECB159"
          hoverBackgroundColor="#e5ac58"
          width="100%"
        >
          <Spinner color="default" size="sm" />
        </CustomButton>
      )}

      <Toaster position="top-right" richColors />
    </S.Form>
  );
}
