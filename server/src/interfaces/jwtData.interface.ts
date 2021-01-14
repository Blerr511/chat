export interface JWTData {
    _id: string;
    username: string;
    email: string;
}

export interface JWTDecodedData extends JWTData {
    iat: number;
    exp: number;
}
