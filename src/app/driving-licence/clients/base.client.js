const createBaseClient = (req) => {
  const sessionHeader = req.session.tokenId
    ? { session_id: req.session.tokenId }
    : {};

  return {
    get: (path, headers = {}) =>
      req.customFetch(path, {
        method: "GET",
        headers: { ...headers, ...sessionHeader }
      }),

    post: (path, body, headers = {}) =>
      req.customFetch(path, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          ...headers,
          ...sessionHeader
        }
      })
  };
};

module.exports = {
  createBaseClient
};
