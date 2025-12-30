// import * as http from "http";

let apiurl = `${process.env.BE_URL}:${process.env.BE_PORT_INT}`;

export const fetchData = async (fetchURI: string): Promise<JSON | null> => {
  try {
    const fullUrl = `${apiurl}${fetchURI}`;
    console.log(`fetchData: Attempting to fetch from: ${fullUrl}`);

    let res: Response;
    try {
      res = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add these for better error handling
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'no-cache',
      });
    } catch (networkError) {
      console.error('fetchData: Network error details:', {
        message: networkError instanceof Error ? networkError.message : 'Unknown network error',
        name: networkError instanceof Error ? networkError.name : 'UnknownError',
        fullUrl,
        timestamp: new Date().toISOString(),
      });
      throw new Error(`Network error while fetching ${fetchURI}: ${networkError instanceof Error ? networkError.message : 'Unknown error'}`);
    }

    if (!res.ok) {
      let errorText = '';
      try {
        errorText = await res.text();
      } catch (e) {
        errorText = 'Could not read error response';
      }
      const errorDetails = `Status: ${res.status} ${res.statusText}, URL: ${fullUrl}, Response: ${errorText}`;
      console.error('fetchData: API error:', errorDetails);
      throw new Error(`API error: ${errorDetails}`);
    }

      const data = await res.json();
      return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('fetchData: Error details:', {
      message: errorMessage,
      fetchURI,
      timestamp: new Date().toISOString(),
    });
    throw new Error(`Failed to fetch ${fetchURI}: ${errorMessage}`);
  }
}
