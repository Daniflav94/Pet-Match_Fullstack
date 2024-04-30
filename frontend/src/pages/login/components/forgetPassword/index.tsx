import * as S from "./styles";
import arrow from "../../../../assets/icons/botao-voltar.png";
import { useMemo, useState } from "react";
import { InputCustom } from "../../../../components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "../../../../components/customButton";
import { Input } from "@nextui-org/react";
import {
  forgetPassword,
  resetPassword,
  validateCode,
} from "../../../../services/auth.service";
import { Toaster, toast } from "sonner";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeIcon, EyeOff } from "lucide-react";

type Props = {
  setForgetPassword: (value: boolean) => void;
};

type ResetPass = {
  password: string;
  confirmPassword: string;
};

export function ForgetPassword({ setForgetPassword }: Props) {
  const schema = useMemo(
    () =>
      yup.object().shape({
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

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [error, setError] = useState("");

  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ResetPass>({ resolver: yupResolver(schema) });

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const toggleVisibilityConfirmPassword = () =>
    setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

  const onSubmit: SubmitHandler<ResetPass> = async(data) => {
    const newData = {
      password: data.password,
      userId,
      code
    }

    const res = await resetPassword(newData);

    if (res.errors) {
      toast.error(res.errors[0]);
      return;
    }

    toast.success("Sua senha foi alterada!");

    setStep1(false);
    setStep2(false);
    setStep3(false);
    setForgetPassword(false);
  };

  const forgetPass = async (email: string) => {
    setError("");

    if (email === "" || !email.includes('@')) {
      setError("Insira um email válido.");
      return;
    }

    const data = {
      email,
    };

    const res = await forgetPassword(data);

    if (res.errors) {
      toast.error(res.errors[0]);
      return;
    }

    setUserId(res.userId);
    setStep1(false);
    setStep2(true);
  };

  const validateCodeSent = async (code: string) => {
    setError("");

    if (code === "") {
      setError("Insira o código recebido para continuar.");
      return;
    }else if(code.length < 6){
      setError("O código deve ter 6 dígitos.");
      return;
    }

    const data = {
      code,
      userId,
    };

    const res = await validateCode(data);

    if (res.errors) {
      toast.error(res.errors[0]);
      return;
    }

    setStep2(false);
    setStep3(true);
  };

  return (
    <S.Container>
      <S.ButtonArrow onClick={() => setForgetPassword(false)}>
        <img src={arrow} />
      </S.ButtonArrow>

      <S.Title>Esqueci minha senha</S.Title>
      {step1 && !step2 && !step3 && (
        <S.Content>
          <S.Text>
            Informe seu email cadastrado no campo abaixo, enviaremos um código
            para seu email para você redefinir sua senha.
          </S.Text>
          <S.Form>
            <Input
              type="email"
              label="Email"
              isRequired
              variant="bordered"
              classNames={{
                label: ["text-black/60", "font-[Poppins]", "w-full"],
                input: [
                  "bg-transparent",
                  "text-black/90",
                  "font-[Poppins]",
                  "placeholder:text-default-600/50",
                ],
              }}
              onChange={(e) => setEmail(e.target.value)}
              color={error ? "danger" : "primary"}
              isInvalid={error ? true : false}
            />
            {error && <S.Error>{error}</S.Error>}
            <CustomButton
              type="button"
              backgroundColor="#ECB159"
              hoverBackgroundColor="#e5ac58"
              fontSize="1rem"
              width="100%"
              onClick={() => forgetPass(email)}
            >
              Enviar
            </CustomButton>
          </S.Form>
        </S.Content>
      )}

      {!step1 && step2 && !step3 && (
        <S.Content>
          <S.Text>
            Enviamos um código para seu email. Verifique sua caixa de entrada ou
            spam e insira o código recebido no campo abaixo:
          </S.Text>
          <S.Form>
            <Input
              type="number"
              label="Código"
              isRequired
              variant="bordered"
              classNames={{
                label: ["text-black/60", "font-[Poppins]", "w-full"],
                input: [
                  "bg-transparent",
                  "text-black/90",
                  "font-[Poppins]",
                  "placeholder:text-default-600/50",
                ],
              }}
              onChange={(e) => setCode(e.target.value)}
              color={error ? "danger" : "primary"}
              isInvalid={error ? true : false}
            />
            {error && <S.Error>{error}</S.Error>}
            <CustomButton
              type="button"
              backgroundColor="#ECB159"
              hoverBackgroundColor="#e5ac58"
              fontSize="1rem"
              width="100%"
              onClick={() => validateCodeSent(code)}
            >
              Enviar
            </CustomButton>
          </S.Form>
        </S.Content>
      )}

      {!step1 && !step2 && step3 && (
        <S.Content>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
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
            {error && <S.Error>{error}</S.Error>}
            <CustomButton
              type="submit"
              backgroundColor="#ECB159"
              hoverBackgroundColor="#e5ac58"
              fontSize="1rem"
              width="100%"
            >
              Redefinir senha
            </CustomButton>
          </S.Form>
        </S.Content>
      )}

      <Toaster position="top-right" richColors />
    </S.Container>
  );
}
