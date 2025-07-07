export class Cookie {
  public static get(cookieString: string, name: string): string | null {
    const cookies = cookieString.split("; ");
    for (const cookie of cookies) {
      const [cookieName, ...cookieValueParts] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValueParts.join("="));
      }
    }
    return null;
  }
}
