import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TokenContext from "../../../contexts/tokenContext";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "styled-components";
import App from "../../../App";
import {
  mockNotifications,
  mockUpdateNotifications,
} from "../../../../mocks/notifications.mock";
import { mockUser } from "../../../../mocks/user.mock";
import { Navbar } from "../../navbar";
import { IUser } from "../../../interfaces/IUser";
import { IOrganization } from "../../../interfaces/IOrganization";
import { Notifications } from "..";
import NotificationsContext from "../../../contexts/notificationContext";

const token = "123456";
const setToken = jest.fn();
const notifications = mockNotifications.data;
const setNotifications = jest.fn();

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

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <TokenContext.Provider value={{ token, setToken }}>
        <NotificationsContext.Provider
          value={{ notifications, setNotifications }}
        >
          <Theme>
            <ThemeProvider theme={theme}>
              <App />
              <Navbar />
              <Notifications setIsVisible={jest.fn()} />
            </ThemeProvider>
          </Theme>
        </NotificationsContext.Provider>
      </TokenContext.Provider>
    </MemoryRouter>
  );
};

const setupLocalStorage = (user: IUser | IOrganization) => {
  const serializedUser = JSON.stringify(user);

  localStorage.setItem("user", serializedUser);
};

jest.mock("../../../services/notifications.service.ts", () => ({
  getNotifications: jest.fn(() => Promise.resolve(mockNotifications)),
  updateNotification: jest.fn(() => Promise.resolve(mockUpdateNotifications)),
}));

jest.spyOn(window.screen, "width", "get").mockReturnValue(1000);

describe("Notifications", () => {
  beforeEach(() => {
    setupLocalStorage(mockUser);
  });

  test("should show notifications component", () => {
    renderComponent();

    const buttonNotifications = screen.getAllByTestId("button-notifications");
    fireEvent.click(buttonNotifications[0]);

    expect(screen.getAllByText("Notificações")).toBeTruthy();
  });

  test("should render a list of notifications", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.findByText("Adoção aprovada")).toBeTruthy();
    });
  });

  test("should open modal notification", async () => {
    renderComponent();

    const buttonOpenNotification = screen.getByTestId(
      "button-see-more-notification"
    );
    fireEvent.click(buttonOpenNotification);

    await waitFor(() => {
      expect(screen.findByText("Que notícia maravilhosa")).toBeTruthy();
    });
  });
});
