import connectDb from './db/mongooseConnect';
import initServices from './services';
// ----------------------------------------------s------------ //
// ---------- CONNECTING TO MONGODB AND SOCKET IO ----------- //
(async () => {
    await connectDb();
    await initServices();
})();
// ---------------------------------------------------------- //
