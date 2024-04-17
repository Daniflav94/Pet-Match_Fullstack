import * as S from "./styles";
import imageDog from "../../assets/images/viralata.jpeg";
import logo from "../../assets/icons/petHouseBlue.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { EyeIcon, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { InputCustom } from "../../components/input";
import { Register } from "./components/register";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { CustomButton } from "../../components/customButton";
import TokenContext from "../../contexts/tokenContext";
import { ForgetPassword } from "./components/forgetPassword";

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
  const [forgetPassword, setForgetPassword] = useState(false);
  const [typeUser, setTypeUser] = useState("user");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { setToken } = useContext(TokenContext);

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const res = await login(data);

    if (!res) {
      toast.error(
        "Estamos com problemas no servidor. Tente novamente mais tarde"
      );
      return;
    } else if (res) {
      if (res.errors) {
        toast.error(res.errors);
        return;
      }

      const tokenResponse = res.token;
      const user = res.user;
      setToken(tokenResponse);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(tokenResponse));

      toast.success("Bem vindo(a)!");
      navigate("/");
    }
  };

  return (
    <S.Container>
      <S.ContainerImage>
        <S.Image src={imageDog} alt="" />
      </S.ContainerImage>

      <S.ContainerForm>
        {!signUpVisible && !forgetPassword && (
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
              <div>
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
                <S.ForgetPassword onClick={() => setForgetPassword(true)}>
                  Esqueci minha senha
                </S.ForgetPassword>
              </div>

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
                Se você possui uma ONG / abrigo de animais e deseja cadastrar
                seus pets &nbsp;
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
        )}

        {signUpVisible && !forgetPassword && (
          <Register type={typeUser} setSignUpVisible={setSignUpVisible} />
        )}

        {!signUpVisible && forgetPassword && (
          <ForgetPassword setForgetPassword={setForgetPassword} />
        )}
      </S.ContainerForm>

      <Toaster position="top-right" richColors />
    </S.Container>
  );
}
