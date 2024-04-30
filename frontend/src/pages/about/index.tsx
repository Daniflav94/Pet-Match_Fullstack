import * as S from "./styles";
import paw from "../../assets/images/pata.jpeg";

export function About() {
  return (
    <>
      <S.Background></S.Background>
      <S.Container>
        <S.Image src={paw} alt="" />
        <S.Content>
          <S.Title>Sobre nós</S.Title>
          <S.Text>
            Existem milhares de ONG's que abrigam animais espalhadas pelo
            Brasil. Muitas delas estão lotadas e ainda sim continuam resgatando
            mais animais, pois não conseguem negar ajuda a esses seres tão puros
            e amáveis. Porém enfrentam muita dificuldade em conseguir adoção
            para seus animais, pois cães e gatos sem raça infelizmente são
            desprezados por muitos, e piora quando ficam mais velhinhos. Pensando em
            auxiliar essas ONG's esse site foi criado a fim de a divulgar seus
            peludinhos e facilitar o processo de adoção.
          </S.Text>
        </S.Content>
      </S.Container>
    </>
  );
}
