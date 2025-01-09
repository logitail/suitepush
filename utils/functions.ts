// Function to check SDF folder structure

import { existsSync } from "@std/fs";
///

export function checkSdfFolderStructure() {
  const suiteConfigPath = `${Deno.cwd()}/suitecloud.config.js`;
  if (!existsSync(suiteConfigPath)) {
    console.warn(
      `Warning: The current directory (${Deno.cwd()}) does not appear to be an SDF folder structure. Some operations may not work as expected.`,
    );
    Deno.exit(1);
  }
  // else {
  //   console.log(`SDF folder structure detected at: ${suiteConfigPath}`);
  // }
}
