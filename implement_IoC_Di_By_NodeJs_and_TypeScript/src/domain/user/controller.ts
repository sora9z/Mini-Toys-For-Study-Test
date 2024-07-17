import { Request, Response } from "express";
import { Injectable } from "../../core/decorator/injectable.decorator";
import { Get } from "../../core/decorator/method.decorator";
import { UserService } from "./service";

@Injectable()
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/user")
  async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.send(users);
  }
}
