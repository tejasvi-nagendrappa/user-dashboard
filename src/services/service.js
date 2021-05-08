import ServiceRequest from './ServiceRequest';

const performFetch = async (config) => {
  const serviceRequest = ServiceRequest(config);
  const result = await fetch(serviceRequest);
  return result;
}

const fetchData = (config) => {
  return performFetch(config);
}

const handleResponse = (response) => {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    throw new Error(`Content-type ${contentType} not supported`)
  }
}

const handleJSONResponse = (response) => {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }
      ))
    }
  })
}

const handleTextResponse = (response) => {
  return response.text()
    .then(text => {
      if (response.ok) {
        return text
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
}

export {
  fetchData,
  handleResponse,
};
