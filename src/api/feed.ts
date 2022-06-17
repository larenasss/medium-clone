import axios from "@/plugins/axios";
import { Feed } from "@/entities/feed";
import { AxiosResponse } from "axios";

const getFeed = (apiUrl: string): Promise<AxiosResponse<Feed>> => {
  return axios.get(apiUrl);
};

export default {
  getFeed
};