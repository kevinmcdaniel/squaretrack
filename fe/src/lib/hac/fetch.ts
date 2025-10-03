// import * as http from "http";

let apiurl = 'http://square.api:3000/api/';

export const fetchData = async (fetchURI: string): Promise<JSON | null> => {
  try {
    const res = await fetch(`${apiurl}${fetchURI}`);
    const data = await res.json()
    console.log(data)
    return data;
  } catch (error) {
    throw new Error(`api failed fetch ${fetchURI}:\n${error}`);
  }
}

