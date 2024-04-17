import * as S from "./styles";
import arrow from "../../../../assets/icons/botao-voltar.png";

import { RegisterUser } from "./registerUser";
import { RegisterAdmin } from "./registerAdmin";

type Props = {
  type: string;
  setSignUpVisible: (value: boolean) => void;
};

export function Register({ type, setSignUpVisible }: Props) {
  return (
    <S.ContainerRegister>
      <S.ButtonArrow onClick={() => setSignUpVisible(false)}>
        <img src={arrow} />
      </S.ButtonArrow>

      <S.Title>Cadastre-se</S.Title>

      {type === "user" ? (
        <RegisterUser setSignUpVisible={setSignUpVisible} />
      ) : (
        <RegisterAdmin setSignUpVisible={setSignUpVisible}/>
      )}
    </S.ContainerRegister>
  );
}
