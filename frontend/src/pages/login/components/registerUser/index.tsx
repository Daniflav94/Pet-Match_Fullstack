import { SubmitHandler, useForm } from "react-hook-form";
import * as S from "../styles";
import { IUser } from "../../../../interfaces/IUser";
import { InputCustom } from "../../../../components/input";
import { EyeIcon, EyeOff } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import {
  normalizeCepNumber,
  normalizeCpfNumber,
  normalizePhoneNumber,
} from "../../../../masks/mask";
import { getDataCep } from "../../../../services/viaCep";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import { register as registerUser } from "../../../../services/auth.service";
import { CustomButton } from "../../../../components/customButton";

interface SignUpUser extends IUser {
  confirmPassword: string;
}

type DataCep = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};

type Props = {
  setSignUpVisible: (value: boolean) => void;
};

export function RegisterUser({ setSignUpVisible }: Props) {
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
        password: yup
          .string()
          .min(6, "A senha precisa ter no mínimo 6 caracteres")
          .required("Insira uma senha para continuar"),
        confirmPassword: yup
          .string()
          .required("Confirme a senha para continuar")
          .test({
            name: "confirmPassword",
            message: "As senhas não conferem!",
            test: function () {
              const { password, confirmPassword } = this.parent;
              if (password && confirmPassword !== password) {
                return false;
              }
              return true;
            },
          }),
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
  } = useForm<SignUpUser>({ resolver: yupResolver(schema) });

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const phoneValue = watch("phone");
  const cepValue = watch("cep");
  const cpfValue = watch("cpf");

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const onSubmit: SubmitHandler<SignUpUser> = async (data) => {
    setLoading(true);

    const user: IUser = {
      type: "user",
      name: data.name,
      cpf: data.cpf,
      birthdate: data.birthdate,
      gender: data.gender,
      email: data.email,
      password: data.password,
      phone: data.phone,
      cep: data.cep,
      state: data.state,
      city: data.city,
      street: data.street,
      neighborhood: data.neighborhood,
    };

    const res = await registerUser(user);

    if (res.data) {
      toast.success("Cadastro realizado com sucesso!");
      setSignUpVisible(false);
    } else {
      toast.error("Ocorreu um erro ao cadastrar. Tente novamente mais tarde.");
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
    setValue("phone", normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  useEffect(() => {
    setValue("cpf", normalizeCpfNumber(cpfValue));
  }, [cpfValue]);

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
        <InputCustom
          type="date"
          label="Data de nascimento"
          color={"primary"}
          control={control}
          name={"birthdate"}
          refs={register("birthdate")}
          isRequired
        />

        <Select
          label="Gênero"
          variant="bordered"
          color="primary"
          classNames={{
            label: ["text-black/60", "font-[Poppins]"],
          }}
          size="md"
          style={{ border: "2px solid #e4e4e7" }}
          onChange={(value) => setValue("gender", value.target.value)}
          isRequired
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

      <S.DualInput>
        <InputCustom
          type={isVisiblePassword ? "text" : "password"}
          label="Senha"
          control={control}
          name={"password"}
          refs={register("password")}
          isRequired
          color={errors.password ? "danger" : "primary"}
          errorMessage={errors.password?.message}
          isInvalid={errors.password ? true : false}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisiblePassword ? (
                <EyeOff
                  className="text-default-400 pointer-events-none"
                  size={22}
                />
              ) : (
                <EyeIcon
                  className=" text-default-400 pointer-events-none"
                  size={22}
                />
              )}
            </button>
          }
        />

        <InputCustom
          type={isVisibleConfirmPassword ? "text" : "password"}
          label="Confirme sua senha"
          control={control}
          name={"confirmPassword"}
          refs={register("confirmPassword")}
          isRequired
          color={errors.confirmPassword ? "danger" : "primary"}
          errorMessage={errors.confirmPassword?.message}
          isInvalid={errors.confirmPassword ? true : false}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibilityConfirmPassword}
            >
              {isVisibleConfirmPassword ? (
                <EyeOff
                  className="text-default-400 pointer-events-none"
                  size={22}
                />
              ) : (
                <EyeIcon
                  className=" text-default-400 pointer-events-none"
                  size={22}
                />
              )}
            </button>
          }
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
          Cadastrar
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
