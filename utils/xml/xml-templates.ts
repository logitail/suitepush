// xml-templates.ts

type ScriptStatus = "TESTING" | "RELEASED";

export function cs(
  scriptName: string,
  scriptDesc: string | null,
  fileName: string,
  filePath: string,
  deployName: string,
  recType: string,
  scriptStatus: string,
): string {
  return `<clientscript scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>F</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
      <allemployees>F</allemployees>
      <alllocalizationcontexts>T</alllocalizationcontexts>
      <allpartners>F</allpartners>
      <allroles>T</allroles>
      <audslctrole></audslctrole>
      <eventtype></eventtype>
      <executioncontext>ACTION|CLIENT|SCHEDULED|USERINTERFACE|WORKFLOW</executioncontext>
      <isdeployed>T</isdeployed>
      <loglevel>ERROR</loglevel>
      <recordtype>${recType}</recordtype>
      <status>${scriptStatus}</status>
    </scriptdeployment>
  </scriptdeployments>
</clientscript>`;
}

export function mr(
  scriptName: string,
  scriptDesc: string | null,
  fileName: string,
  filePath: string,
  deployName: string,
  dateToday: string,
): string {
  return `<mapreducescript scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>T</notifyowner>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
      <buffersize>1</buffersize>
      <concurrencylimit>1</concurrencylimit>
      <isdeployed>T</isdeployed>
      <loglevel>DEBUG</loglevel>
      <queueallstagesatonce>T</queueallstagesatonce>
      <runasrole>ADMINISTRATOR</runasrole>
      <status>NOTSCHEDULED</status>
      <title>${fileName}</title>
      <yieldaftermins>60</yieldaftermins>
      <recurrence>
        <single>
          <startdate>${dateToday}</startdate>
          <starttime>17:00:00Z</starttime>
        </single>
      </recurrence>
    </scriptdeployment>
  </scriptdeployments>
</mapreducescript>`;
}

export function ue(
  scriptName: string,
  scriptDesc: string | null,
  fileName: string,
  filePath: string,
  deployName: string,
  recType: string,
  scriptStatus: ScriptStatus,
): string {
  return `<usereventscript scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>F</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
      <allemployees>F</allemployees>
      <alllocalizationcontexts>T</alllocalizationcontexts>
      <allpartners>F</allpartners>
      <allroles>T</allroles>
      <audslctrole></audslctrole>
      <eventtype></eventtype>
      <executioncontext>USEREVENT</executioncontext>
      <isdeployed>T</isdeployed>
      <loglevel>DEBUG</loglevel>
      <recordtype>${recType}</recordtype>
      <runasrole>ADMINISTRATOR</runasrole>
      <status>${scriptStatus}</status>
    </scriptdeployment>
  </scriptdeployments>
</usereventscript>`;
}

export function rl(
  scriptName: string,
  scriptDesc: string | null,
  fileName: string,
  filePath: string,
  deployName: string,
  scriptStatus: string,
): string {
  return `<restlet scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>T</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
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
}

export function sl(
  scriptName: string,
  scriptDesc: string | null,
  fileName: string,
  filePath: string,
  deployName: string,
  scriptStatus: string,
): string {
  return `<suitelet scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>T</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
      <allemployees>F</allemployees>
      <allpartners>F</allpartners>
      <allroles>F</allroles>
      <audslctrole></audslctrole>
      <eventtype></eventtype>
      <isdeployed>T</isdeployed>
      <isonline>F</isonline>
      <loglevel>DEBUG</loglevel>
      <runasrole></runasrole>
      <status>${scriptStatus}</status>
      <title>${fileName}</title>
    </scriptdeployment>
  </scriptdeployments>
</suitelet>`;
}

export function ss(
  scriptName: string,
  scriptDesc: string | null,
  fileName: string,
  filePath: string,
  deployName: string,
  scriptStatus: string,
): string {
  return `<scheduledscript scriptid="customscript_${scriptName}">
  <description>${scriptDesc || ""}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>F</notifyowner>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
      <allroles>T</allroles>
      <isdeployed>T</isdeployed>
      <loglevel>DEBUG</loglevel>
      <status>${scriptStatus}</status>
      <executioncontext>SCHEDULED</executioncontext>
    </scriptdeployment>
  </scriptdeployments>
</scheduledscript>`;
}
