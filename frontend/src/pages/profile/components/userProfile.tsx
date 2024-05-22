import * as S from "../styles";
import { IUser } from "../../../interfaces/IUser";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  normalizeCepNumber,
  normalizeCpfNumber,
  normalizePhoneNumber,
} from "../../../masks/mask";
import { Toaster, toast } from "sonner";
import { getDataCep } from "../../../services/viaCep";
import { InputCustom } from "../../../components/input";
import { Select, SelectItem, Spinner, DatePicker } from "@nextui-org/react";
import { CustomButton } from "../../../components/customButton";
import {
  parseDate,
  getLocalTimeZone,
  CalendarDate,
  today,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { editUser } from "../../../services/user.service";

interface Props {
  user: IUser;
  birthdateUser: Date;
  token: string;
}

type DataCep = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type UserEdit = Omit<IUser, "password"> 


export function UserProfile({ user, birthdateUser, token }: Props) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .min(10, "Insira seu nome completo")
          .required("Campo obrigatório"),
        birthdate: yup.date().required(),
        gender: yup.string().required("Campo obrigatório"),
        email: yup
          .string()
          .email("Insira um formato de email válido")
          .required("Campo obrigatório"),
        cpf: yup
          .string()
          .required("Campo obrigatório")
          .length(14, "CPF precisa ter 11 dígitos."),
        cep: yup
          .string()
          .required("Campo obrigatório")
          .length(9, "CEP precisa ter 8 dígitos"),
        street: yup.string().required("Campo obrigatório"),
        neighborhood: yup.string().required("Campo obrigatório"),
        state: yup.string().required("Campo obrigatório"),
        city: yup.string().required("Campo obrigatório"),
        phone: yup
          .string()
          .required("Campo obrigatório")
          .length(15, "Verifique o número digitado"),
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
  } = useForm<UserEdit>({ resolver: yupResolver(schema) });

 
  const [loading, setLoading] = useState(false);
  const [birthdate, setBirthdate] = useState(
    user
      ? parseDate(new Date(birthdateUser).toISOString().slice(0,10))
      : undefined
  );

  const phoneValue = watch("phone") || user.phone;
  const cepValue = watch("cep") || user.cep;
  const cpfValue = watch("cpf") || user.cpf;

 

  const onSubmit: SubmitHandler<UserEdit> = async (data) => {
    setLoading(true);

    const resEditUser = await editUser(token, user.id as string, data);

    if (resEditUser.data) {
      toast.success("Perfil editado com sucesso!");
    } else {
      toast.error("Ocorreu um erro ao editar. Tente novamente mais tarde.");
    }

    setLoading(false);
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
    setValue("email", user.email)
    setValue("gender", user.gender);
    setValue("birthdate", user.birthdate);
    setValue("cpf", user.cpf);
    setValue("cep", user.cep);
    setValue("street", user.street);
    setValue("neighborhood", user.neighborhood);
    setValue("city", user.city);
    setValue("state", user.state);
    setValue("phone", user.phone);
  }, [])

  useEffect(() => {
    if (birthdate) {
      setValue("birthdate", birthdate.toDate(getLocalTimeZone()));
    }
  }, [birthdate]);

  useEffect(() => {
    setValue("cep", normalizeCepNumber(cepValue));

    if (cepValue?.length === 9) {
      getAdressByCep(cepValue.replace("-", ""));
    }
  }, [cepValue]);

  useEffect(() => {
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    setValue("cpf", normalizeCpfNumber(cpfValue));
  }, [cpfValue]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <InputCustom
        type="text"
        label="Nome completo"
        control={control}
        name={"name"}
        refs={register("name")}
        isRequired
        color={errors.name ? "danger" : "primary"}
        errorMessage={errors.name?.message}
        isInvalid={errors.name ? true : false}
      />

      <S.DualInput>
        <I18nProvider locale="pt-BR">
          <DatePicker
            label="Data de nascimento"
            variant="bordered"
            minValue={new CalendarDate(1940, 1, 1)}
            maxValue={today(getLocalTimeZone())}
            value={birthdate}
            defaultValue={birthdate}
            onChange={setBirthdate}
            isInvalid={!birthdate ? true : false}
            errorMessage={!birthdate && "Campo obrigatório"}
            isRequired
            color={errors.birthdate ? "danger" : "default"}
            size="md"
            showMonthAndYearPickers
            className={"font-[Poppins]"}
          />
        </I18nProvider>
        <Select
          label="Gênero"
          variant="bordered"
          color="primary"
          classNames={{
            label: ["text-black/60", "font-[Poppins]"],
            value: ["text-black", "font-[Poppins]"],
          }}
          size="md"
          style={{ border: "2px solid #e4e4e7" }}
          onChange={(value) => setValue("gender", value.target.value)}
          isRequired
          defaultSelectedKeys={[user.gender]}
        >
          <SelectItem key="Homem" value="Homem">
            Homem
          </SelectItem>
          <SelectItem key="Mulher" value="Mulher">
            Mulher
          </SelectItem>
          <SelectItem key="Outro" value="Outro">
            Outro
          </SelectItem>
        </Select>
      </S.DualInput>

      <InputCustom
        type="email"
        label="Email"
        color={errors.email ? "danger" : "primary"}
        control={control}
        name={"email"}
        refs={register("email")}
        isRequired
        errorMessage={errors.email?.message}
        isInvalid={errors.email ? true : false}
        isDisabled
      />

      <S.DualInput>
        <InputCustom
          type="text"
          label="CPF"
          control={control}
          name={"cpf"}
          refs={register("cpf")}
          isRequired
          color={errors.cpf ? "danger" : "primary"}
          errorMessage={errors.cpf?.message}
          isInvalid={errors.cpf ? true : false}
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
        defaultValue={user.street}
        value={user.street}
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
          type="text"
          label="Estado"
          color={"primary"}
          control={control}
          name={"state"}
          refs={register("state")}
          isRequired

        />

        <InputCustom
          type="tel"
          label="Celular"
          control={control}
          name={"phone"}
          refs={register("phone")}
          isRequired
          color={errors.phone ? "danger" : "primary"}
          errorMessage={errors.phone?.message}
          isInvalid={errors.phone ? true : false}
     
        />
      </S.DualInput>

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
