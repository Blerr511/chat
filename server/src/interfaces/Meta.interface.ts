export interface MetaItem {
    type: 'error' | 'warning';
    message?: string;
}

export type Meta<D = object> = Record<keyof D, MetaItem>;
