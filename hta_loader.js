// $Id: 
/************************************************************************
* Loader for HTA Plugin - Javascript file
*
* This script includes and executes all other scripts
* 
* Design goal is to keep ALL javascript, css, and html code
* Seperate
*
* Copyright 2010-2014 Columbia Data Products, Inc. All Rights Reserved.
*************************************************************************/
//SCRIPTS and CSS Files to Load on INITIALIZATION
loader = new loader();

// JQUERY Dependencies
loader.include_script('jquery/jquery-vs.js');
loader.include_script('jquery/jquery-ui-vs.js');
loader.include_script('jquery/jquery.contextMenu.custom.js');
loader.include_script('jquery/jquery.sha1.js');
loader.include_script('jquery/themeswitchertool.custom.js');
loader.include_script('jquery/DD_roundies.uicornerfix.js');
loader.include_script('jquery.spinbox.js');

// Our JQUERY Plugins
loader.include_script('jquery.hta.js');
loader.include_script('jquery.hta.alert.js');
//loader.include_script('jquery.hta.config.js');
loader.include_script('oom.js');
loader.include_script('jquery.hta.pref.js');
loader.include_script('jquery.hta.update.js');
loader.include_script('jquery.log.js');
loader.include_script('jquery.storage.js');

// CSS Dependencies
loader.include_css('hta.css');
loader.include_css('jquery.spinbox.css');
loader.include_css('', 'all', 'theme'); // theme

/**
* Loader class
*/

function loader() {

	/**
	* this function includes js files for the application
	*/
	this.include_script = function(file, defer)
		{
		  var script  = document.createElement('script');
		  script.src  = file;
		  script.type = 'text/javascript';
		  script.defer = defer;
		  script.charset = 'UTF-8';

		  document.getElementsByTagName('head').item(0).appendChild(script);
		}

	/**
	* this function includes css files for the application
	*/
	this.include_css = function(file, media, id)
	{
	  var css  = document.createElement('link');
	  css.href  = file;
	  css.type = 'text/css';
	  css.rel = 'stylesheet';
	  css.media = media ? media : 'all';
	  css.charset = 'UTF-8';
	  id ? css.id = id : 1;

	  document.getElementsByTagName('head').item(0).appendChild(css);
	}
}
