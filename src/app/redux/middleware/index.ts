export { recordsMiddleware } from './record/record';
export { responseMiddleware } from './response/response';
export { localStorageMiddleware } from './localStorage';

if (module.hot) module.hot.accept();
