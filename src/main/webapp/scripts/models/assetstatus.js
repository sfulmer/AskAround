function AssetStatus()
{
	this.mbChanged						=	undefined;
	this.msDescription					=	undefined;
	this.miId							=	undefined;
	this.mArrObjObservers				=	[];
	this.msStatus						=	undefined;
};

AssetStatus.prototype.addObserver		=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 		=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

AssetStatus.copyFromJSON				=	function(objJSON, objAssetStatus)
{
	if(objAssetStatus == undefined)
		objAssetStatus					=	new AssetStatus();
	
	for(prop in objJSON)
		objAssetStatus["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objAssetStatus, eval("objJSON." + prop));
	
	return(objAssetStatus);
};

AssetStatus.prototype.getDescription	=	function()
{
	if(this.msDescription == undefined)
		this.msDescription = "";
	
	return(this.msDescription);
};

AssetStatus.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

AssetStatus.prototype.getStatus			=	function()
{
	if(this.msStatus == undefined)
		this.msStatus = "";
	
	return(this.msStatus);
};

AssetStatus.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

AssetStatus.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

AssetStatus.prototype.packageToJSON		=	function()
{
	return(	{	id:				this.getId()
			,	status:			this.getStatus()
			,	description:	this.getDescription()
			});
};

AssetStatus.prototype.setDescription	=	function(sDescription)
{
	if(sDescription == undefined)
		this.msDescription = "";
	else
		this.msDescription = sDescription;
	
	this.notifyObservers();
	
	return(this);
};

AssetStatus.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId = 0;
	else
		this.miId = iId;
	
	this.notifyObservers();
	
	return(this);
};

AssetStatus.prototype.setStatus			=	function(sStatus)
{
	if(sStatus == undefined)
		this.msStatus = "";
	else
		this.msStatus = sStatus;
	
	this.notifyObservers();
	
	return(this);
};