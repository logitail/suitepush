const rl = `<restlet scriptid="customscript${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>T</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy${deployName}">
      <allemployees>F</allemployees>
      <allpartners>F</allpartners>
      <allroles>F</allroles>
      <audslctrole></audslctrole>
      <isdeployed>T</isdeployed>
      <loglevel>DEBUG</loglevel>
      <status>${scriptStatus}</status>
      <title>${fileName}</title>
    </scriptdeployment>
  </scriptdeployments>
</restlet>`;