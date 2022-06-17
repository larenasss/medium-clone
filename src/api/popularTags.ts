import axios from "@/plugins/axios";
import { Tag } from "@/entities/tag";

const getPopularTags = (): Promise<Array<Tag>> => {
  return axios.get('/tags').then(response => response.data.tags);
};

export default {
  getPopularTags
};