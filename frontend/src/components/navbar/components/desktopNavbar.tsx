import logo from "../../../assets/icons/pet-house.png";
import heart from "../../../assets/icons/coracao.png";
import bell from "../../../assets/icons/sino.png";
import * as S from "../styles";
import { Link, Location } from "react-router-dom";
import { IUser } from "../../../interfaces/IUser";
import { IOrganization } from "../../../interfaces/IOrganization";
import { Badge } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChevronDown, LogOut, UserRoundCog } from "lucide-react";

interface Props {
  userLogged: IUser | IOrganization | undefined;
  newNotification: boolean;
  isNotificationsVisible: boolean;
  setIsNotificationsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  route: Location<any>;
  logoutUser: () => void;
}

export function DesktopNavbar({
  userLogged,
  newNotification,
  setIsNotificationsVisible,
  isNotificationsVisible,
  route,
  logoutUser,
}: Props) {

  return (
    <S.Ul>
          <Link to="/">
            <S.Logo>
              <S.Img src={logo} alt="logo pet match" />
              <S.LogoText>pet match</S.LogoText>
            </S.Logo>
          </Link>
          <S.Div>
            <li data-testid="navbar-home-button">
              <Link to="/">
                <S.Span
                  style={
                    route.pathname === "/"
                      ? { borderBottom: "2px solid #ECB159" }
                      : {}
                  }
                >
                  Início
                </S.Span>
              </Link>
            </li>
            <li data-testid="navbar-about-button">
              <Link to="/sobre">
                <S.Span
                  style={
                    route.pathname === "/sobre"
                      ? { borderBottom: "2px solid #ECB159" }
                      : {}
                  }
                >
                  Sobre
                </S.Span>
              </Link>
            </li>
            {userLogged?.type != "admin" ? (
              <li data-testid="navbar-adopt-button">
                <Link to="/adotar">
                  <S.Span
                    style={
                      route.pathname === "/adotar"
                        ? { borderBottom: "2px solid #ECB159" }
                        : {}
                    }
                  >
                    Adotar
                  </S.Span>
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/meus-pets">
                  <S.Span
                    style={
                      route.pathname === "/meus-pets"
                        ? { borderBottom: "2px solid #ECB159" }
                        : {}
                    }
                  >
                    Meus Pets
                  </S.Span>
                </Link>
              </li>
            )}

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
                    data-testid="button-notifications"
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
              <li>
                {userLogged ? (
                  <S.ContainerButtonsLogged>
                    <Dropdown
                      className="min-w-fit"
                      classNames={{
                        content: "bg-[#8CB9BD] rounded-md p-0",
                      }}
                    >
                      <DropdownTrigger>
                        <S.Container>
                          <S.Login>
                            Olá, {userLogged.name.split(" ")[0]}
                            <ChevronDown size={16} />
                          </S.Login>
                        </S.Container>
                      </DropdownTrigger>
                      <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={true}
                        selectionMode="single"
                        hideSelectedIcon
                        variant="solid"
                        color="secondary"
                        className="z-[99999999] p-1 w-40"
                      >
                        <DropdownItem
                          key={"edit"}
                          className="capitalize text-zinc-200 rounded-md "
                          startContent={<UserRoundCog size={16} />}
                        >
                          <Link to="/editar-perfil">Editar perfil</Link>
                        </DropdownItem>
                        <DropdownItem
                          key={"logout"}
                          className="capitalize text-zinc-200 rounded-md"
                          onClick={logoutUser}
                          startContent={<LogOut size={16} />}
                        >
                          Sair
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </S.ContainerButtonsLogged>
                ) : (
                  <Link to="/login">
                    <S.Login>Entrar</S.Login>
                  </Link>
                )}
              </li>
            </S.Container>
          </S.Div>
        </S.Ul>
  );
}
