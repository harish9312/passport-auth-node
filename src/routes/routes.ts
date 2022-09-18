import { Application, json, NextFunction } from "express";
import { routes } from "./routes.data";
import { Request, Response } from "express";
import { ResponseHandler } from "../shared/response-handler";
import initPassport from "../configuration/passport.config";
import passport from "passport";
import session from "express-session";

export const registerMiddlewares = (app: Application) => {
  app.use(json());

  initPassport(passport);

  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // app.post(
  //   "/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/user/login",
  //     failureRedirect: "/user/error",
  //   })
  // );

  for (let route of routes) {
    app.use(route.path, route.router);
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
