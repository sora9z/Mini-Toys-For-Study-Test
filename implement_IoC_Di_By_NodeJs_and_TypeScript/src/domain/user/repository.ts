import { Injectable } from "../../core/decorator/injectable.decorator";

@Injectable()
export class UserRepository {
  async getUsers() {
    const users = [
      {
        id: 1,
        name: "Kang So",
        email: "aaa@sora.com",
      },
      {
        id: 2,
        name: "RaTaeng",
        email: "ratang@sora.com",
      },
    ];
    return users;
  }
}
