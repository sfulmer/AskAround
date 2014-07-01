//***************************************************************************************
//* AssetPanel
//***************************************************************************************
function AssetPanel(iWidth, iHeight, iZIndex, iLeft, iTop, bCentered)
{
	this.mObjAppUser								=	new AppUser();
	this.mFuncArrCanceled							=	[];
	this.mbCentered									=	Common.defaultIfUndefined(bCentered, true);
	this.miHeight									=	Common.defaultIfUndefined(iHeight, 0);
	this.miLeft										=	Common.defaultIfUndefined(iLeft, 0);
	this.mFuncArrOk									=	[];
	this.miTop										=	Common.defaultIfUndefined(iTop, 0);
	this.miWidth									=	Common.defaultIfUndefined(iWidth, 0);
	
	this.mObjContainer 								=	undefined;
	this.mObjAssetPanel 							=	undefined;
	this.mObjTableCell 								=	undefined;
}

AssetPanel.prototype.addCancelClickedListener		=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getCancelClickedListeners().push(funcListener);
	
	return(this);
};

AssetPanel.prototype.addOkListener					=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getOkListeners().push(funcListener);
	
	return(this);
};

AssetPanel.prototype.center							=	function(bCenter)
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

AssetPanel.prototype.getCancelClickedListeners		=	function()
{
	if(this.mFuncArrCanceled == undefined)
		this.mFuncArrCanceled = [];
	
	return(this.mFuncArrAuthenticationListeners);
};

AssetPanel.prototype.getContainer					=	function()
{
	if(this.mObjContainer == undefined)
		this.mObjContainer = new Panel();
	
	return(this.mObjContainer);
};

AssetPanel.prototype.getHeight						=	function()
{
	if(this.mObjAssetPanel == undefined)
		return(Common.defaultIfUndefined(this.miHeight, 0));
	else
		return(Common.defaultIfUndefined(this.miHeight, thic.getPanel().css("height")));
};

AssetPanel.prototype.getLeft						=	function()
{
	if(this.mObjAssetPanel == undefined)
		return(Common.defaultIfUndefined(this.miLeft, 0));
	else if(this.isCentered())
		return(this.getPanel().css("left"));
	else
		return(Common.defaultIfUndefined(this.miLeft, this.getPanel().css("left")));
};

AssetPanel.prototype.getPanel						=	function()
{
	if(this.mObjAssetPanel == undefined)
		{
		this.mObjAssetPanel = new Panel(	{	"class":			"noselect"	}
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
	
	return(this.mObjAssetPanel);
};

AssetPanel.prototype.getSignupClickedListeners		=	function()
{
	if(this.mFuncArrSignupClickedListeners == undefined)
		this.mFuncArrSignupClickedListeners = [];
	
	return(this.mFuncArrSignupClickedListeners);
};

AssetPanel.prototype.getTableCell					=	function()
{
	if(this.mObjTableCell == undefined)
		this.mObjTableCell = new Panel	(	undefined
										,	{	"display":			"table-cell"
											,	"vertical-align":	"middle"
											})
								.append(this.getContainer());
	
	return(this.mObjTableCell);
};

AssetPanel.prototype.getTop							=	function()
{
	if(this.mObjAssetPanel == undefined)
		return(Common.defaultIfUndefined(this.miTop, 0));
	if(this.isCentered())
		return(this.getPanel().css("top"));
	else
		return(Common.defaultIfUndefined(this.miTop, this.getPanel().css("top")));
};

AssetPanel.prototype.getWidth						=	function()
{
	if(this.mObjAssetPanel == undefined)
		return(Common.defaultIfUndefined(this.miWidth, 0));
	else
		return(Common.defaultIfUndefined(this.miWidth, this.getPanel().css("width")));
};

AssetPanel.prototype.isCentered						=	function()
{
	return(this.mbCentered);
};

AssetPanel.prototype.iterateCancelClickedListeners	=	function(objArgument)
{
	for(var iLength = this.getCancelClickedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getCancelClickedListeners()[iLoop].call(this, objArgument);
};

AssetPanel.prototype.iterateOkClickedListeners		=	function(objArgument)
{
	for(var iLength = this.getOkClickedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getOkClickedListeners()[iLoop].call(this, objArgument);
};

AssetPanel.prototype.loadContent					=	function()
{
	var this_ = this;
	
	this.getPanel().css("cursor", "wait");
	
	$.ajax(	{	async:		"false"
			,	dataType:	"html"
			,	success:	function(html)
							{
								$(document).on	(	"load"
												, 	function(e, sType, assetController)
													{
														if(sType == "login")
															{
															this_.getPanel().css("cursor", "default");
															
															loginController
																.addOkClickedListener(function(objUser)
																{
																	
																})
																.addCancelClickedListener(function()
																{
																	this_.iterateCancelClickedListeners();
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

AssetPanel.prototype.removeAuthenticationListener	=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getAuthenticationListeners().push(funcListener);
};

AssetPanel.prototype.reset							=	function()
{
	this.getPanel().remove();
	
	this.mObjAssetPanel = undefined;
};

AssetPanel.prototype.setAppUser						=	function(objAppUser)
{
	this.mObjAppUser = Common.defaultIfUndefined(objAppUser, new AppUser());
	
	for(var listenerIter = 0, listenerLength = this.getAuthenticationListeners().length; listenerIter < listenerLength; listenerIter++)
		this.getAuthenticationListeners()[listenerIter].call(this, this.getAppUser());
};

AssetPanel.prototype.setHeight						=	function(iHeight)
{
	this.miHeight									=	Common.defaultIfUndefined(iHeight, 0);
	
	this.getPanel().css("height", this.miHeight);
};

AssetPanel.prototype.setLeft						=	function(iLeft)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miLeft										=	Common.defaultIfUndefined(iLeft, 0);
	
	this.getPanel().css("left", this.miLeft);
};

AssetPanel.prototype.setTop							=	function(iTop)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miTop										=	Common.defaultIfUndefined(iTop, 0);
	
	this.getPanel().css("top", this.miTop);
};

AssetPanel.prototype.setWidth						=	function(iWidth)
{
	this.miWidth									=	Common.defaultIfUndefined(iWidth, 0);
	
	this.getPanel().css("width", this.miWidth);
};