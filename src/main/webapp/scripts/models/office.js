function Office()
{
	this.mObjAddress				=	undefined;
	this.mbChanged					=	undefined;
	this.mObjCompany				=	undefined;
	this.miId						=	undefined;
	this.mArrObjObservers			=	[];
}

Office.prototype.addObserver		=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers 	=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

Office.copyFromJSON				=	function(objCompany, objJSON, objOffice)
{
	if(objOffice == undefined)
		objOffice				=	new Office(objCompany);
	
	for(prop in objJSON)
		switch(prop)
			{
			case 'address':
				objOffice.setAddress(Address.copyFromJSON(eval("objJSON." + prop), objOffice.getAddress()));
				break;
			case 'company':
				objOffice.setCompany(Company.copyFromJSON(eval("objJSON." + prop), objOffice.getCompany()));
				break;
			default:
				objOffice["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objOffice, eval("objJSON." + prop));
			}
};

Office.prototype.getAddress			=	function()
{
	if(this.mObjAddress == undefined)
		this.mObjAddress 			=	new Address();
	
	return(this.mObjAddress);
};

Office.prototype.getCompany			=	function()
{
	if(this.mObjCompany == undefined)
		this.mObjCompany 			=	new Company();
	
	return(this.mObjCompany);
};

Office.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId 					=	0;
	
	return(this.miId);
};

Office.prototype.hasChanged			=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

Office.prototype.notifyObservers	=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

Office.prototype.packageToJSON		=	function()
{
	return(	{	id:			this.getId()
			,	address:	this.getAddress().packageToJSON()
			,	company:	this.getCompany().packageToJSON()
			});
};

Office.prototype.setAddress			=	function(objAddress)
{
	if(objAddress == undefined)
		this.mObjAddress 			=	new Address();
	else
		this.mObjAddress 			=	objAddress;
	
	this.notifyObservers();
	
	return(this);
};

Office.prototype.setCompany			=	function(objCompany)
{
	if(objCompany == undefined)
		this.mObjCompany 			=	new Company();
	else
		this.mObjCompany 			=	objCompany;
	
	this.notifyObservers();
	
	return(this);
};

Office.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId 					=	0;
	else
		this.miId 					=	iId;
	
	this.notifyObservers();
	
	return(this);
};