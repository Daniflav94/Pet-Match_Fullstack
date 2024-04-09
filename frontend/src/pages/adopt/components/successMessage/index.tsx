import * as S from "./styles";
import dog from "../../../../assets/images/18.png";
import { Check } from "lucide-react";

export function SuccessMessage() {
  return (
    <S.Container>
      <S.Rounded>
        <S.Image src={dog} alt="" />
        <Check color="#ECB159" size={60} style={{position: "absolute", top: "1rem", right: "-1rem"}}/>
      </S.Rounded>

      <S.Title>Pedido de adoção enviado com sucesso!</S.Title>
      <S.Description>
        Agora é só aguardar! <br />
        Você receberá uma notificação aqui no site e um email com todas as informações necessárias quando tivermos um
        retorno da ONG.
      </S.Description>
    </S.Container>
  );
}
