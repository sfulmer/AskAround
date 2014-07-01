//***************************************************************************************
//* Static
//***************************************************************************************
function Static(attrMap, cssMap)
{
	this.mObjStatic				=	new Tag("span", false, attrMap, cssMap);
	
	return(this.mObjStatic);
}

Static.prototype.attr			=	function(key, value)
{
	if(value == undefined)
		if(typeof(key) == "string")
			return(this.getStatic().attr(key));
		else
			this.getStatic().attr(key);
	else
		this.getStatic().attr(key, value);
};

Static.prototype.css			=	function(key, value)
{
	if(value == undefined)
		if(typeof(key) == "string")
			return(this.getStatic().css(key));
		else
			this.getStatic().css(key);
	else
		this.getStatic().css(key, value);
};

Static.prototype.getStatic			=	function()
{
	if(this.mObjStatic == undefined)
		this.mObjStatic = $("<span></span>");
	
	return(this.mObjStatic);
};