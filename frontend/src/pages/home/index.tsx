import pet from "../../assets/images/dog.png";
import * as S from "./styles";
import findPet from "../../assets/icons/cat-search.svg";
import requestPet from "../../assets/icons/cat-request.svg";
import form from "../../assets/icons/form-adopt.svg";
import addPet from "../../assets/icons/cat-add.svg";
import cat from "../../assets/images/cat.png";
import dog from "../../assets/images/1.png";
import { Link } from "react-router-dom";
import { easeIn, motion } from "framer-motion";

export function Home() {
  return (
    <S.Section>
      <S.ContainerTitle>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.7,
            ease: "linear",
          }}
        >
          <S.Title>Não compre.</S.Title>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, ease: "linear"  }}
        >
          <S.Title2>&nbsp;Adote!</S.Title2>
        </motion.div>
      </S.ContainerTitle>
      <S.Main>
        <h2>Como funciona</h2>
        <S.ContainerIcons>
          <S.ContentIcons>
            <S.Icon src={findPet} alt="" />
            <S.Text>Encontre seu pet</S.Text>
            <S.Description>
              Navegue em nossa galeria de pets e encontre o pet ideal para você.
              Todos são castrados e vacinados.
            </S.Description>
          </S.ContentIcons>
          <S.Divider></S.Divider>
          <S.ContentIcons>
            <S.Icon src={requestPet} alt="" />
            <S.Text>Conheça seu pet</S.Text>
            <S.Description>
              Após solicitar adoção, aguarde resposta da ONG com as informações
              para conhecer o pet.
            </S.Description>
          </S.ContentIcons>
          <S.Divider></S.Divider>
          <S.ContentIcons>
            <S.Icon src={form} alt="" />
            <S.Text>Preencha o formulário de adoção</S.Text>
            <S.Description>
              Finalize o processo de adoção e receba todas as informações
              necessárias.
            </S.Description>
          </S.ContentIcons>
          <S.Divider></S.Divider>
          <S.ContentIcons>
            <S.Icon src={addPet} alt="" />
            <S.Text>Adicione o pet a sua família</S.Text>
            <S.Description>
              Agora é só aproveitar a companhia do seu novo amigo.
            </S.Description>
          </S.ContentIcons>{" "}
        </S.ContainerIcons>

        <S.ContainerAdopt>
          <S.Cat src={cat} alt="" />
          <S.ContentAdopt>
            <h2>Por que adotar?</h2>
            <S.TextAdopt>
              Quando você adota um cachorro ou gato, você está providenciando
              uma segunda chance para esses adoráveis seres que vem de variados
              cenários, muitos são resgatados da rua onde nasceram, outros foram
              abandonados por aqueles em quem mais confiavam. <br />
              Adotando você possibilita que as ONG's e abrigos de animais que
              estão lotadas possam resgatar e salvar ainda mais peludos, e você
              dará a eles todo amor, cuidado e segurança que eles merecem
              transformando suas vidas para sempre.{" "}
            </S.TextAdopt>
          </S.ContentAdopt>
        </S.ContainerAdopt>
        <S.ContainerDonation>
          <S.ContentDonation>
            <h2>Apadrinhar um pet</h2>
            <S.TextDonation>
              Não pode adotar mas gostaria de contribuir? Você pode ajudar
              apadrinhando um pet! Em nossa seção{" "}
              <Link to="/adotar">
                <S.LinkSpan>Adotar</S.LinkSpan>
              </Link>
              , clique em Apadrinhar e siga os passos que serão mostrados a
              você. A ONG / abrigo receberá sua contribuição e poderá continuar
              cuidando bem de seus peludos.
            </S.TextDonation>
          </S.ContentDonation>
          <S.Dog src={dog} alt="" />
        </S.ContainerDonation>
      </S.Main>

      <S.Pet src={pet} alt="" />
    </S.Section>
  );
}
