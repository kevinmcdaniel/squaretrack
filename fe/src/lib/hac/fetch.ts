// {{api-url}}/api/call/list

import * as http from "http";

let url = 'http://square.api:3000/api/call/list';
let apiurl = 'http://square.api:3000/api/';


export const fetchData = async (fetchURI: string): Promise<JSON | null> => {
  const res = await fetch(`${apiurl}${fetchURI}`);
  const data = await res.json()
  console.log(data)
  return data;
}

