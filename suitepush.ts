// import necessary Deno modules and any helper libraries
//TODO once stable package is release update this link to jsr
// import { Command } from "jsr:@cliffy/command";
import { Command } from "jsr:@cliffy/command@^1.0.0-rc.7";
import { existsSync } from "https://deno.land/std/fs/mod.ts";

// Function to validate suiteconfig.js
function validateSuiteConfig() {
  const suiteConfigPath = `${Deno.cwd()}/suitecloud.config.js`;
  if (!existsSync(suiteConfigPath)) {
    console.error(`Error: suitecloud.config.js not found in the current working directory: ${Deno.cwd()}`);
    Deno.exit(1);
  }
  console.log(`suitecloud.config.js found and validated at: ${suiteConfigPath}`);
}


// Function to handle deployment
async function handleDeployment(scriptType: string) {
  console.log(`Deploying SuiteScript of type: ${scriptType}`);
  // TODO: Add XML generation logic here
  // TODO: Integrate NetSuite deployment logic here
}

// CLI Definition
await new Command()
  .name("suitepush")
  .version("0.1.0")
  .description("NetSuite SuiteScript Deployer")
  .option("-t, --type [type:string]", "Type of SuiteScript to deploy (User Event, Scheduled, Map/Reduce)")
  .action(({ type }) => {
    validateSuiteConfig();
    if (!type) {
      console.error("Error: You must specify a SuiteScript type using the --type option.");
      Deno.exit(1);
    }
    handleDeployment(type);
  })
  .parse(Deno.args);
