const END_POINT = 'https://geektrust.s3-ap-southeast-1.amazonaws.com';
const NAME_SPACE = 'adminui-problem';

const buildApiUrl = (url) => {
  if (url) {
    const baseUrl = `${END_POINT}/${NAME_SPACE}`;
    return `${baseUrl}${url}`;
  }
  return url;
}

const ServiceRequest = (config) =>  {
  const url = (config && config.url) || '';

  const requestConfig = {
    ...config,
    method: (config && config.method) || 'GET',
    body:
      config
      && config.method !== 'GET'
      && config.method !== 'HEAD'
      && JSON.stringify(config.requestParams),

  };

  const apiUrl = buildApiUrl(url, requestConfig);
  return new Request(apiUrl, requestConfig);
}

export { ServiceRequest as default };
