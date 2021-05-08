import { fetchData, handleResponse } from '../../services/service';

const getUsersList = () => {
  return fetchData({
    url: '/members.json',
  })
  .then(data => handleResponse(data));
};

export default getUsersList;
