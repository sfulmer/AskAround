function AssetImage(iId, objData, iWidth, iHeight, sName, sDescription)
{
	this.mbChanged						=	undefined;
	this.mObjData						=	objData;
	this.msDescription					=	Common.defaultIfUndefined(sDescription, "");
	this.miHeight 						= 	Common.defaultIfUndefined(iHeight, 32);
	this.miId							=	Common.defaultIfUndefined(iId, 0);
	this.msName							=	Common.defaultIfUndefined(sName, "");
	this.mArrObjObservers				=	[];
	this.miWidth						=	Common.defaultIfUndefined(iWidth, 32);
};

AssetImage.prototype.addObserver		=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers = [];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

AssetImage.copyFromJSON				=	function(objJSON, objAssetImage)
{
	if(objAssetImage == undefined)
		objAssetImage = new AssetImage();
	
	for(prop in objJSON)
		objAssetImage["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objAssetImage, eval("objJSON." + prop));
	
	return(objAssetImage);
};

AssetImage.prototype.getData			=	function()
{
	return(this.mObjData);
};

AssetImage.prototype.getDescription		=	function()
{
	if(this.msDescription == undefined)
		this.msDescription = "";
	
	return(this.msDescription);
};

AssetImage.prototype.getHeight			=	function()
{
	if(this.miHeight == undefined)
		this.miHeight = 32;
	
	return(this.miHeight);
};

AssetImage.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

AssetImage.prototype.getName			=	function()
{
	if(this.msName == undefined)
		this.msName = "";
	
	return(this.msName);
};

AssetImage.prototype.getWidth			=	function()
{
	if(this.miWidth == undefined)
		this.miWidth = 32;
	
	return(this.miWidth);
};

AssetImage.prototype.hasChanged			=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

AssetImage.prototype.notifyObservers	=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

AssetImage.prototype.packageToJSON		=	function()
{
	return(	{	id:				this.getId()
			,	data:			this.getData()
			,	name:			this.getName()
			,	description:	this.getDescription()
			,	height:			this.getHeight()
			,	width:			this.getWidth()
			});
};

AssetImage.prototype.setData			=	function(objData)
{
	this.mObjData = objData;
	
	this.notifyObservers();
	
	return(this);
};

AssetImage.prototype.setDescription		=	function(sDescription)
{
	if(sDescription == undefined)
		this.msDescription = "";
	else
		this.msDescription = sDescription;
	
	this.notifyObservers();
	
	return(this);
};

AssetImage.prototype.setHeight			=	function(iHeight)
{
	if(iHeight == undefined)
		this.miHeight = 32;
	else
		this.miHeight = iHeight;
	
	this.notifyObservers();
	
	return(this);
};

AssetImage.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId = 0;
	else
		this.miId = iId;
	
	this.notifyObservers();
	
	return(this);
};

AssetImage.prototype.setName			=	function(sName)
{
	if(sName == undefined)
		this.msName = "";
	else
		this.msName = sName;
	
	this.notifyObservers();
	
	return(this);
};

AssetImage.prototype.setWidth			=	function(iWidth)
{
	if(iWidth == undefined)
		this.miWidth = 32;
	else
		this.miWidth = iWidth;
	
	this.notifyObservers();
	
	return(this);
};