export default ({
  apiUrl,
  post,
}) => {

  const syncUtm = (data = null) => {
    const ApiVersion = 'v1';
    return post({
      url: apiUrl,
      endPoint: `/api/${ApiVersion}/utm/sync`,
      contentType: 'application/json',
      data: data,
    });
  }

  return {
    syncUtm,
  };
}
