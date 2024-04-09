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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A,
            quibusdam vero omnis odio cumque tenetur. Quibusdam facilis fugit
            reprehenderit minus ducimus quisquam. Consectetur vitae odio vero
            ipsam at labore, illum ducimus eligendi enim quisquam, accusantium
            quidem soluta ratione, vel magni omnis voluptatibus quos doloribus
            cupiditate saepe corporis? Fuga sunt, maxime ipsam dignissimos alias
            at ducimus voluptas, illo laudantium harum eos? Natus consectetur
            dignissimos iste, veniam mollitia quidem sunt tenetur alias quod
            repudiandae dolores dolore repellendus accusantium voluptatibus
            nostrum fugit a ullam nesciunt, deserunt aliquid pariatur. Magnam
            itaque, a velit, quod aliquam veritatis atque cum sunt error
            provident inventore, excepturi nemo?
          </S.Text>
        </S.Content>
      </S.Container>
    </>
  );
}
