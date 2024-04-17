import * as S from "./styles";
import dogIcon from "../../../../assets/icons/dog.svg";
import catIcon from "../../../../assets/icons/cat.svg";
import { useContext, useEffect, useState } from "react";
import { SelectInput } from "../../../../components/select";
import { getListCities, getListStates } from "../../../../services/apiIBGE";
import { IFilter } from "../../../../interfaces/IFilter";
import { CustomButton } from "../../../../components/customButton";
import { useForm } from "react-hook-form";
import { IPet } from "../../../../interfaces/IPet";
import { IOrganization } from "../../../../interfaces/IOrganization";
import { filterPets, listAllPets } from "../../../../services/pet.service";
import TokenContext from "../../../../contexts/tokenContext";

export interface State {
  id: number;
  nome: string;
  sigla: string;
}

export interface City {
  id: number;
  nome: string;
}

type SelectLocation = {
  name: string;
  value: string;
};

type Props = {
  setFilteredPets: (data: any[]) => void;
  setNotFoundMessage: (message: string) => void;
};

export function FilterAdopt({ setFilteredPets, setNotFoundMessage }: Props) {
  const [typePet, setTypePet] = useState<string>();
  const [state, setState] = useState<string>();
  const [city, setCity] = useState<string>();
  const [listStates, setListStates] = useState<SelectLocation[]>([]);
  const [listCities, setListCities] = useState<SelectLocation[]>([]);

  const { token } = useContext(TokenContext);

  const { handleSubmit, setValue, watch } = useForm<IFilter>();

  async function getAllPets() {
    const pets = await listAllPets();

    return pets.data;
  }

  async function getStates() {
    const pets = await getAllPets();
    const res = await getListStates();

    if (res) {
      const states = res.map((state: State) => {
        return { value: state.sigla, name: state.nome };
      });

      let statesFiltered: SelectLocation[] = [];

      pets?.forEach((pet: IPet) => {
        const state = states.find(
          (state: any) =>
            state.value === (pet.organization as IOrganization).state
        );

        if (state) {
          statesFiltered.push(state);
        }
      });
      const arrUnique = [...new Set(statesFiltered)];
      setListStates(arrUnique);
    }
  }

  async function getCities(state: string) {
    setState(state);
    const res = await getListCities(state);
    const pets = await getAllPets();

    const cities: SelectLocation[] = res.map((city: City) => {
      return { value: city.nome, name: city.nome };
    });

    let citiesFiltered: SelectLocation[] = [];

    pets?.forEach((pet: IPet) => {
      const city = cities.find(
        (city: SelectLocation) =>
          city.value === (pet.organization as IOrganization).city
      );
      if (city) {
        citiesFiltered.push(city);
      }
    });

    const arrUnique = [...new Set(citiesFiltered)];
    setListCities(arrUnique);
  }

  async function onSubmit(data: IFilter) {
    const newfilter = {
      type: typePet,
      size: data.size,
      age: data.age,
      gender: data.gender,
      state: state,
      city: city,
    };

    filter(JSON.parse(JSON.stringify(newfilter)));
  }

  async function filter(petFilter: IFilter) {
    setNotFoundMessage("");
    const arrayPets = await filterPets(petFilter, token);

    if (arrayPets.data.length > 0) {
      setFilteredPets(arrayPets.data);
    } else {
      setNotFoundMessage(
        "Nenhum peludinho com essas especificações foi encontrado!"
      );
      setFilteredPets([]);
    }
  }

  function clearFilter() {
    setFilteredPets([]);
    setNotFoundMessage("");
    setTypePet(undefined);
    setState(undefined);
    setCity(undefined);
    setValue("age", undefined);
    setValue("gender", undefined);
    setValue("size", undefined);
  }

  useEffect(() => {
    getStates();
  }, []);

  return (
    <S.ContainerSearch>
      <S.H3>Encontre e adote</S.H3>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.ContainerIcons>
          <S.ContentIcon
            onClick={() => setTypePet("dog")}
            style={
              typePet === "dog"
                ? { border: "1px solid #ECB159" }
                : { border: "none" }
            }
          >
            <S.Icon src={dogIcon} alt="" />
            <S.IconText>Cão</S.IconText>
          </S.ContentIcon>

          <S.ContentIcon
            onClick={() => setTypePet("cat")}
            style={
              typePet === "cat"
                ? { border: "1px solid #ECB159" }
                : { border: "none" }
            }
          >
            <S.Icon src={catIcon} alt="" />
            <S.IconText>Gato</S.IconText>
          </S.ContentIcon>
        </S.ContainerIcons>

        <S.ContainerSelect>
          <S.TitleSelect>Características </S.TitleSelect>
          <S.ContentSelect>
            <SelectInput
              onChange={(value) => setValue("size", value)}
              placeholder="Porte"
              listItems={[
                { value: "Pequeno", name: "Pequeno" },
                { value: "Médio", name: "Médio" },
                { value: "Grande", name: "Grande" },
              ]}
              value={watch("size")}
            />

            <SelectInput
              onChange={(value) => setValue("age", value)}
              placeholder="Idade"
              listItems={[
                { value: "Filhote", name: "Filhote" },
                { value: "Jovem", name: "Jovem" },
                { value: "Adulto", name: "Adulto" },
                { value: "Idoso", name: "Idoso" },
              ]}
              value={watch("age")}
            />

            <SelectInput
              onChange={(value) => setValue("gender", value)}
              placeholder="Sexo"
              listItems={[
                { value: "Macho", name: "Macho" },
                { value: "Fêmea", name: "Fêmea" },
              ]}
              value={watch("gender")}
            />
          </S.ContentSelect>
        </S.ContainerSelect>

        <S.ContainerSelect>
          <S.TitleSelect>Localização </S.TitleSelect>
          <S.ContentSelect>
            <SelectInput
              onChange={getCities}
              placeholder="Estado"
              listItems={listStates}
            />

            <SelectInput
              onChange={setCity}
              placeholder="Cidade"
              listItems={listCities}
            />
          </S.ContentSelect>
        </S.ContainerSelect>

        <S.ContainerButtons>
          <CustomButton
            type="submit"
            backgroundColor="#B67352"
            hoverBackgroundColor="#c27a56"
          >
            Filtrar
          </CustomButton>
          <S.ClearButton onClick={clearFilter}>Limpar filtro</S.ClearButton>
        </S.ContainerButtons>
      </S.Form>
    </S.ContainerSearch>
  );
}
