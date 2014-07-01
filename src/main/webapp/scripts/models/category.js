function Category()
{
	this.mbChanged					=	undefined;
	this.msDescription				=	undefined;
	this.miId						=	undefined;
	this.msName						=	undefined;
	this.mArrObjObservers			=	[];
	this.mObjParent					=	undefined;
};

Category.prototype.addObserver		=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers	=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

Category.copyFromJSON			=	function(objJSON, objCategory)
{
	if(objCategory == undefined)
		objCategory = new Category();
	
	for(prop in objJSON)
		if(prop == "parent")
			if(eval("objJSON." + prop) == "null")
				objCategory.setParent(new Category());
			else
				objCategory.setParent(Category.copyFromJSON(objJSON.parent, objCategory.getParent()));
		else
			objCategory["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objCategory, eval("objJSON." + prop));
	
	return(objCategory);
};

Category.prototype.getDescription	=	function()
{
	if(this.msDescription == undefined)
		this.msDescription = "";
	
	return(this.msDescription);
};

Category.prototype.getId			=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

Category.prototype.getName			=	function()
{
	if(this.msName == undefined)
		this.msName = "";
	
	return(this.msName);
};

Category.prototype.getParent		=	function()
{
	if(this.mObjParent == undefined)
		{
		this.mObjParent = new Category();
		
		this.mObjParent.addObserver((function(objThis)
			{
				return(function(objArguments)
					{
						objThis.notifyObservers(objArguments);
					});
			})(this));
		}
	
	return(this.mObjParent);
};

Category.prototype.hasChanged		=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

Category.prototype.notifyObservers	=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

Category.prototype.packageToJSON	=	function()
{
	return(	{	id:				this.getId()
			,	name:			this.getName()
			,	description:	this.getDescription()
			,	parent:			{	id:				this.getParent().getId()
								,	name:			this.getParent().getName()
								,	description:	this.getParent().getDescription()
								}
			});
};

Category.prototype.setDescription	=	function(sDescription)
{
	if(sDescription == undefined)
		this.msDescription 			=	"";
	else
		this.msDescription 			=	sDescription;
	
	this.notifyObservers();
	
	return(this);
};

Category.prototype.setId			=	function(iId)
{
	if(iId == undefined)
		this.miId 					=	0;
	else
		this.miId 					=	iId;
	
	this.notifyObservers();
	
	return(this);
};

Category.prototype.setName			=	function(sName)
{
	if(sName == undefined)
		this.msName 				=	"";
	else
		this.msName 				=	sName;
	
	this.notifyObservers();
	
	return(this);
};

Category.prototype.setParent		=	function(objParent)
{
	if(objParent == undefined)
		this.mObjParent				=	new Category();
	else
		this.mObjParent 			=	objParent;
	
	this.mObjParent.addObserver((function(objThis)
		{
			return(function(objArguments)
				{
					objThis.notifyObservers(objArguments);
				});
		})(this));
	
	this.notifyObservers();
	
	return(this);
};