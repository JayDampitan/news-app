const fetchApi = async (request: string, options?: Object) =>
  await fetch(request, options)
    .then((response) => response.json())
    .then((data) => data);

export default fetchApi;
