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
import { ModalAdopt } from "../components/modalAdopt/index";
import * as Dialog from "@radix-ui/react-dialog";

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

jest.mock("node-fetch");

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

  test("should display errors when inputs are invalid on modal adoption", async () => {
    renderComponent();

    await waitFor(() => {
      const buttonAdopt = screen.getByTestId("btn-adopt");

      fireEvent.click(buttonAdopt);

      expect(screen.getByText("Formulário de adoção")).toBeInTheDocument();
    });

    const submitButton = screen.queryByTestId("submit-button");

    if (submitButton) {
      fireEvent.click(submitButton);

      const spanErrorElements = screen.findAllByRole("alert");

      expect(spanErrorElements).toBeTruthy();
    } else {
      throw new Error("Submit button not found");
    }
  });

  test("should render success message after send form adoption", async () => {
    renderComponent();

    await waitFor(() => {
      const buttonAdopt = screen.getByTestId("btn-adopt");

      fireEvent.click(buttonAdopt);

      expect(screen.getByText("Formulário de adoção")).toBeInTheDocument();
    });

    const radioButton1 = screen.getByTestId("radio-button-1");
    const radioButton2 = screen.getByTestId("radio-button-2");
    const radioButton3 = screen.getByTestId("radio-button-3");
    const radioButton4 = screen.getByTestId("radio-button-4");

    fireEvent.click(radioButton1, { target: { checked: true }});
    fireEvent.click(radioButton2, { target: { checked: true }});
    fireEvent.click(radioButton3, { target: { checked: true }});
    fireEvent.click(radioButton4, { target: { checked: false }});

    const form = screen.getByTestId("form-adoption");

    fireEvent.submit(form);

    expect(screen.findByText("Pedido de adoção enviado com sucesso!")).toBeTruthy()

  });
});
