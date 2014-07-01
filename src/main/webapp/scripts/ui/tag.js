//***************************************************************************************
//* Tag
//***************************************************************************************
function Tag(sTag, bOpen, attrMap, cssMap)
{
	this.mbOpen				=	Common.defaultIfUndefined(bOpen, false);
	this.mObjTag			=	$("<" + sTag + (bOpen ? "/>" : "></" + sTag + ">"));
	
	if(attrMap != undefined)
		for(attr in attrMap)
			if(attrMap.hasOwnProperty(attr))
				this.attr(attr, attrMap[attr]);
		
	if(cssMap != undefined)
		for(css in cssMap)
			if(cssMap.hasOwnProperty(css))
				this.css(css, cssMap[css]);
	
	return(this.getTag());
}

Tag.prototype.attr			=	function(key, value)
{
	if(value == undefined)
		if(typeof(key) == "string")
			return(this.getTag().attr(key));
		else
			this.getTag().attr(key);
	else
		this.getTag().attr(key, value);
};

Tag.prototype.css			=	function(key, value)
{
	if(value == undefined)
		if(typeof(key) == "string")
			return(this.getTag().css(key));
		else
			this.getTag().css(key);
	else
		this.getTag().css(key, value);
};

Tag.prototype.getTag		=	function()
{
	return(this.mObjTag);
};

Tag.prototype.isOpen		=	function()
{
	if(this.mbOpen == undefined)
		this.mbOpen = false;
	
	return(this.mbOpen);
};