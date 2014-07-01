function Module(iId, sName, sDescription, sURL, bActive)
{
	this.mbActive					=	Common.defaultIfUndefined(bActive, false);
	this.msDescription				=	Common.defaultIfUndefined(sDescription, "");
	this.miId						=	Common.defaultIfUndefined(iId, 0);
	this.msName						=	Common.defaultIfUndefined(sName, "");
	this.msURL						=	Common.defaultIfUndefined(sURL, "");
};

Module.copyFromJSON					=	function(objJSON, objModule)
{
	if(objModule == undefined)
		objModule = new Module();
	
	for(prop in objJSON)
		objModule["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objModule, eval("objJSON." + prop));
	
	return(objModule);
};

Module.prototype.getDescription		=	function()
{
	if(this.msDescription == undefined)
		this.msDescription = "";
	
	return(this.msDescription);
};

Module.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

Module.prototype.getName			=	function()
{
	if(this.msName == undefined)
		this.msName = "";
	
	return(this.msName);
};

Module.prototype.getURL				=	function()
{
	if(this.msURL == undefined)
		this.msURL = "";
	
	return(this.msURL);
};

Module.prototype.isActive			=	function()
{
	if(this.mbActive == undefined)
		this.mbActive = false;
	
	return(this.mbActive);
};

Module.prototype.setActive			=	function(bActive)
{
	if(bActive == undefined)
		this.mbActive = false;
	else
		this.mbActive = bActive;
	
	return(this);
};

Module.prototype.setDescription		=	function(sDescription)
{
	if(sDescription == undefined)
		this.msDescription = "";
	else
		this.msDescription = sDescription;
	
	return(this);
};

Module.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId = 0;
	else
		this.miId = iId;
	
	return(this);
};

Module.prototype.setName			=	function(sName)
{
	if(sName == undefined)
		this.msName = "";
	else
		this.msName = sName;
	
	return(this);
};

Module.prototype.setURL				=	function(sURL)
{
	if(sURL == undefined)
		this.msURL = "";
	else
		this.msURL = sURL;
	
	return(this);
};