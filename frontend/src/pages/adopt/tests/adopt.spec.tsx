import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Adopt } from "..";
import { MemoryRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import TokenContext, {
  TokenContextProvider,
} from "../../../contexts/tokenContext";
import "@testing-library/jest-dom";
import {
  mockPets,
  mockAllPets,
  mockFavoritesPets,
} from "../../../../mocks/pets.mock";
import { mockStates } from "../../../../mocks/states.mock";
import { Card } from "../../../components/card/card";

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

jest.mock("node-fetch");

const token = "123456";
const setToken = jest.fn();

const renderComponent = () => {
  const adopt = "/adotar";
  return render(
    <MemoryRouter initialEntries={[adopt]}>
      <TokenContext.Provider value={{ token, setToken }}>
        <Theme>
          <ThemeProvider theme={theme}>
            <Adopt />
            <Card
              key={mockPets.data[0].id}
              pet={mockPets.data[0]}
              typeUser={"user"}
            />
          </ThemeProvider>
        </Theme>
      </TokenContext.Provider>
    </MemoryRouter>
  );
};

jest.mock("../../../services/apiIBGE", () => ({
  getListStates: jest.fn(() => Promise.resolve(mockStates)),
}));

jest.mock("../../../services/pet.service", () => ({
  listAllPets: jest.fn(() => Promise.resolve(mockAllPets)),
  listPetsWithPagination: jest.fn(() => Promise.resolve(mockPets)),
}));

describe("Adopt", () => {
  test("should render a list of pets", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("John")).toBeTruthy();
    });
  });

  test("should open adoption form and show correct pet name", async () => {
    renderComponent();

    await waitFor(() => {
      const buttonAdopt = screen.getByTestId("btn-adopt");

      fireEvent.click(buttonAdopt);

      expect(screen.getByText("Formulário de adoção")).toBeInTheDocument();
    });

    expect(screen.queryAllByText("John")).toBeTruthy();
  });
});
