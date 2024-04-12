import * as S from "./styles";
import logo from "../../assets/icons/pet-house.png";

export function Footer() {
  return (
    <S.Footer>
      <S.Logo>
        <S.Img src={logo} alt="logo pet match" />
        <S.LogoText>pet match</S.LogoText>
      </S.Logo>
      <S.Text>
        Desenvolvido por{" "}
        <a
          href="https://portfolio-daniele-almeida.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <S.Link>Daniele Almeida</S.Link>
        </a>
      </S.Text>
    </S.Footer>
  );
}
