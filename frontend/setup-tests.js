import '@testing-library/jest-dom';
import 'jest-canvas-mock';

require('jest-fetch-mock').enableMocks()

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

jest.mock("lottie-web");