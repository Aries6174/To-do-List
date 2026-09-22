import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testPathIgnorePatterns: [
        "<rootDir>/tests/",
    ],
    moduleNameMapper:{
        "^@\\/(.*)$": "<rootDir>/src/$1",
    },
};

export default config;