import { model } from 'mongoose';
import { IToken, ITokenModel } from './token.document';
import TokenSchema from './token.schema';

const Token = model<IToken, ITokenModel>('token', TokenSchema);

export default Token;
