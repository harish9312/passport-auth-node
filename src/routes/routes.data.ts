import { IRoute } from "./routes.types";
import UserRouter from "./user.routes";
export const routes: IRoute[] = [
  {
    path: "/user",
    router: UserRouter,
  },
];
