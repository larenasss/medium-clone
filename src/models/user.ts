import { UserProfile } from "@/entities/user";
import { mapTo } from "@wufe/mapper";

@mapTo(UserProfile)
export class UserViewModel {
  constructor(public email: string = '', public password: string = '') {}
}