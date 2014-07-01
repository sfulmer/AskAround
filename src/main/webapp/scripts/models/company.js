function Company()
{
	this.mbChanged							=	undefined;
	this.miId								=	undefined;
	this.msName								=	undefined;
	this.mArrObjObservers					=	[];
	this.mArrObjOffices						=	[];
}

Company.prototype.addObserver				=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers = [];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

Company.prototype.addOffice					=	function(objAddress)
{
	getOffices().add(new Office(this, objAddress));
		
	return(this);
};

Company.copyFromJSON						=	function(objJSON, objCompany)
{
	if(objCompany == undefined)
		objCompany							=	new Company();
	
	for(prop in objJSON)
		switch(prop)
			{
			case 'offices':
				for(var iLength = eval("objJSON." + prop).length, iLoop = 0; iLoop < iLength; iLoop++)
					objCompany.addOffice(Office.convertFromJSON(objCompany, eval("objJSON." + prop + "[iLoop]")));
				break;
			default:
				objCompany["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objCompany, eval("objJSON." + prop));
				break;
			}
	
	return(objCompany);
};

Company.prototype.getId						=	function()
{
	if(this.miId == undefined)
		this.miId							=	0;
	
	return(this.miId);
};

Company.prototype.getName					=	function()
{
	if(this.msName == undefined)
		this.msName							=	"";
	
	return(this.msName);
};

Company.prototype.getOffices				=	function()
{
	if(this.mArrObjOffices == undefined)
		this.mArrObjOffices					=	[];
	
	return(this.mArrObjOffices);
};

Company.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

Company.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

Company.prototype.packageToJSON				=	function()
{
	var objCompany	=	{	id:			this.getId()
						,	name:		this.getName()
						,	offices:	[]
						};
	
	for(var iLength = this.getOffices().length, iLoop = 0; iLoop < iLength; iLoop++)
		objCompany.offices.push(this.getOffices()[iLoop].packageToJSON());
	
	return(objCompany);
};

Company.prototype.setId						=	function(iId)
{
	if(iId == undefined)
		this.miId							=	0;
	else
		this.miId							=	iId;
	
	this.notifyObservers();
	
	return(this);
};

Company.prototype.setName					=	function(sName)
{
	if(sName == undefined)
		this.msName							=	"";
	else
		this.msName							=	sName;
	
	this.notifyObservers();
	
	return(this);
};