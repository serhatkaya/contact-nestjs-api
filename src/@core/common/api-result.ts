export class ApiResult<T> {
    constructor(result?: T, succeed?: boolean, message?: string, error?: any) {
        this.result = result ?? null;
        this.succeed = succeed ?? null;
        this.message = message ?? null;
        this.error = error ?? null;
    }

    result: T;
    succeed: boolean;
    message: string;
    error: any
}

export class DataApiResult<T> {
    result: Array<T>;
    succeed: boolean;
}