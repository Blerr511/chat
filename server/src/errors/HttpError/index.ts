import { Meta } from 'interfaces/Meta.interface';

export class HttpError<D> extends Error {
    code: number;
    meta: Meta<D>;
    constructor(message: string, code?: number, meta?: Meta<D>) {
        super(message);
        this.code = code;
        this.meta = meta;
    }
}
