import * as S from "./styles";
import imageDog from "../../assets/images/viralata.jpeg";
import logo from "../../assets/icons/petHouseBlue.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputCustom } from "../../components/input";
import { Register } from "./components/register";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { CustomButton } from "../../components/customButton";

type Login = {
  email: string;
  password: string;
};

export function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Login>();

  const [isVisible, setIsVisible] = useState(false);
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [typeUser, setTypeUser] = useState("user");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const res = await login(data);

    if (!res.data) {
      toast.error(res.error);
    } else {
      toast.success("Bem vindo(a)!");
      navigate("/");
    }
  };

  return (
    <S.Container>
      <S.ContainerImage>
        <S.Image src={imageDog} alt="" />
      </S.ContainerImage>

      {!signUpVisible ? (
        <S.ContainerLogin>
          <S.ContainerLogo>
            <S.Logo src={logo} alt="" />
            <S.LogoText>pet match</S.LogoText>
          </S.ContainerLogo>
          <S.Text>Seu novo melhor amigo está te esperando!</S.Text>

          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <InputCustom
              type="email"
              label="Email"
              color={errors.email ? "danger" : "primary"}
              control={control}
              name={"email"}
              refs={register("email")}
              isRequired
            />

            <InputCustom
              type={isVisible ? "text" : "password"}
              label="Senha"
              color="primary"
              control={control}
              name={"password"}
              refs={register("password")}
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
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

            <CustomButton
              type="submit"
              backgroundColor="#ECB159"
              hoverBackgroundColor="#e5ac58"
              fontSize="1rem"
            >
              Entrar
            </CustomButton>

            <S.TextSignUp>
              Ainda não possui uma conta? &nbsp;
              <S.ButtonSignUp
                onClick={() => {
                  setTypeUser("user"), setSignUpVisible(true);
                }}
              >
                Cadastre-se
              </S.ButtonSignUp>
            </S.TextSignUp>
            <S.TextSignUp>
              Se você possui uma ONG / abrigo de animais e deseja cadastrar seus
              pets &nbsp;
              <S.ButtonSignUp
                onClick={() => {
                  setTypeUser("admin"), setSignUpVisible(true);
                }}
              >
                clique aqui
              </S.ButtonSignUp>
            </S.TextSignUp>
          </S.Form>
        </S.ContainerLogin>
      ) : (
        <Register type={typeUser} setSignUpVisible={setSignUpVisible} />
      )}
      <Toaster position="top-right" richColors />
    </S.Container>
  );
}
