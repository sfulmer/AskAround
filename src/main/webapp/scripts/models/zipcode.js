function ZipCode()
{
	this.mbChanged					=	undefined;
	this.mObjCity					=	undefined;
	this.miId						=	undefined;
	this.mArrObjObservers			=	[];
	this.msZipCode					=	undefined;
}

ZipCode.prototype.addObserver		=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 	= [];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

ZipCode.copyFromJSON				=	function(objJSON, objZipCode)
{
	if(objZipCode == undefined)
		objZipCode					=	new ZipCode();
	
	for(prop in objJSON)
		switch(prop)
			{
			case "city":
				objZipCode.setCity(City.copyFromJSON(eval("objJSON." + prop), objZipCode.getCity()));
				break;
			default:
				objZipCode["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objZipCode, eval("objJSON." + prop));
				break;
			}
	
	return(objZipCode);
};

ZipCode.prototype.getCity			=	function()
{
	if(this.mObjCity == undefined)
		this.mObjCity 				= 	new City();
	
	return(this.mObjCity);
};

ZipCode.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId					=	0;
	
	return(this.miId);
};

ZipCode.prototype.getZipCode		=	function()
{
	if(this.msZipCode == undefined)
		this.msZipCode 				=	"";
	
	return(this.msZipCode);
};

ZipCode.prototype.hasChanged		=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged				=	false;
	
	return(this.mbChanged);
};

ZipCode.prototype.notifyObservers	=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

ZipCode.prototype.packageToJSON		=	function()
{
	return(	{	id:			this.getId()
			,	city:		this.getCity().packageToJSON()
			,	zipCode:	this.getZipCode()
			});
};

ZipCode.prototype.setCity			=	function(objCity)
{
	if(objCity == undefined)
		this.mObjCity 				= 	new City();
	else
		this.mObjCity				=	objCity;
	
	this.notifyObservers();
	
	return(this);
};

ZipCode.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId					=	0;
	else
		this.miId					=	iId;
	
	this.notifyObservers();
	
	return(this);
};

ZipCode.prototype.setZipCode		=	function(sZipCode)
{
	if(sZipCode == undefined)
		this.msZipCode 				=	"";
	else
		this.msZipCode				=	sZipCode;
	
	this.notifyObservers();
	
	return(this);
};