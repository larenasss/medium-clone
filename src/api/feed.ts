import axios from "@/api/axios";

const getFeed = (apiUrl: string) => {
  return axios.get(apiUrl);
};

export default {
  getFeed
};