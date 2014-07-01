//***************************************************************************************
//* SignupPanel
//***************************************************************************************
function SignupPanel(iWidth, iHeight, iZIndex, iLeft, iTop, bCentered)
{
	this.mObjAppUser									=	new AppUser();
	
	this.mbCentered										=	Common.defaultIfUndefined(bCentered, true);
	this.mObjContainer 									=	undefined;
	this.miHeight										=	Common.defaultIfUndefined(iHeight, 0);
	this.miLeft											=	Common.defaultIfUndefined(iLeft, 0);
	this.mObjSignupPanel 								=	undefined;
	this.mObjTableCell 									=	undefined;
	this.miTop											=	Common.defaultIfUndefined(iTop, 0);
	this.mFuncArrClosedListeners						=	[];
	this.miWidth										=	Common.defaultIfUndefined(iWidth, 0);
}

SignupPanel.prototype.addClosedListener					=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getClosedListeners().push(funcListener);
	
	return(this);
};

SignupPanel.prototype.center							=	function(bCenter)
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

SignupPanel.prototype.getAppUser						=	function()
{
	return(this.mObjAppUser);
};

SignupPanel.prototype.getClosedListeners				=	function()
{
	if(this.mFuncArrClosedListeners == undefined)
		this.mFuncArrClosedListeners = [];
	
	return(this.mFuncArrClosedListeners);
};

SignupPanel.prototype.getContainer						=	function()
{
	if(this.mObjContainer == undefined)
		this.mObjContainer = new Panel();
	
	return(this.mObjContainer);
};

SignupPanel.prototype.getHeight							=	function()
{
	if(this.mObjSignupPanel == undefined)
		return(Common.defaultIfUndefined(this.miHeight, 0));
	else
		return(Common.defaultIfUndefined(this.miHeight, thic.getPanel().css("height")));
};

SignupPanel.prototype.getLeft							=	function()
{
	if(this.mObjSignupPanel == undefined)
		return(Common.defaultIfUndefined(this.miLeft, 0));
	else if(this.isCentered())
		return(this.getPanel().css("left"));
	else
		return(Common.defaultIfUndefined(this.miLeft, this.getPanel().css("left")));
};

SignupPanel.prototype.getPanel							=	function()
{
	if(this.mObjSignupPanel == undefined)
		{
		this.mObjSignupPanel = new Panel(	{	"class":			"noselect"	}
										,	{	"background-color":	"#ABABAB"
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
	
	return(this.mObjSignupPanel);
};

SignupPanel.prototype.getTableCell						=	function()
{
	if(this.mObjTableCell == undefined)
		this.mObjTableCell = new Panel	(	undefined
										,	{	"display":			"table-cell"
											,	"vertical-align":	"middle"
											})
								.append(this.getContainer());
	
	return(this.mObjTableCell);
};

SignupPanel.prototype.getTop							=	function()
{
	if(this.mObjSignupPanel == undefined)
		return(Common.defaultIfUndefined(this.miTop, 0));
	if(this.isCentered())
		return(this.getPanel().css("top"));
	else
		return(Common.defaultIfUndefined(this.miTop, this.getPanel().css("top")));
};

SignupPanel.prototype.getWidth							=	function()
{
	if(this.mObjSignupPanel == undefined)
		return(Common.defaultIfUndefined(this.miWidth, 0));
	else
		return(Common.defaultIfUndefined(this.miWidth, this.getPanel().css("width")));
};

SignupPanel.prototype.isCentered						=	function()
{
	return(this.mbCentered);
};

SignupPanel.prototype.iterateClosedListeners			=	function(objArgument)
{
	for(var iLength = this.getClosedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getClosedListeners()[iLoop].call(this, objArgument);
};

SignupPanel.prototype.loadContent						=	function()
{
	var this_ = this;
	
	this.getPanel().css("cursor", "wait");
	
	$.ajax(	{	async:		"false"
			,	dataType:	"html"
			,	success:	function(html)
							{
								$(document).on	(	"load"
												, 	function(e, sType, signupController)
													{
														if(sType == "signup")
															{
															this_.getPanel().css("cursor", "default");
															
															signupController
																.addUserAddedListener(function(objUser)
																{
																	alert(objUser.appuserid);
																	
																	//Do stuff!
																	
																	this_.getPanel().remove();
																	
																	this_.iterateClosedListeners();
																})
																.addCancelledListener(function()
																{
																	this_.iterateClosedListeners();
																});
															}
													});
								
								this_.getContainer().html(html);
								
								Common.loadCSSFromExternalContent(this_.getContainer().html());
							}
			,	type:		"get"
			,	url:		"api/signup"
			});
};

SignupPanel.prototype.reset								=	function()
{
	this.getPanel().remove();
	
	this.mObjSignupPanel = undefined;
};

SignupPanel.prototype.setAppUser						=	function(objAppUser)
{
	this.mObjAppUser = Common.defaultIfUndefined(objAppUser, new AppUser());
};

SignupPanel.prototype.setHeight							=	function(iHeight)
{
	this.miHeight										=	Common.defaultIfUndefined(iHeight, 0);
	
	this.getPanel().css("height", this.miHeight);
};

SignupPanel.prototype.setLeft							=	function(iLeft)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miLeft											=	Common.defaultIfUndefined(iLeft, 0);
	
	this.getPanel().css("left", this.miLeft);
};

SignupPanel.prototype.setTop							=	function(iTop)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miTop											=	Common.defaultIfUndefined(iTop, 0);
	
	this.getPanel().css("top", this.miTop);
};

SignupPanel.prototype.setWidth							=	function(iWidth)
{
	this.miWidth										=	Common.defaultIfUndefined(iWidth, 0);
	
	this.getPanel().css("width", this.miWidth);
};