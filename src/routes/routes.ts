import express from "express";
import { UserController } from "../controllers/UserC";
import { MoniterController } from "../controllers/MoniterC";
import { CpuController } from "../controllers/Cpu_C";
import { MouseController } from "../controllers/MouseC";
import { AsignSystemController } from "../controllers/AsignSystem_C";

/* validation file import */
import { userValidationRules, validate } from "../validation/uservalidation";
import { authChecker } from "../middleware/authChecker";
import {
  moniterValidationRules,
  monitervalidate,
} from "../validation/monitervalidation";

import { cpuValidationRules, cpuvalidate } from "../validation/cpuvalidation";

import {
  asignsystemValidationRules,
  asignsystemvalidate,
} from "../validation/assignsystemvalidation";
import {
  mouseValidationRules,
  mousevalidate,
} from "../validation/mousevalidation";

export class Routes {
  public userController: UserController = new UserController();
  public monitercontroller: MoniterController = new MoniterController();
  public cpucontroller: CpuController = new CpuController();
  public mousecontroller: MouseController = new MouseController();

  public asignsystemController: AsignSystemController =
    new AsignSystemController();

  /* -----------------------------------------------------------------User VIew API Routes--------------------------------------------------------------------------------------------------------------------- */

  public routes(app: express.Application): void {
    //======================== User Add ===============================

    app
      .route("/SignUp")
      .post(userValidationRules(), validate, this.userController.Signup_User);

    //======================== User Login ===============================

    app.route("/SignIn/").get(this.userController.SignIn);

    //======================== User Update ===============================

    app
      .route("/updateuser/:userId")
      .put(
        authChecker,
        userValidationRules(),
        validate,
        this.userController.update_User
      );

    //======================== User Delete ===============================
    app
      .route("/deleteuser/:userId")
      .delete(authChecker, this.userController.delete_user);

    //======================== Home Page  ===============================
    app.route("/").get(authChecker, this.userController.home);

    //======================== view single User ===============================
    app
      .route("/user/:userId")
      .get(authChecker, this.userController.single_user_view);

    //======================== view all Users ===============================
    app.route("/user").get(authChecker, this.userController.getUser);

    /* --------------------------------------------------------Assign a System API Routes---------------------------------------------------------------------------------------------------------- */

    //======================== Moniter Add Update Delete View  ===============================
    app
      .route("/addmoniter")
      .post(
        authChecker,
        moniterValidationRules(),
        monitervalidate,
        this.monitercontroller.addMoniter
      );
    app
      .route("/viewmoniter")
      .get(authChecker, this.monitercontroller.viewMoniter);
    app
      .route("/updatemoniter/:moniterId")
      .put(
        authChecker,
        moniterValidationRules(),
        monitervalidate,
        this.monitercontroller.updateMoniter
      );
    app
      .route("/deletemoniter/:moniterId")
      .delete(authChecker, this.monitercontroller.deleteMoniter);

    //======================== CPU Add Update Delete View  ===============================
    app
      .route("/addcpu")
      .post(
        authChecker,
        cpuValidationRules(),
        cpuvalidate,
        this.cpucontroller.addCpu
      );

    app.route("/viewcpu").get(authChecker, this.cpucontroller.viewCpu);

    app
      .route("/updatecpu/:cpuId")
      .put(
        authChecker,
        cpuValidationRules(),
        cpuvalidate,
        this.cpucontroller.updateCpu
      );
    app
      .route("/deletecpu/:cpuId")
      .delete(authChecker, this.cpucontroller.deleteCpu);

    //======================== Mouse Add Update Delete View  ===============================
    app
      .route("/addmouse")
      .post(
        authChecker,
        mouseValidationRules(),
        mousevalidate,
        this.mousecontroller.addMouse
      );
    app.route("/viewmouse").get(authChecker, this.mousecontroller.viewMouse);
    app
      .route("/updatemouse/:mouseId")
      .put(authChecker, this.mousecontroller.updateMouse);
    app
      .route("/deletemouse/:mouseId")
      .delete(authChecker, this.mousecontroller.deleteMouse);

    //======================== AssignSystem Add Update Delete View  ===============================
    app
      .route("/addAssignSystem")
      .post(
        authChecker,
        asignsystemValidationRules(),
        asignsystemvalidate,
        this.asignsystemController.addassignSystem
      );
    app
      .route("/viewassignSystem")
      .get(authChecker, this.asignsystemController.viewassignSystem);

    /*     //======================== view single AssignSystem ===============================
    app
      .route("/singleviewassignsystem/:assignsystemId")
      .get(authChecker, this.asignsystemController.singleviewassignSystem);
 */
    app
      .route("/updateassignSystem/:assignsystemId")
      .put(authChecker, this.asignsystemController.updateassignSystem);
    app
      .route("/deleteassignSystem/:assignsystemId")
      .delete(authChecker, this.asignsystemController.deleteaddassignSystem);
  }
}
