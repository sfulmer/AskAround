//***************************************************************************************
//* LoginPanel
//***************************************************************************************
function LoginPanel(iWidth, iHeight, iZIndex, iLeft, iTop, bCentered)
{
	this.mObjAppUser								=	new AppUser();
	this.mFuncArrAuthentication						=	[];
	this.mbCentered									=	Common.defaultIfUndefined(bCentered, true);
	this.miHeight									=	Common.defaultIfUndefined(iHeight, 0);
	this.miLeft										=	Common.defaultIfUndefined(iLeft, 0);
	this.mFuncArrSignupClicked						=	[];
	this.miTop										=	Common.defaultIfUndefined(iTop, 0);
	this.miWidth									=	Common.defaultIfUndefined(iWidth, 0);
	
	this.mObjContainer 								=	undefined;
	this.mObjLoginPanel 							=	undefined;
	this.mObjTableCell 								=	undefined;
}

LoginPanel.prototype.addAuthenticationListener		=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getAuthenticationListeners().push(funcListener);
	
	return(this);
};

LoginPanel.prototype.addSignupClickedListener		=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getSignupClickedListeners().push(funcListener);
	
	return(this);
};

LoginPanel.prototype.center							=	function(bCenter)
{
	this.mbCentered = Common.defaultIfUndefined(bCenter, (Common.defaultIfUndefined(this.isCentered(), true)));
	
	if(this.isCentered())
		this.getPanel().css(	{	"left":	(($(window).width() - Common.extractDimensionFromString(this.getPanel().css("width"), "px", 0)) / 2) + "px"
								,	"top":	(($(window).height() - Common.extractDimensionFromString(this.getPanel().css("height"), "px", 0)) / 2) + "px"
								});
	else
		this.getPanel().css(	{	"left":	this.getLeft()	+	"px"
								,	"top":	this.getTop() 	+	"px"
								});
};

LoginPanel.prototype.getAppUser						=	function()
{
	return(this.mObjAppUser);
};

LoginPanel.prototype.getAuthenticationListeners		=	function()
{
	if(this.mFuncArrAuthenticationListeners == undefined)
		this.mFuncArrAuthenticationListeners = [];
	
	return(this.mFuncArrAuthenticationListeners);
};

LoginPanel.prototype.getContainer					=	function()
{
	if(this.mObjContainer == undefined)
		this.mObjContainer = new Panel();
	
	return(this.mObjContainer);
};

LoginPanel.prototype.getHeight						=	function()
{
	if(this.mObjLoginPanel == undefined)
		return(Common.defaultIfUndefined(this.miHeight, 0));
	else
		return(Common.defaultIfUndefined(this.miHeight, thic.getPanel().css("height")));
};

LoginPanel.prototype.getLeft						=	function()
{
	if(this.mObjLoginPanel == undefined)
		return(Common.defaultIfUndefined(this.miLeft, 0));
	else if(this.isCentered())
		return(this.getPanel().css("left"));
	else
		return(Common.defaultIfUndefined(this.miLeft, this.getPanel().css("left")));
};

LoginPanel.prototype.getPanel						=	function()
{
	if(this.mObjLoginPanel == undefined)
		{
		this.mObjLoginPanel = new Panel(	{	"class":			"noselect"	}
										,	{	"background-color":	"green"
											,	"color":			"white"
											,	"display":			"table"
											,	"font-weight":		"bold"
											,	"height":			Common.defaultIfUndefined(this.getHeight(), 0) + "px"
											,	"left":				Common.defaultIfUndefined(this.getLeft(), 0) + "px"
											,	"position":			"absolute"
											,	"text-align":		"center"
											,	"top":				Common.defaultIfUndefined(this.getTop(), 0) + "px"
											,	"width":			Common.defaultIfUndefined(this.getWidth(), 0) + "px"
											,	"z-index":			100
											})
								.append(this.getTableCell());
		
		this.center();
		this.loadContent();
		}
	
	return(this.mObjLoginPanel);
};

