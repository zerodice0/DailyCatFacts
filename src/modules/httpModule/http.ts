export default class Http {
  public async get<T>(url: string): Promise<T|null> {
    let result: T|null = null;
    try {
      const res = await fetch(url);
      if (res.ok) {
        result = await res.json();
      }
    } catch (e) {
      console.error(e);
    }

    return result;
  }
  
}