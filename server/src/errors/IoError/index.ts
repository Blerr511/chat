import { Meta } from 'interfaces/Meta.interface';

export class IoError<D> extends Error {
    meta?: Meta<D>;
    isCritical?: boolean;
    constructor(message: string, meta?: Meta<D>, isCritical?: boolean) {
        super(message);
        this.meta = meta;
        this.isCritical = isCritical;
    }
}
