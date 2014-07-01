function LoginInfo(iId, sUserName, sPasscode)
{
	this.mbAuthenticated				=	false;
	this.mbChanged						=	false;
	this.miLoginInfoId					=	Common.defaultIfUndefined(iId, 0);
	this.mArrObjObservers				=	[];
	this.msPasscode 					=	Common.defaultIfUndefined(sPasscode, "");
	this.msUsername 					=	Common.defaultIfUndefined(sUserName, "");
}

LoginInfo.prototype.addObserver			=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 		=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

LoginInfo.copyFromJSON				=	function(objJSON, objLoginInfo)
{
	if(objLoginInfo == undefined)
		objLoginInfo = new LoginInfo();
	
	for(prop in objJSON)
		objLoginInfo["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objLoginInfo, eval("objJSON." + prop));
	
	return(objLoginInfo);
};

LoginInfo.prototype.getId				=	function()
{
	if(this.miLoginInfoId == undefined)
		this.miLoginInfoId = 0;
	
	return(this.miLoginInfoId);
};

LoginInfo.prototype.getPasscode			=	function()
{
	if(this.msPasscode == undefined)
		this.msPasscode = "";
	
	return(this.msPasscode);
};

LoginInfo.prototype.getUsername			=	function()
{
	if(this.msUsername == undefined)
		this.msUsername = "";
	
	return(this.msUsername);
};

LoginInfo.prototype.hasChanged			=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

LoginInfo.prototype.isAuthenticated		=	function()
{
	if(this.mbAuthenticated == undefined)
		this.mbAuthenticated = false;
	
	return(this.mbAuthenticated);
};

LoginInfo.prototype.notifyObservers		=	function(objArgument)
{
	this.mbChanged	=	true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged	=	false;
};

LoginInfo.prototype.packageToJSON		=	function()
{
	return(	{	id:				this.getId()
			,	userName:		this.getUsername()
			,	passcode:		this.getPasscode()
			,	authenticated:	this.isAuthenticated()
			});
};

LoginInfo.prototype.setId				=	function(iLoginInfoId)
{
	if(iLoginInfoId == undefined)
		this.miLoginInfoId				=	0;
	else
		this.miLoginInfoId				=	parseInt(iLoginInfoId);
	
	return(this);
};

LoginInfo.prototype.setAuthenticated	=	function(bAuthenticated)
{
	if(bAuthenticated == undefined)
		this.mbAuthenticated			=	false;
	else
		this.mbAuthenticated			=	bAuthenticated;
	
	return(this);
};

LoginInfo.prototype.setPasscode			=	function(sPasscode)
{
	if(sPasscode == undefined)
		this.msPasscode					=	"";
	else
		this.msPasscode 				=	sPasscode;
	
	return(this);
};

LoginInfo.prototype.setUsername			=	function(sUsername)
{
	if(sUsername == undefined)
		this.msUsername 				=	"";
	else
		this.msUsername 				=	sUsername;
	
	return(this);
};