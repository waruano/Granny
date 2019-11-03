export class CustomStorage {

    public static get(key:string):any {
      return JSON.parse(localStorage.getItem(key));
    }
  
    public static set(key:string,data:any):void {
    localStorage.setItem(key,JSON.stringify(data))
    }
  
}