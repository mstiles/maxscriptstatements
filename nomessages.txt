// JavaScript Document nomessages.js
//Set HKEY_CURRENT_USER\Software\Microsoft\Internet Explorer\Styles\MaxScriptStatements -1
var wsh = new ActiveXObject("WScript.Shell");

var sregkey = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Styles\\MaxScriptStatements";
var lregexists = fnRegExists(sregkey);
if (lregexists)
{
   var regvalueread = fnReadReg(sregkey);
   if (regvalueread == -1)
   {
      wsh.popup( "Script slowing down your browser message prompts are already hidden!", 5, "Value Read" );
   }
}
else
{
   var success = fnWriteReg(sregkey, -1, "REG_DWORD");
   if (success)
   {
      wsh.popup( "Script slowing down your browser message prompts have been eliminated!", 5, "Registry Changed" );
   }
   else
   {
      wsh.popup( "Could NOT change the value!", 5, "Registry NOT Changed" );
   }

}

wsh = null;

function fnReadReg(regkey)
{
   var regvalue = null;
   try
   {
      var WshShell = new ActiveXObject("WScript.Shell");
      regvalue = WshShell.RegRead(regkey);
   }
   catch (fRR)
   {
      regvalue = null;
      //alert(fRR.message);
      //null value returned in regvalue variable indicates that reg value was not read
   }
   finally
   {
      //destroy object
      WshShell = null;
   }

   return regvalue;
}

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

