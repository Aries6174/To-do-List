import "@testing-library/jest-dom";

global.Response = {
    json: (
        data: unknown,
        init?: {
            status?: number;
        }
    ) => ({
        status: init?.status ?? 200,
        json: async () => data,
    }),
} as typeof Response;

class MockRequest {
    method: string;
    headers: Headers;
    private body: string;

    constructor(
        public url: string,
        options: {
            method?: string;
            headers?: Record<string, string>;
            body?: string;
        } = {}
    ) {
        this.method = options.method ?? "GET";
        this.headers = new Headers(options.headers);
        this.body = options.body ?? "";
    }

    async json() {
        return JSON.parse(this.body);
    }
}

global.Request = MockRequest as unknown as typeof Request;