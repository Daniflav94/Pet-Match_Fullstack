import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { Adopt } from "..";
import { MemoryRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import TokenContext, {
  TokenContextProvider,
} from "../../../contexts/tokenContext";
import "@testing-library/jest-dom";
import { mockPets, mockAllPets } from "../../../../mocks/pets.mock";
import { mockStates } from "../../../../mocks/states.mock";

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
  test("Should render a list of pets", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("John")).toBeTruthy();
    });
  });
});
