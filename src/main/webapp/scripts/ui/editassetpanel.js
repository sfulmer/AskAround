//***************************************************************************************
//* EditAssetPanel
//***************************************************************************************
function EditAssetPanel(iAssetId)
{
	this.miAssetId										=	Common.defaultIfUndefined(iAssetId, 0);
	this.mbCentered										=	true;
	this.mFuncArrClosedListeners						=	[];
	this.mObjContainer 									=	undefined;
	this.mPnlEditAsset									=	undefined;
	this.miHeight										=	400;
	this.miLeft											=	0;
	this.mFuncArrOkListeners							=	[];
	this.mObjTableCell 									=	undefined;
	this.miTop											=	0;
	this.miWidth										=	400;
	this.miZIndex										=	100;
}

EditAssetPanel.prototype.addClosedListener					=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getClosedListeners().push(funcListener);
	
	return(this);
};

EditAssetPanel.prototype.addOkListener						=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getOkListeners().push(funcListener);
	
	return(this);
};

EditAssetPanel.prototype.center							=	function(bCenter)
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

EditAssetPanel.prototype.getAssetId						=	function()
{
	if(this.miAssetId == undefined)
		this.miAssetId = 0;
	
	return(this.miAssetId);
};

EditAssetPanel.prototype.getClosedListeners				=	function()
{
	if(this.mFuncArrClosedListeners == undefined)
		this.mFuncArrClosedListeners = [];
	
	return(this.mFuncArrClosedListeners);
};

EditAssetPanel.prototype.getContainer						=	function()
{
	if(this.mObjContainer == undefined)
		this.mObjContainer = new Panel();
	
	return(this.mObjContainer);
};

EditAssetPanel.prototype.getHeight							=	function()
{
	if(this.mPnlEditAsset == undefined)
		return(Common.defaultIfUndefined(this.miHeight, 0));
	else
		return(Common.defaultIfUndefined(this.miHeight, this.getPanel().css("height")));
};

EditAssetPanel.prototype.getLeft							=	function()
{
	if(this.mPnlEditAsset == undefined)
		return(Common.defaultIfUndefined(this.miLeft, 0));
	else if(this.isCentered())
		return(this.getPanel().css("left"));
	else
		return(Common.defaultIfUndefined(this.miLeft, this.getPanel().css("left")));
};

EditAssetPanel.prototype.getOkListeners					=	function()
{
	if(this.mFuncArrOkListeners == undefined)
		this.mFuncArrOkListeners = [];
	
	return(this.mFuncArrOkListeners);
};

EditAssetPanel.prototype.getPanel							=	function()
{
	if(this.mPnlEditAsset == undefined)
		{
		this.mPnlEditAsset = new Panel(	{	"class":			"noselect"	}
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
	
	return(this.mPnlEditAsset);
};

EditAssetPanel.prototype.getTableCell						=	function()
{
	if(this.mObjTableCell == undefined)
		this.mObjTableCell = new Panel	(	undefined
										,	{	"display":			"table-cell"
											,	"vertical-align":	"middle"
											})
								.append(this.getContainer());
	
	return(this.mObjTableCell);
};

EditAssetPanel.prototype.getTop							=	function()
{
	if(this.mPnlEditAsset == undefined)
		return(Common.defaultIfUndefined(this.miTop, 0));
	if(this.isCentered())
		return(this.getPanel().css("top"));
	else
		return(Common.defaultIfUndefined(this.miTop, this.getPanel().css("top")));
};

EditAssetPanel.prototype.getWidth							=	function()
{
	if(this.mPnlEditAsset == undefined)
		return(Common.defaultIfUndefined(this.miWidth, 0));
	else
		return(Common.defaultIfUndefined(this.miWidth, this.getPanel().css("width")));
};

EditAssetPanel.prototype.isCentered						=	function()
{
	return(this.mbCentered);
};

EditAssetPanel.prototype.iterateClosedListeners			=	function(objArgument)
{
	for(var iLength = this.getClosedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getClosedListeners()[iLoop].call(this, objArgument);
};

EditAssetPanel.prototype.iterateOkListeners				=	function(objArgument)
{
	for(var iLength = this.getOkListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getOkListeners()[iLoop].call(this, objArgument);
};

EditAssetPanel.prototype.loadContent						=	function(iAssetId)
{
	var this_ = this;
	
	this.getPanel().css("cursor", "wait");
	
	$.ajax(	{	async:		"false"
			,	data:		{	assetId:	(iAssetId == undefined) ? this.getAssetId() : iAssetId	}
			,	dataType:	"html"
			,	success:	function(html)
							{
								$(document).on	(	"load"
												, 	function(e, sType, editAssetController)
													{
														if(sType == "editasset")
															{
															this_.getPanel().css("cursor", "default");
															
															editAssetController
																.addOkListener(function()
																{
																	this_.iterateOkListeners();
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
			,	url:		"assets/asset/edit"
			});
};

EditAssetPanel.prototype.reset								=	function()
{
	this.getPanel().remove();
};

EditAssetPanel.prototype.setAssetId							=	function(iAssetId)
{
	if(iAssetId == undefined)
		this.miAssetId = 0;
	else
		this.miAssetId = iAssetId;
	
	return(this);
};

EditAssetPanel.prototype.setHeight							=	function(iHeight)
{
	this.miHeight										=	Common.defaultIfUndefined(iHeight, 0);
	
	this.getPanel().css("height", this.miHeight);
	
	return(this);
};

EditAssetPanel.prototype.setLeft							=	function(iLeft)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miLeft											=	Common.defaultIfUndefined(iLeft, 0);
	
	this.getPanel().css("left", this.miLeft);
	
	return(this);
};

EditAssetPanel.prototype.setTop							=	function(iTop)
{
	if(this.isCentered())
		this.mbCentered = false;
	
	this.miTop											=	Common.defaultIfUndefined(iTop, 0);
	
	this.getPanel().css("top", this.miTop);
	
	return(this);
};

EditAssetPanel.prototype.setWidth							=	function(iWidth)
{
	this.miWidth										=	Common.defaultIfUndefined(iWidth, 0);
	
	this.getPanel().css("width", this.miWidth);
	
	return(this);
};