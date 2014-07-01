function Asset()
{
	this.mObjAppUser				=	undefined;
	this.mObjCategory				=	undefined;
	this.mbChanged					=	undefined;
	this.mdDepreciatedValue			=	undefined;
	this.msDescription				=	undefined;
	this.mdtExpiration				=	undefined;
	this.miId						=	undefined;
	this.mObjImage					=	undefined;
	this.msItemNumber				=	undefined;
	this.mArrObjObservers			=	[];
	this.mdtPosted					=	undefined;
	this.mdRetailValue				=	undefined;
	this.mObjStatus					=	undefined;
	this.msTitle					=	undefined;
}

Asset.prototype.addObserver			=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers	=	[];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

Asset.copyFromJSON					=	function(objJSON, objAsset)
{
	if(objAsset == undefined)
		objAsset = new Asset();
	
	for(prop in objJSON)
		switch(prop)
			{
			case 'category':
				Category.copyFromJSON(eval("objJSON." + prop), objAsset.getCategory());
				break;
			case 'image':
				AssetImage.copyFromJSON(eval("objJSON." + prop), objAsset.getImage());
				break;
			case 'poster':
				AppUser.copyFromJSON(eval("objJSON." + prop), objAsset.getPoster());
				break;
			case 'status':
				AssetStatus.copyFromJSON(eval("objJSON." + prop), objAsset.getStatus());
				break;
			default:
				objAsset["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objAsset, eval("objJSON." + prop));
			}
	
	return(objAsset);
};

Asset.prototype.getCategory			=	function()
{
	if(this.mObjCategory == undefined)
		{
		this.mObjCategory = new Category();
		
		this.mObjCategory.addObserver((function(objThis)
		{
			return(function(objArgument)
			{
				objThis.notifyObservers();
			});
		})(this));
		}
	
	return(this.mObjCategory);
};

Asset.prototype.getDepreciatedValue	=	function()
{
	if(this.mdDepreciatedValue == undefined)
		this.mdDepreciatedValue = 0.00;
	
	return(this.mdDepreciatedValue);
};

Asset.prototype.getDescription		=	function()
{
	if(this.msDescription == undefined)
		this.msDescription = "";
	
	return(this.msDescription);
};

Asset.prototype.getExpirationDate	=	function()
{
	return(this.mdtExpiration);
};

Asset.prototype.getId				=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

Asset.prototype.getImage			=	function()
{
	if(this.mObjImage == undefined)
		{
		this.mObjImage = new AssetImage();
		
		this.mObjImage.addObserver((function(objThis)
			{
				return(function(objArgument)
				{
					objThis.notifyObservers();
				});
			})(this));
		}
	
	return(this.mObjImage);
};

Asset.prototype.getItemNumber		=	function()
{
	if(this.msItemNumber ==	undefined)
		this.msItemNumber = "";
	
	return(this.msItemNumber);
};

Asset.prototype.getPostedDate		=	function()
{
	return(this.mdtPosted);
};

Asset.prototype.getPoster				=	function()
{
	if(this.mObjAppUser == undefined)
		{
		this.mObjAppUser = new AppUser();
		
		this.mObjAppUser.addObserver((function(objThis)
		{
			return(function(objArgument)
			{
				objThis.notifyObservers();
			});
		})(this));
		}
	
	return(this.mObjAppUser);
};

Asset.prototype.getRetailValue		=	function()
{
	if(this.mdRetailValue == undefined)
		this.mdRetailValue = 0.00;
	
	return(this.mdRetailValue);
};

Asset.prototype.getStatus			=	function()
{
	if(this.mObjStatus == undefined)
		{
		this.mObjStatus = new AssetStatus();
		
		this.mObjStatus.addObserver((function(objThis)
		{
			return(function(objArgument)
			{
				objThis.notifyObservers();
			});
		})(this));
		}
	
	return(this.mObjStatus);
};

Asset.prototype.getTitle			=	function()
{
	if(this.msTitle == undefined)
		this.msTitle = "";
	
	return(this.msTitle);
};

Asset.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

Asset.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

Asset.prototype.packageToJSON			=	function()
{
	return(	{	id:					this.getId()
			,	poster:				this.getPoster().packageToJSON()
			,	itemNumber:			this.getItemNumber()
			,	title:				this.getTitle()
			,	description:		this.getDescription()
			,	category:			this.getCategory().packageToJSON()
			,	status:				this.getStatus().packageToJSON()
			,	depreciatedValue:	this.getDepreciatedValue()
			,	retailValue:		this.getRetailValue()
			,	postedDate:			this.getPostedDate()
			,	expirationDate:		this.getExpirationDate()
			,	image:				this.getImage().packageToJSON()
			});
};

Asset.prototype.setCategory				=	function(objCategory)
{
	if(objCategory == undefined)
		this.mObjCategory 				=	new Category();
	else
		this.mObjCategory 				=	objCategory;
	
	this.mObjCategory.addObserver((function(objThis)
	{
		return(function(objArgument)
		{
			objThis.notifyObservers();
		});
	})(this));
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setDepreciatedValue		=	function(dDepreciatedValue)
{
	if(dDepreciatedValue == undefined)
		this.mdDepreciatedValue 		=	0.00;
	else
		this.mdDepreciatedValue			=	dDepreciatedValue;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setDescription			=	function(sDescription)
{
	if(sDescription == undefined)
		this.msDescription 				=	"";
	else
		this.msDescription				=	sDescription;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setExpirationDate		=	function(dtExpiration)
{
	this.mdtExpiration					=	dtExpiration;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setId					=	function(iId)
{
	if(iId == undefined)
		this.miId						=	0;
	else
		this.miId						=	iId;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setImage				=	function(objImage)
{
	if(objImage == undefined)
		this.mObjImage					=	new AssetImage();
	else
		this.mObjImage					=	objImage;
	
	this.mObjImage.addObserver((function(objThis)
	{
		return(function(objArgument)
		{
			objThis.notifyObservers();
		});
	})(this));
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setItemNumber			=	function(sItemNumber)
{
	if(sItemNumber ==	undefined)
		this.msItemNumber 				=	"";
	else
		this.msItemNumber				=	sItemNumber;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setPostedDate			=	function(dtPosted)
{
	this.mdtPosted						=	dtPosted;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setPoster				=	function(objAppUser)
{
	if(objAppUser == undefined)
		this.mObjAppUser				=	objAppUser;
	else
		this.mObjAppUser				=	objAppUser;
	
	this.mObjAppUser.addObserver((function(objThis)
	{
		return(function(objArgument)
		{
			objThis.notifyObservers();
		});
	})(this));
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setRetailValue			=	function(dRetailValue)
{
	if(dRetailValue == undefined)
		this.mdRetailValue 				=	0.00;
	else
		this.mdRetailValue				=	dRetailValue;
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setStatus				=	function(objStatus)
{
	if(objStatus == undefined)
		this.mObjStatus 				=	new AssetStatus();
	else
		this.mObjStatus					=	objStatus;
	
	this.mObjStatus.addObserver((function(objThis)
	{
		return(function(objArgument)
		{
			objThis.notifyObservers();
		});
	})(this));
	
	this.notifyObservers();
	
	return(this);
};

Asset.prototype.setTitle				=	function(sTitle)
{
	if(sTitle == undefined)
		this.msTitle 					=	"";
	else
		this.msTitle					=	sTitle;
	
	this.notifyObservers();
	
	return(this);
};