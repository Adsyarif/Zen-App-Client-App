interface FetchUtilParams {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  data?: any;
  headers?: any;
}

const FetchUtil = async (params: FetchUtilParams) => {
  const { url, data = undefined, headers = undefined, method = "GET" } = params;
  const fetchOptions: RequestInit = {
    method,
  };
  if (headers) {
    fetchOptions.headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }
  if (method !== "GET" && data) {
    fetchOptions.headers = {
      ...headers,
      "Content-Type": "application/json",
    };
    fetchOptions.body = JSON.stringify(data);
  }
  fetchOptions.headers = {
    ...headers,
  };
  const response = await fetch(url, fetchOptions);
  return response.json();
};

export { FetchUtil };
