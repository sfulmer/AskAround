//***************************************************************************************
//* Panel
//***************************************************************************************
function Panel(attrMap, cssMap)
{
	this.mObjPanel			=	new Tag("div", false, attrMap, cssMap);
	
	return(this.mObjPanel);
}

Panel.prototype.attr			=	function(key, value)
{
	if(value == undefined)
		if(typeof(key) == "string")
			return(this.getPanel().attr(key));
		else
			this.getPanel().attr(key);
	else
		this.getPanel().attr(key, value);
};

Panel.prototype.center			=	function()
{
	this.setLeft(($(window).width() - this.getWidth()) / 2);
	this.setTop(($(window).height() - this.getHeight()) / 2);
};

Panel.prototype.css			=	function(key, value)
{
	if(value == undefined)
		if(typeof(key) == "string")
			return(this.getPanel().css(key));
		else
			this.getPanel().css(key);
	else
		this.getPanel().css(key, value);
};

Panel.prototype.getHeight			=	function()
{
	var sHeight = this.css("height");
	
	return(Common.extractDimensionFromString(sHeight, sHeight.substring(sHeight.length - 2), 0));
};

Panel.prototype.getLeft				=	function()
{
	var sLeft		=	this.css("left");
	
	return(Common.extractDimensionFromString(sLeft, sLeft.substring(sLeft.length - 2), 0));
};

Panel.prototype.getPanel			=	function()
{
	return(this.mObjPanel);
};

Panel.prototype.getTop 				= 	function()
{
	var sTop						=	this.css("top");
	
	return(Common.extractDimensionFromString(sTop, sTop.substring(sTop.length - 2), 0));
};

Panel.prototype.getWidth 			= 	function()
{
	var sWidth						=	this.css("width");
	
	return(Common.extractDimensionFromString(sWidth, sWidth.substring(sWidth.length - 2), 0));
};

Panel.prototype.setHeight			=	function(iHeight)
{
	this.css("height", Common.defaultIfUndefined(iHeight, 0));
};

Panel.prototype.setLeft				=	function(iLeft)
{
	this.css("left", Common.defaultIfUndefined(iLeft, 0));
};

Panel.prototype.setTop 				= 	function(iTop)
{
	this.miTop						=	Common.defaultIfUndefined(iTop, 0);
};

Panel.prototype.setWidth 			= 	function(iWidth)
{
	this.miWidth					=	Common.defaultIfUndefined(iWidth, 0);
};