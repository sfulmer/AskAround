function City()
{
	this.mbChanged						=	undefined;
	this.miId							=	undefined;
	this.msName							=	undefined;
	this.mArrObjObservers				=	[];
	this.mObjState						=	undefined;
}

City.prototype.addObserver				=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 		=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

City.copyFromJSON					=	function(objJSON, objCity)
{
	if(objCity == undefined)
		objCity						=	new City();
	
	for(prop in objJSON)
		switch(prop)
			{
			case "state":
				objCity.setState(State.copyFromJSON(eval("objJSON." + prop), objCity.getState()));
				break;
			default:
				eval("objCity.set" + prop.substring(0, 1).toUpperCase() + prop.substring(1) + "(objJSON." + prop + ");");
				break;
			}
	
	return(objCity);
};

City.prototype.getId					=	function()
{
	if(this.miId == undefined)
		this.miId						=	0;
	
	return(this.miId);
};

City.prototype.getName					=	function()
{
	if(this.msName == undefined)
		this.msName						=	"";
	
	return(this.msName);
};

City.prototype.getState					=	function()
{
	if(this.mObjState == undefined)
		this.mObjState					=	new State();
	
	return(this.mObjState);
};

City.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged 					=	false;
	
	return(this.mbChanged);
};

City.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

City.prototype.packageToJSON			=	function()
{
	return(	{	id:		this.getId()
			,	name:	this.getName()
			,	state:	this.getState().packageToJSON()
			});
};

City.prototype.setId					=	function(iId)
{
	if(iId == undefined)
		this.miId						=	0;
	else
		this.miId						=	iId;
	
	this.notifyObservers();
	
	return(this);
};

City.prototype.setName					=	function(sName)
{
	if(sName == undefined)
		this.msName						=	"";
	else
		this.msName						=	sName;
	
	this.notifyObservers();
	
	return(this);
};

City.prototype.setState					=	function(objState)
{
	if(objState == undefined)
		this.mObjState					=	new State();
	else
		this.mObjState					=	objState;
	
	this.notifyObservers();
	
	return(this);
};