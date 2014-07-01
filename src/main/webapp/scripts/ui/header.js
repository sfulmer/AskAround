//***************************************************************************************
//* Header
//***************************************************************************************			
function Header(objAppUser)
{
	this.mObjAppUser				=	undefined;
	this.mObjGreeting 				=	undefined;
	this.mObjHeader					=	undefined;
	this.mObjLogoutLink				=	undefined;
	this.mObjPosterName				=	undefined;
	this.mFuncArrUserListeners		=	undefined;
	
	this.setAppUser(Common.defaultIfUndefined(objAppUser, new AppUser()));
}

Header.prototype.addUserListener	=	function(funcListener)
{
	if(funcListener != undefined)
		this.getUserListeners().push(funcListener);
};

Header.prototype.getAppUser			=	function()
{
	if(this.mObjAppUser == undefined)
		this.mObjAppUser = new AppUser();
	
	return(this.mObjAppUser);
};

Header.prototype.getGreeting		=	function()
{
	if(this.mObjGreeting == undefined)
		this.mObjGreeting = new Panel(		{	id:				"divGreeting"	}
										,	{	color:			"white"
											,	left:			"-10px"
											,	position:		"relative"
											,	"text-align":	"right"
											})
								.html("Welcome ")
								.append(this.getPosterName());
	
	return(this.mObjGreeting);
};

Header.prototype.getHeader			=	function()
{
	if(this.mObjHeader == undefined)
		this.mObjHeader = new Panel(		{	id:						"divHeader"	}
										,	{	"background-color":		"#0000FF"
											,	height:					($(window).height() / 10) + "px"
											,	left:					"0px"
											,	position:				"absolute"
											,	top:					"0px"
											,	width:					$(window).width() + "px"
											})
								.append(this.getGreeting())
								.append(this.getLogoutLink());
	
	return(this.mObjHeader);
};

Header.prototype.getLogoutLink		=	function()
{
	if(this.mObjLogoutLink == undefined)
		{
		var this_ = this;
		
		this.mObjLogoutLink	=	new Panel(		{	id:				"divLogout"	}
											,	{	color:			"white"
												,	cursor:			"pointer"
												,	position:		"relative"
												,	"text-align":	"right"
												,	width:			"Log out".length * 8
												,	visibility:		"hidden"
												,	"z-index":		75
												})
									.click(function()
									{
										$.ajax(	{	dataType:	"json"
												,	success:	function(data)
													{
														this_.setAppUser(Common.defaultIfUndefined(null, new AppUser()));
													}
												,	type:		"post"
												,	url:		"api/log/out"
												});
									})
									.html("Log out");
		
		this.mObjLogoutLink.css("left", ($(window).width() - this.mObjLogoutLink.width() - 10) + "px");
		
		if(this.getAppUser().getLoginInfo().isAuthenticated())
			this.mObjLogoutLink.css("visibility", "visible");
		else
			this.mObjLogoutLink.css("visibility", "hidden");
		}
	
	return(this.mObjLogoutLink);
};

Header.prototype.getPosterName		=	function()
{
	if(this.mObjPosterName == undefined)
		this.mObjPosterName = new Static({id:	"divPosterName"	}).html(" " + this.getAppUser().getFirstName());
	
	return(this.mObjPosterName);
};

Header.prototype.getUserListeners	=	function()
{
	if(this.mFuncArrUserListeners == undefined)
		this.mFuncArrUserListeners = [];
	
	return(this.mFuncArrUserListeners);
};

Header.prototype.hideLogoutLink		=	function()
{
	this.getLogoutLink().css("visibility", "hidden");
};

Header.prototype.removeUserListener	=	function(funcListener)
{
	if(funcListener != undefined)
		this.getUserListeners().remove(funcListener);
};

Header.prototype.setAppUser			=	function(objAppUser)
{
	this.mObjAppUser = Common.defaultIfUndefined(objAppUser, new AppUser());
	
	this.setPosterName(this.getAppUser().getFirstName());
	
	if(this.mObjAppUser.getLoginInfo().isAuthenticated())
		this.showLogoutLink();
	else
		this.hideLogoutLink();
	
	for(var iLoop = 0, iLength = this.getUserListeners().length; iLoop < iLength; iLoop++)
		this.getUserListeners()[iLoop].call(this, objAppUser);
};

Header.prototype.setPosterName		=	function(sName)
{
	this.getPosterName().html(" " + Common.defaultIfUndefined(sName, ""));
};

Header.prototype.showLogoutLink		=	function()
{
	this.getLogoutLink().css("visibility", "visible");
};