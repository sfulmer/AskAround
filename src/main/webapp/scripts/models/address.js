function Address()
{
	this.mbChanged					=	undefined;
	this.miId						=	undefined;
	this.mArrLines					=	[];
	this.mArrObjObservers			=	[];
	this.mObjZipCode				=	undefined;
}

Address.prototype.addLine			=	function(iId, sAddressLine, iLineNumber)
{
	this.getLines().push(new AddressLine(this, iId, sAddressLine, iLineNumber));
	
	return(this);
};

Address.prototype.addObserver				=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers = [];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

Address.prototype.clearAddressLines	=	function()
{
	this.mArrLines					=	[];
	
	this.notifyObservers();
};

Address.copyFromJSON				=	function(objJSON, objAddress)
{
	if(objAddress == undefined)
		objAddress					=	new Address();
	
	for(prop in objJSON)
		switch(prop)
			{
			case 'lines':
				objAddress.clearAddressLines();
				
				for(var iLength = eval("objJSON." + prop).length, iLoop = 0; iLoop < iLength; iLoop++)
					objAddress.getLines().push(AddressLine.copyFromJSON(objAddress, eval("objJSON." + prop + "[iLoop]")));
				
				break;
			case 'zipCode':
				objAddress.setZipCode(ZipCode.copyFromJSON(eval("objJSON." + prop), objAddress.getZipCode()));
				break;
			default:
				objAddress["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objAddress, eval("objJSON." + prop));
			}
	
	return(objAddress);
};

Address.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

Address.prototype.getLines			=	function()
{
	if(this.mArrLines == undefined)
		this.mArrLines = [];
	
	return(this.mArrLines);
};

Address.prototype.getZipCode		=	function()
{
	if(this.mObjZipCode == undefined)
		this.mObjZipCode = new ZipCode();
	
	return(this.mObjZipCode);
};

Address.prototype.hasChanged		=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

Address.prototype.notifyObservers	=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

Address.prototype.packageToJSON		=	function()
{
	var objAddress =	{	id:				this.getId()
						,	lines:			[]
						,	zipCode:		this.getZipCode().packageToJSON()
						};
	
	for(var iLength = this.getLines().length, iLoop = 0; iLoop < iLength; iLoop++)
		objAddress.lines.push(this.getLines().packageToJSON());
	
	return(objAddress);
};

Address.prototype.setId				=	function(iId)
{
	if(iId == undefined)
		this.miId 					=	0;
	else
		this.miId					=	iId;
	
	this.notifyObservers();
	
	return(this);
};

Address.prototype.setZipCode		=	function(objZipCode)
{
	if(objZipCode == undefined)
		this.mObjZipCode			=	new ZipCode();
	else
		this.mObjZipCode 			=	objZipCode;
	
	this.notifyObservers();
	
	return(this);
};