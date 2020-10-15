type CookieType = {
  name: string;
  value: string;
};

const cookieFormatter = (cookieChunk: string): CookieType[] => {
  const splitedChunk = cookieChunk.split(' ');
  const cookies = splitedChunk.map(cookie => {
    const splitedCookie = cookie.split('=');
    const name = splitedCookie[0];
    const haveSemi = splitedCookie[1].endsWith(';');
    const value = haveSemi ? splitedCookie[1].slice(0, -1) : splitedCookie[1];
    return { name, value };
  });
  return cookies;
};

export default cookieFormatter;
