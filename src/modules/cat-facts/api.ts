import Http from "../httpModule/http";

export async function fetchRandomCatFact (): Promise<CatFact | null> {
  const httpModule = new Http();
  const response = await httpModule.get<CatFact>(
    'https://cat-fact.herokuapp.com/facts/random'
  );

  return response;
}