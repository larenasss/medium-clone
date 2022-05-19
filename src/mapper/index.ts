import { UserProfile } from "@/entities/user";
import { UserViewModel } from "@/models/user";
import { Mapper } from "@wufe/mapper";

const mapper = new Mapper();
mapper.createMap<UserViewModel, UserProfile>(UserViewModel);

export default mapper;