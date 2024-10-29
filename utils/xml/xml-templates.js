function cs(
  scriptName,
  scriptDesc,
  fileName,
  filePath,
  deployName,
  recType,
  scriptStatus
) {
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
      <executioncontext>ACTION|ADVANCEDREVREC|BANKCONNECTIVITY|BANKSTATEMENTPARSER|BUNDLEINSTALLATION|CLIENT|CONSOLRATEADJUSTOR|CSVIMPORT|CUSTOMGLLINES|CUSTOMMASSUPDATE|DATASETBUILDER|DEBUGGER|EMAILCAPTURE|FICONNECTIVITY|FIPARSER|MAPREDUCE|OTHER|PAYMENTGATEWAY|PAYMENTPOSTBACK|PLATFORMEXTENSION|PORTLET|PROMOTIONS|RECORDACTION|RESTLET|RESTWEBSERVICES|SCHEDULED|SDFINSTALLATION|SHIPPINGPARTNERS|SUITELET|TAXCALCULATION|USEREVENT|USERINTERFACE|WEBSERVICES|WORKBOOKBUILDER|WORKFLOW</executioncontext>
      <isdeployed>T</isdeployed>
      <loglevel>ERROR</loglevel>
      <recordtype>${recType}</recordtype>
      <status>${scriptStatus}</status>
    </scriptdeployment>
  </scriptdeployments>
</clientscript>`;
}

function mr(scriptName, scriptDesc, fileName, filePath, deployName, dateToday) {
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
          <repeat></repeat>
          <startdate>${dateToday}</startdate>
          <startdate>yyyy-mm-dd</startdate>
          <starttime>17:00:00Z</starttime>
        </single>
      </recurrence>
    </scriptdeployment>
  </scriptdeployments>
</mapreducescript>`;
}
function ue(
  scriptName,
  scriptDesc,
  fileName,
  filePath,
  deployName,
  recType,
  scriptStatus
) {
  return `<usereventscript scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>F</notifyowner>
  <notifyuser>F</notifyuser>cust
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy_${deployName}">
      <allemployees>F</allemployees>
      <alllocalizationcontexts>T</alllocalizationcontexts>
      <allpartners>F</allpartners>
      <allroles>T</allroles>
      <audslctrole></audslctrole>
      <eventtype></eventtype>
      <executioncontext>ACTION|ADVANCEDREVREC|BANKCONNECTIVITY|BANKSTATEMENTPARSER|BUNDLEINSTALLATION|CLIENT|CONSOLRATEADJUSTOR|CSVIMPORT|CUSTOMGLLINES|CUSTOMMASSUPDATE|DATASETBUILDER|DEBUGGER|EMAILCAPTURE|FICONNECTIVITY|FIPARSER|MAPREDUCE|OCRPLUGIN|OTHER|PAYMENTGATEWAY|PAYMENTPOSTBACK|PLATFORMEXTENSION|PORTLET|PROMOTIONS|RECORDACTION|RESTLET|RESTWEBSERVICES|SCHEDULED|SDFINSTALLATION|SHIPPINGPARTNERS|SUITELET|TAXCALCULATION|USEREVENT|USERINTERFACE|WEBSERVICES|WORKBOOKBUILDER|WORKFLOW</executioncontext>
      <isdeployed>T</isdeployed>
      <loglevel>DEBUG</loglevel>
      <recordtype>${recType}</recordtype>
      <runasrole>ADMINISTRATOR</runasrole>
      <status>${scriptStatus}</status>
    </scriptdeployment>
  </scriptdeployments>
</usereventscript>`;
}
function rl(
  scriptName,
  scriptDesc,
  fileName,
  filePath,
  deployName,
  scriptStatus
) {
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
function sl(
  scriptName,
  scriptDesc,
  fileName,
  filePath,
  deployName,
  scriptStatus
) {
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

module.exports = {
  cs,
  mr,
  ue,
  rl,
  sl
};