LoginPanel.prototype.getSignupClickedListeners		=	function()
{
	if(this.mFuncArrSignupClickedListeners == undefined)
		this.mFuncArrSignupClickedListeners = [];
	
	return(this.mFuncArrSignupClickedListeners);
};

LoginPanel.prototype.getTableCell					=	function()
{
	if(this.mObjTableCell == undefined)
		this.mObjTableCell = new Panel	(	undefined
										,	{	"display":			"table-cell"
											,	"vertical-align":	"middle"
											})
								.append(this.getContainer());
	
	return(this.mObjTableCell);
};

LoginPanel.prototype.getTop							=	function()
{
	if(this.mObjLoginPanel == undefined)
		return(Common.defaultIfUndefined(this.miTop, 0));
	if(this.isCentered())
		return(this.getPanel().css("top"));
	else
		return(Common.defaultIfUndefined(this.miTop, this.getPanel().css("top")));
};

LoginPanel.prototype.getWidth						=	function()
{
	if(this.mObjLoginPanel == undefined)
		return(Common.defaultIfUndefined(this.miWidth, 0));
	else
		return(Common.defaultIfUndefined(this.miWidth, this.getPanel().css("width")));
};

LoginPanel.prototype.isCentered						=	function()
{
	return(this.mbCentered);
};

LoginPanel.prototype.iterateAuthenticationListeners	=	function(objArgument)
{
	for(var iLength = this.getAuthenticationListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getAuthenticationListeners()[iLoop].call(this, objArgument);
};

LoginPanel.prototype.iterateSignupClickedListeners	=	function(objArgument)
{
	for(var iLength = this.getSignupClickedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getSignupClickedListeners()[iLoop].call(this, objArgument);
};

LoginPanel.prototype.loadContent					=	function()
{
	var this_ = this;
	
	this.getPanel().css("cursor", "wait");
	
	$.ajax(	{	async:		"false"
			,	dataType:	"html"
			,	success:	function(html)
							{
								$(document).on	(	"load"
												, 	function(e, sType, loginController)
													{
														if(sType == "login")
															{
															this_.getPanel().css("cursor", "default");
															
															loginController
																.addAuthenticatedListener(function(objUser)
																{
																	this_.setAppUser(objUser);
																	
																	this_.getPanel().remove();
																})
																.addSignupClickedListener(function()
																{
																	this_.iterateSignupClickedListeners();
																})
																.initFocus();
															}
													});
								
								this_.getContainer().html(html);
							}
			,	type:		"get"
			,	url:		"api/log/in"
			});
};

LoginPanel.prototype.removeAuthenticationListener	=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getAuthenticationListeners().push(funcListener);
};

LoginPanel.prototype.reset							=	function()
{
	this.getPanel().remove();
	
	this.mObjLoginPanel = undefined;
};

LoginPanel.prototype.setAppUser						=	function(objAppUser)
{
	this.mObjAppUser = Common.defaultIfUndefined(objAppUser, new AppUser());
	
	for(var listenerIter = 0, listenerLength = this.getAuthenticationListeners().length; listenerIter < listenerLength; listenerIter++)
		this.getAuthenticationListeners()[listenerIter].call(this, this.getAppUser());
};

LoginPanel.prototype.setHeight						=	function(iHeight)
{
	this.miHeight									=	Common.defaultIfUndefined(iHeight, 0);
	
	this.getPanel().css("height", this.miHeight);
};

LoginPanel.prototype.setLeft						=	function(iLeft)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miLeft										=	Common.defaultIfUndefined(iLeft, 0);
	
	this.getPanel().css("left", this.miLeft);
};

LoginPanel.prototype.setTop							=	function(iTop)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miTop										=	Common.defaultIfUndefined(iTop, 0);
	
	this.getPanel().css("top", this.miTop);
};

LoginPanel.prototype.setWidth						=	function(iWidth)
{
	this.miWidth									=	Common.defaultIfUndefined(iWidth, 0);
	
	this.getPanel().css("width", this.miWidth);
};