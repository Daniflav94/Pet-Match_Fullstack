import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import { MemoryRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import TokenContext from "../../../contexts/tokenContext";
import "@testing-library/jest-dom";
import {
  mockPets,
  mockAllPets,
  mockFilterPets,
  mockFavoritesPets,
} from "../../../../mocks/pets.mock";
import { mockStates } from "../../../../mocks/states.mock";
import { Card } from "../../../components/card/card";
import { Adopt } from "../../adopt";
import { FilterAdopt } from "../../adopt/components/filter";
import { Favorites } from "..";

import { mockUser } from "../../../../mocks/user.mock";
import { getListFavorites } from "../../../services/pet.service";

const theme = {
  colors: {
    blue: "",
    snow: "",
    yellow: "",
    brown: "",
    nude: "",
    nude2: "",
    coffee: "",
    green: "",
    red: "",
    gray: "",
    gray2: "",
  },
};

const token =
  "123";
const setToken = jest.fn();


const renderWithTokenContext = () => {
  return render(
    <MemoryRouter>
      <TokenContext.Provider value={{ token, setToken }}>
        <Theme>
          <ThemeProvider theme={theme}>
            <Favorites />
            <Card
              key={mockFavoritesPets.data[0].id}
              pet={mockFavoritesPets.data[0].pet}
              typeUser={"user"}
              favorites={mockFavoritesPets.data}
            />
          </ThemeProvider>
        </Theme>
      </TokenContext.Provider>
    </MemoryRouter>
  );
};

jest.mock("../../../services/pet.service.ts", () => ({
  getListFavorites: jest.fn(() => Promise.resolve(mockFavoritesPets)),
}));


test("should render a list of pets", async () => {
  renderWithTokenContext();

  await waitFor(() => {
    expect(screen.getByText("Lupi")).toBeTruthy();
  });
});
