export class CustomStorage {
  public static get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return "";
    }
  }

  public static set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
