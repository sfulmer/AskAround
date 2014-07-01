function AddressLine(objAddress, iId, sAddressLine, iLineNumber)
{
	this.mObjAddress					=	objAddress;
	this.msAddressLine					=	Common.defaultIfUndefined(sAddressLine, "");
	this.mbChanged						=	undefined;
	this.miId							=	Common.defaultIfUndefined(iId, 0);
	this.miLineNumber					=	Common.defaultIfUndefined(iLineNumber, 0);
	this.mArrObjObservers				=	[];
}

AddressLine.prototype.addObserver				=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers = [];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

AddressLine.copyFromJSON						=	function(objAddress, objJSON, objAddressLine)
{
	if(objAddressLine == undefined)
		objAddressLine							=	new AddressLine(objAddress);
	
	for(prop in objJSON)
		objAddressLine["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objAddressLine, eval("objJSON." + prop));
	
	return(objAddressLine);
};

AddressLine.prototype.getAddress		=	function()
{
	return(this.mObjAddress);
};

AddressLine.prototype.getAddressLine	=	function()
{
	if(this.msAddressLine == undefined)
		this.msAddressLine = "";
	
	return(this.msAddressLine);
};

AddressLine.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

AddressLine.prototype.getLineNumber		=	function()
{
	if(this.miLineNumber == undefined)
		this.miLineNumber = 0;
	
	return(this.miLineNumber);
};

AddressLine.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

AddressLine.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

AddressLine.prototype.setAddress		=	function(objAddress)
{
	this.mObjAddress 					=	objAddress;
	
	return(this);
};

AddressLine.prototype.setAddressLine	=	function(sAddressLine)
{
	if(sAddressLine == undefined)
		this.msAddressLine				=	"";
	else
		this.msAddressLine 				=	sAddressLine;
	
	return(this);
};

AddressLine.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId 						=	0;
	else
		this.miId						=	iId;
	
	return(this);
};

AddressLine.prototype.setLineNumber		=	function(iLineNumber)
{
	if(iLineNumber == undefined)
		this.miLineNumber				=	0;
	else
		this.miLineNumber 				=	iLineNumber;
	
	return(this);
};