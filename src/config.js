const target = (prod, dev) => (process.env.NODE_ENV === 'production' ? prod : dev);

export const API = target('https://jeska-server.herokuapp.com', 'http://localhost:3000');
export const SMALL_BREAKPOINT = 450;
