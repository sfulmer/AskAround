function State()
{
	this.msAbbreviation					=	undefined;
	this.mbChanged						=	undefined;
	this.mObjCountry					=	undefined;
	this.miId							=	undefined;
	this.msName							=	undefined;
	this.mArrObjObservers				=	[];
}

State.prototype.addObserver				=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 		=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

State.copyFromJSON						=	function(objJSON, objState)
{
	if(objState == undefined)
		objState						=	new State();
	
	for(prop in objJSON)
		switch(prop)
			{
			case "country":
				objState.setCountry(Country.copyFromJSON(eval("objJSON." + prop), objState.getCountry()));
				break;
			default:
				eval("objState.set" + prop.substring(0, 1).toUpperCase() + prop.substring(1) + "(objJSON." + prop + ");");
				break;
			}
	
	return(objState);
};

State.prototype.getAbbreviation			=	function()
{
	if(this.msAbbreviation == undefined)
		this.msAbbreviation				=	"";
	
	return(this.msAbbreviation);
};

State.prototype.getCountry				=	function()
{
	if(this.mObjCountry == undefined)
		this.mObjCountry				=	new Country();
	
	return(this.mObjCountry);
};

State.prototype.getId					=	function()
{
	if(this.miId == undefined)
		this.miId						=	0;
	
	return(this.miId);
};

State.prototype.getName					=	function()
{
	if(this.msName == undefined)
		this.msName						=	"";
	
	return(this.msName);
};

State.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

State.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

State.prototype.packageToJSON			=	function()
{
	return(	{	id:				this.getId()
			,	name:			this.getName()
			,	abbreviation:	this.getAbbreviation()
			,	country:		this.getCountry().packageToJSON()
			});
};

State.prototype.setAbbreviation			=	function(sAbbreviation)
{
	if(sAbbreviation == undefined)
		this.msAbbreviation				=	"";
	else
		this.msAbbreviation				=	sAbbreviation;
	
	this.notifyObservers();
	
	return(this);
};

State.prototype.setCountry				=	function(objCountry)
{
	if(objCountry == undefined)
		this.mObjCountry				=	new Country();
	else
		this.mObjCountry				=	objCountry;
	
	this.notifyObservers();
	
	return(this);
};

State.prototype.setId					=	function(iId)
{
	if(iId == undefined)
		this.miId						=	0;
	else
		this.miId						=	iId;
	
	this.notifyObservers();
	
	return(this);
};

State.prototype.setName					=	function(sName)
{
	if(sName == undefined)
		this.msName						=	"";
	else
		this.msName						=	sName;
	
	this.notifyObservers();
	
	return(this);
};