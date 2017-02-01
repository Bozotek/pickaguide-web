export default class Cookie {

  static get(key) {
    const cookiePairs = document.cookie.split(';');
    const cookieSplitPairs = cookiePairs.map(pair => {
      const splitPair = pair.split('=');
      return { key: splitPair[0].trim(), value: splitPair[1].trim() };
    });

    const tokenPair = cookieSplitPairs.find(pair => pair.key === key);
    return (tokenPair ? tokenPair.value : null);
  }

  static set(key, value) {
    document.cookie = `${key}=${value}`;
  }

  static revoke() {
    document.cookie = '';
  }

  static isEmpty() {
    return document.cookie === '';
  }
}
