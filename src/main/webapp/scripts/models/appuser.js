//***************************************************************************************
//* AppUser
//***************************************************************************************

function AppUser(bAuthenticated, iAppUserId, sFirstName, sLastName, sUsername, sPasscode, dtSignUp)
{
	this.mbChanged			=	undefined;
	this.msFirstName 		= 	Common.defaultIfUndefined(sFirstName, "");
	this.miAppUserId		=	Common.defaultIfUndefined(iAppUserId, 0);
	this.msLastName 		= 	Common.defaultIfUndefined(sLastName, "");
	this.mObjLoginInfo		=	undefined;
	this.mArrObjObservers	=	[];
	this.mObjOffice			=	undefined;
	this.mDtSignUp 			=	dtSignUp;
}

AppUser.prototype.addObserver		=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 	=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

AppUser.copyFromJSON				=	function(objJSON, objAppUser)
{
	if(objAppUser == undefined)
		objAppUser = new AppUser();
	
	for(prop in objJSON)
		switch(prop)
			{
			case 'office':
				objAppUser.setOffice(Office.copyFromJSON(undefined, eval("objJSON." + prop), objAppUser.getOffice()));
				break;
			case 'loginInfo':
				objAppUser.setLoginInfo(LoginInfo.copyFromJSON(eval("objJSON." + prop), objAppUser.getLoginInfo()));
				break;
			default:
				objAppUser["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objAppUser, eval("objJSON." + prop));
			}
	
	return(objAppUser);
};

AppUser.prototype.getAppUserId		=	function()
{
	if(this.miAppUserId == undefined)
		this.miAppUserId = 0;
	
	return(this.miAppUserId);
};

AppUser.prototype.getFirstName		=	function()
{
	if(this.msFirstName == undefined)
		this.msFirstName = "";
	
	return(this.msFirstName);
};

AppUser.prototype.getLastName		=	function()
{
	if(this.msLastName == undefined)
		this.msLastName = "";
	
	return(this.msLastName);
};

AppUser.prototype.getLoginInfo		=	function()
{
	if(this.mObjLoginInfo == undefined)
		this.mObjLoginInfo = new LoginInfo();
	
	return(this.mObjLoginInfo);
};

AppUser.prototype.getOffice			=	function()
{
	if(this.mObjOffice == undefined)
		this.mObjOffice = new Office();
	
	return(this.mObjOffice);
};

AppUser.prototype.getSignupDate		=	function()
{
	return(this.mDtSignUp);
};

AppUser.prototype.hasChanged		=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

AppUser.prototype.notifyObservers	=	function(objArgument)
{
	this.mbChanged	=	true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged	=	false;
};

AppUser.prototype.packageToJSON		=	function()
{
	return(	{	appUserId:			this.getAppUserId()
			,	firstName:			this.getFirstName()
			,	lastName:			this.getLastName()
			,	loginInfo:			this.getLoginInfo().packageToJSON()
			,	office:				this.getOffice().packageToJSON()
			,	signupDate:			this.getSignupDate()
			});
};

AppUser.prototype.setAppUserId		=	function(iAppUserId)
{
	if(iAppUserId == undefined)
		this.miAppUserId			=	0;
	else
		this.miAppUserId			=	parseInt(iAppUserId);
	
	return(this);
};

AppUser.prototype.setFirstName		=	function(sFirstName)
{
	if(sFirstName == undefined)
		this.msFirstName			=	"";
	else
		this.msFirstName 			=	sFirstName;
	
	return(this);
};

AppUser.prototype.setLastName		=	function(sLastName)
{
	if(sLastName == undefined)
		this.msLastName				=	"";
	else
		this.msLastName 			=	sLastName;
	
	return(this);
};

AppUser.prototype.setLoginInfo		=	function(objLoginInfo)
{
	if(objLoginInfo == undefined)
		this.mObjLoginInfo 			=	new LoginInfo();
	else
		this.mObjLoginInfo			=	objLoginInfo;
	
	return(this);
};

AppUser.prototype.setOffice			=	function(objOffice)
{
	if(objOffice == undefined)
		this.mObjOffice				=	new Office();
	else
		this.mObjOffice 			=	objOffice;
	
	return(this);
};

AppUser.prototype.setSignupDate		=	function(dtSignUp)
{
	this.mDtSignUp 					=	dtSignUp;
	
	return(this);
};