function Country()
{
	this.msAbbreviation					=	undefined;
	this.mbChanged						=	undefined;
	this.miId							=	undefined;
	this.msName							=	undefined;
	this.mArrObjObservers				=	[];
}

Country.prototype.addObserver			=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 		=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

Country.copyFromJSON					=	function(objJSON, objCountry)
{
	if(objCountry == undefined)
		objCountry						=	new Country();
	
	for(prop in objJSON)
		eval("objCountry.set" + prop.substring(0, 1).toUpperCase() + prop.substring(1) + "(objJSON." + prop + ");");
	
	return(objCountry);
};

Country.prototype.getAbbreviation		=	function()
{
	if(this.msAbbreviation == undefined)
		this.msAbbreviation				=	"";
	
	return(this.msAbbreviation);
};

Country.prototype.getId					=	function()
{
	if(this.miId == undefined)
		this.miId						=	0;
	
	return(this.miId);
};

Country.prototype.getName				=	function()
{
	if(this.msName == undefined)
		this.msName						=	"";
	
	return(this.msName);
};

Country.prototype.hasChanged			=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

Country.prototype.notifyObservers		=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

Country.prototype.packageToJSON			=	function()
{
	return(	{	id:				this.getId()
			,	name:			this.getName()
			,	abbreviation:	this.getAbbreviation()
			});
};

Country.prototype.setAbbreviation		=	function(sAbbreviation)
{
	if(sAbbreviation == undefined)
		this.msAbbreviation				=	"";
	else
		this.msAbbreviation				=	sAbbreviation;
	
	this.notifyObservers();
	
	return(this);
};

Country.prototype.setId					=	function(iId)
{
	if(iId == undefined)
		this.miId						=	0;
	else
		this.miId						=	iId;
	
	this.notifyObservers();
	
	return(this);
};

Country.prototype.setName				=	function(sName)
{
	if(sName == undefined)
		this.msName						=	"";
	else
		this.msName						=	sName;
	
	this.notifyObservers();
	
	return(this);
};