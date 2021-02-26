import { Env } from "@tsed/core";
import { Configuration, Inject, InjectorService } from "@tsed/di";
import { $log, PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import hihi
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/typeorm";
import typeormConfig from "./config/typeorm";
import { User } from "./entities/User";
import { UserRepository } from "./repositories/UserRepository";
import { deserialize } from "@tsed/json-mapper";

export const rootDir = __dirname;
export const isProduction = process.env.NODE_ENV === Env.PROD;

if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json"
    }
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json"
    }
  });
}

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    disableRoutesSummary: isProduction
  },
  mount: {
    "/rest": [`${rootDir}/controllers/**/*.ts`]
  },
  typeorm: typeormConfig,
  exclude: ["**/*.spec.ts"],
  passport: {
    userInfoModel: User
  },
  componentsScan: [`${rootDir}/protocols/**/*.ts`]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  @Inject()
  injector: InjectorService;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );
  }

  async $onReady(): Promise<void> {
    const repository = this.injector.get<UserRepository>(UserRepository)!;
    const count = await repository.count();

    if (!count) {
                  // const user = deserialize(
                  //   {
                  //     email: process.env.ROOT_EMAIL || "admin@aspire.test",
                  //     password: process.env.ROOT_PWD || "admin",
                  //     firstName: "admin",
                  //     lastName: "admin",
                  //     age: 18,
                  //     type: "admin"
                  //   },
                  //   { type: User }
                  // );

                  await repository.save({
                    email: process.env.ROOT_EMAIL || "admin@aspire.test",
                    password: process.env.ROOT_PWD || "admin",
                    firstName: "admin",
                    lastName: "admin",
                    age: 18
                  });
                }
  }
}
