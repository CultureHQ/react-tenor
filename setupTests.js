/* eslint-disable import/no-extraneous-dependencies */

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { startTestServer, stopTestServer } from "./src/__tests__/testServer";

configure({ adapter: new Adapter() });

beforeAll(() => startTestServer());
afterAll(() => stopTestServer());
