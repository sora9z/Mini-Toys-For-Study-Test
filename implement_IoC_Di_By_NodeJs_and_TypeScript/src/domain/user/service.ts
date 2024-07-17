import { Injectable } from "../../core/decorator/injectable.decorator";
import { UserRepository } from "./repository";

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }
}
