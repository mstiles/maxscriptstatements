// JavaScript Document resetmessages.js
//Set HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Styles\MaxScriptStatements -1
var sregkey = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Styles\\MaxScriptStatements";
var success = false;
var alreadyset = false;
var returnvalue = fnRegExists(sregkey);
if (returnvalue)
{
   success = fnDeleteReg(sregkey);
}
else
{
   alreadyset = true;
}
var wsh = new ActiveXObject("WScript.Shell");
if (alreadyset)
{
   wsh.popup( "Script slowing down your browser message prompts already set to appear!", 5, "Reset to Default" );
}
else
{
   if (success)
   {
      wsh.popup( "Script slowing down your browser message prompts will now appear!", 5, "Reset to Default" );
   }
   else
   {
      wsh.popup( "Could NOT change registry setting!", 5, "Attempt Failed" );
   }
}
wsh = null;

// fnWriteReg(regkey, regvalue, regtype) returns true/false for success/failure
// Example: fnWriteReg("HKLM\\Software\\Myentry\\myname", "myvalue", "REG_SZ");
// regtype: "REG_SZ", "REG_EXPAND_SZ", "REG_DWORD", "REG_BINARY"
function fnWriteReg(regkey, regvalue, regtype)
{
   //WshShell.RegWrite ("HKLM\\Software\\Myentry\\myname", "myvalue", "REG_SZ");
   var success = true;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      regvalue = WshShell.ExpandEnvironmentStrings(regvalue);
      WshShell.RegWrite(regkey, regvalue, regtype);
   }
   catch (fWR)
   {
      success = false;
      WScript.Echo(fWR.message);
   }
   finally
   {
      WshShell = null;
   }
   
   return success;
}

function fnDeleteReg(regkey)
{
   var success = true;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      //var WshShell = WScript.CreateObject ("WScript.Shell");
      regvalue = WshShell.RegDelete(regkey);
   }
   catch (fDR)
   {
      success = false;
      //WScript.Echo(fDR.message);
   }
   finally
   {
      WshShell = null;
   }
   
   return success;
}

function fnRegExists(regkey)
{
   var retval = false;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      WshShell.RegRead(regkey);
      retval = true;
   }
   catch (fRR)
   {
      retval = false;
      //alert(fRR.message);
      //null value returned in regvalue variable indicates that reg value was not read
   }
   finally
   {
      //destroy object
      WshShell = null;
   }

   return retval;
}

