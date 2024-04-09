import * as S from "./styles";
import dog from "../../../../assets/images/18.png";
import { Check } from "lucide-react";

export function SuccessMessageAdopt() {
  return (
    <S.Container>
      <S.Rounded>
        <S.Image src={dog} alt="" />
        <Check color="#ECB159" size={60} style={{position: "absolute", top: "1rem", right: "-1rem"}}/>
      </S.Rounded>

      <S.Title>Solicitação de adoção aprovada!</S.Title>
      <S.Description>
        Agora é só aguardar! <br />
        A pessoa que solicitou a adoção será avisada por email e pelo nosso site e receberá seu endereço, contato e horário de funcionamento para que possa ir conhecer o pet.
      </S.Description>
    </S.Container>
  );
}
