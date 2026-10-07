import { request } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";

async function globalSetup(){
    const api = await request.newContext({ baseURL });

    const response = await api.post("/api/auth/register", {
        data: {
            name: "Playwright Test User",
            email: "test@example.com",
            password: "TestPassword123"
        },
    });

    if (!response.ok() && response.status() !== 409) {
        throw new Error(
            `Failed to create test: user ${response.status()} ${await response.text}`
        );
    }

    await api.dispose();
}

export default globalSetup;