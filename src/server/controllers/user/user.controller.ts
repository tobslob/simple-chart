import {
  controller,
  httpPost,
  request,
  response,
  requestBody,
  httpGet,
  queryParam,
} from "inversify-express-utils";
import { BaseController, validate } from "@app/data/util";
import { User, UserDTO } from "@app/data/user";
import { Users } from "@app/services/user";
import { Request, Response } from "express";
import { isEmail, isUser } from "./user.validator";

type controllerResponse = User | User[];

@controller("/users")
export class UserController extends BaseController<controllerResponse> {
  @httpPost("/", validate(isUser))
  async createUser(
    @request() req: Request,
    @response() res: Response,
    @requestBody() body: UserDTO
  ) {
    try {
      const user = await Users.createUser(body);
      this.handleSuccess(req, res, user);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }

  @httpGet("/", validate(isEmail))
  async getUserByEmail(
    @request() req: Request,
    @response() res: Response,
    @queryParam("emailAddress") emailAddress: string
  ) {
    try {
      let user: User[];
      if (emailAddress) {
        user = await Users.getUserByEmail(emailAddress);
      } else {
        user = await Users.getUsers();
      }
      this.handleSuccess(req, res, user);
    } catch (error) {
      this.handleError(req, res, error);
    }
  }
}
