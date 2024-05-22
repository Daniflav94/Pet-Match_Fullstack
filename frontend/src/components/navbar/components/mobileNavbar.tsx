import {
  Navbar as Nav,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as LinkHref,
} from "@nextui-org/react";
import logo from "../../../assets/icons/pet-house.png";
import heart from "../../../assets/icons/coracao.png";
import bell from "../../../assets/icons/sino.png";
import * as S from "../styles";
import { Link, Location } from "react-router-dom";
import { useState } from "react";
import { IUser } from "../../../interfaces/IUser";
import { IOrganization } from "../../../interfaces/IOrganization";
import { Badge } from "@nextui-org/react";

interface Props {
  userLogged: IUser | IOrganization | undefined;
  newNotification: boolean;
  isNotificationsVisible: boolean;
  setIsNotificationsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  route: Location<any>;
  logoutUser: () => void;
}

export function MobileNavbar({
  userLogged,
  newNotification,
  setIsNotificationsVisible,
  isNotificationsVisible,
  route,
  logoutUser,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Nav
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#8CB9BD] h-18 z-[99999]"
      maxWidth="full"
      height="6rem"
    >
      <NavbarContent
        justify="center"
        className="flex gap-8 justify-between w-full items-center"
      >
        <Link to="/">
          <S.Logo>
            <S.Img src={logo} alt="logo pet match" />
            <S.LogoText>pet match</S.LogoText>
          </S.Logo>
        </Link>

        <S.Container>
          {userLogged?.type === "user" && (
            <li>
              <Link to="/favoritos">
                <S.Container>
                  <S.IconHeart src={heart} alt="" />
                </S.Container>
              </Link>
            </li>
          )}
          {userLogged?.type && (
            <li>
              <S.Container
                onClick={() =>
                  setIsNotificationsVisible(!isNotificationsVisible)
                }
              >
                {newNotification ? (
                  <Badge content="" color="warning" shape="circle">
                    <S.IconBell src={bell} alt="" />
                  </Badge>
                ) : (
                  <S.IconBell src={bell} alt="" />
                )}
              </S.Container>
            </li>
          )}
        </S.Container>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-[#f0e4c4] "
          data-testid="navbar-menu-button"
        />

        <NavbarMenu className="flex items-center text-2xl">
          <NavbarMenuItem isActive={route.pathname === "/sobre"}>
            <LinkHref
              href="/sobre"
              className="w-full "
              data-testid="mobile-about-button"
            >
              Sobre
            </LinkHref>
          </NavbarMenuItem>

          {userLogged?.type != "admin" ? (
            <NavbarMenuItem isActive={route.pathname === "/adotar"}>
              <LinkHref href="/adotar" className="w-full">
                Adotar
              </LinkHref>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem isActive={route.pathname === "/adotar"}>
              <LinkHref href="/meus-pets" className="w-full">
                Meus pets
              </LinkHref>
            </NavbarMenuItem>
          )}
          {userLogged && (
            <NavbarMenuItem isActive={route.pathname === "/editar-perfil"}>
              <LinkHref href="/editar-perfil" className="w-full">
                Editar perfil
              </LinkHref>
            </NavbarMenuItem>
          )}

          {userLogged ? (
            <NavbarMenuItem>
              <LinkHref
                onClick={() => {
                  logoutUser();
                }}
                className="w-full"
              >
                Sair
              </LinkHref>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem>
              <LinkHref href="/login" className="w-full">
                Entrar
              </LinkHref>
            </NavbarMenuItem>
          )}
        </NavbarMenu>
      </NavbarContent>
    </Nav>
  );
}
