import { NextFunction, Request, Response, Router } from "express";
import passportConfig from "../configuration/passport.config";
import passport from "passport";
import { ResponseHandler } from "../shared/response-handler";
import userService from "../services/user.service";
import { IUser, ICredentials } from "../types/user.types";
const router = Router();
router.post("/register", async (req, res, next) => {
  try {
    const patient = req.body as IUser;
    console.log(patient);
    const result = await userService.create(patient);
    res.send(new ResponseHandler(result));
  } catch (e) {
    console.log(e);

    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const user = req.body as IUser;
    const result = await userService.getUser();
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const user = req.body as ICredentials;
    const registeredUser = req.body as IUser;
    const result = await userService.updateUSer(user, registeredUser);
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    const result = await userService.deleteUser(Number(id));
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

router.post(
  "/login",
  passportConfig(passport).authenticate("local", {
    successRedirect: "/user/login",
    failureRedirect: "/user/error",
  })
);

router.get("/login", async (req, res, next) => {
  try {
    const result = await userService.getToken(req.user);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/error", async (req, res, next) => {
  try {
    res.send({ error: "something went wrong" });
  } catch (error) {
    next(error);
  }
});

// router.post("/login", function (req, res, next) {
//   passport.authenticate("local", function (err, user, info) {
//     console.log(err, user, info);
//     if (err) {
//       res.json({ message: err.message });
//     }
//     if (!user) {
//       res.json({ message: info.message });
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         res.json({ message: err.message });
//       } else {
//         return res.redirect("/");
//       }
//     });
//   })(req, res, next);
// });

export default router;
