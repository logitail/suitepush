#!/usr/bin/env deno run --allow-read --allow-net --allow-write

// Import necessary modules
import { Command } from "@cliffy/command";
import { gray } from "@std/fmt/colors";
import { createCommand } from "./commands/create.ts";
import { checkSdfFolderStructure } from "./utils/functions.ts";

// main cli command ($suitepush)
await new Command()
  .name("suitepush")
  .version("0.1.3")
  .versionOption(
    " -v, --version",
    "Print version info.",
    function (this: Command) {
      console.log("Version: %s", this.getVersion());
    },
  )
  .description(
    gray(
      `A CLI tool for creating SDF objects and deploying SuiteScripts to NetSuite. \n Supports: Suitelet, Restlet, UserEventScript, ClientScript, ScheduledScript, MapReduceScript`,
    ),
  )
  // .example(
  //   "general use: ",
  //   `$suitepush [command] [option] (enter)
  // ${
  //     cyan(
  //       "Please provide the path to the SuiteScript file you want to use (press 'UP' to browse, or start to type the path/filename).",
  //     )
  //   }`,
  // )
  .action(() => {
    // Default action when no subcommand is provided
    console.log(`---\r
      Welcome to suitepush! ${gray("Use--help to see available commands.")}`);
    checkSdfFolderStructure(); // Optional: Check structure if needed by default
  })
  // .type("log-level", logLevelType)
  .command("create", createCommand)
  // .command("deploy", deployCommand)
  // .command("random", randomCommand)
  // .command("file", fileCommand)

  // .option("-h, --help", "Show help information")
  // .option("-v, --version", "Show the version")
  // .option("-c, --config", "Manage configurations")
  // .option("-s, --setup", "Setup the tool")
  .parse(Deno.args);

// END
