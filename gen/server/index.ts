import { Bespoke, Function, Import, Module, Type, Variable } from "typescriptase";

export const module: Module = Module.new({
  content: [
    Import.new({
      name: "@babel/polyfill",
    }),
    Import.new({
      name: "aws-serverless-express",
      withDefaultAs: "lambda",
    }),
    Import.new({
      name: "rollbar",
      withAllAs: "Rollbar",
    }),
    Import.new({
      name: "body-parser",
      with: ["json", "urlencoded"],
    }),
    Import.new({
      name: "cors",
      withDefaultAs: "cors",
    }),
    Import.new({
      name: "express",
      withDefaultAs: "express",
    }),
    Import.new({
      name: "express-bearer-token",
      withDefaultAs: "bearer",
    }),
    Import.new({
      name: "helmet",
      withDefaultAs: "helmet",
    }),
    Import.new({
      name: "./server",
      with: ["graphQL"],
    }),
    Variable.newImmutable({
      assignment: "express()",
      type: Type.Required.new({ name: "app", type: "express.Express" }),
    }),
    Variable.newMutable({
      assignment: "false",
      type: Type.Required.new({ name: "didSetup", type: "boolean" }),
    }),
    Bespoke.new({
      name: "main",
    }),
    Function.Sync.newExported({
      content: [
        Bespoke.new({
          name: "handler",
        }),
      ],
      inTypes: [
        Type.Argument.new({ name: "event", type: "object" }),
        Type.Argument.new({ name: "context", type: "object" }),
      ],
      name: "handler",
      outType: Type.Anonymous.new({ type: "void" }),
    }),
  ],
  destination: "src/server/index.ts",
});
