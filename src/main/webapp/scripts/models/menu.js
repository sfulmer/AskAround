function MenuItem(iId, sName, sDescription, objModule, iOrderNo)
{
	this.mbClicked								=	false;
	this.mFuncArrClickListeners					=	[];
	this.msDescription 							= 	((sDescription == undefined) ? ((objModule == undefined) ? "" : objModule.getDescription()) : sDescription);
	this.mObjJQuery								=	undefined;
	this.miId 									= 	((iId == undefined) ? 0 : iMenuId);
	this.msName 								= 	((sName == undefined) ? ((objModule == undefined) ? "" : objModule.getName()) : sName);
	this.mObjModule								=	((objModule == undefined) ? new Module() : objModule);
	this.miOrderNo								=	((iOrderNo == undefined) ? 0 : iOrderNo);
	this.miWidth								=	undefined;
}

MenuItem.prototype.addClickListener				=	function(funcClick)
{
	this.getClickListeners().push(funcClick);
	
	return(this);
};

MenuItem.prototype.click						=	function(bClicked)
{
	if(this.isActive())
		if(!this.isClicked())
			if(this.mbClicked = Common.defaultIfUndefined(bClicked, true))
				{
				this.iterateClickListeners(this);
				
				this.getJQuery().css({cursor:	"default"});
				}
			else
				this.getJQuery().css({cursor:	"pointer"});
		else
			{
			this.mbClicked = Common.defaultIfUndefined(bClicked, true);
			
			this.getJQuery().css({cursor:		"pointer"});
			}
};

MenuItem.copyFromJSON							=	function(objData, objMenuItem)
{
	if(objMenuItem == undefined)
		objMenuItem = new MenuItem();
	
	for(prop in objData)
		switch(prop)
			{
			case 'module':
				objMenuItem.setModule(Module.copyFromJSON(objData.module));
				break;
			default:
				objMenuItem["set" + prop.substring(0, 1).toUpperCase() + prop.substring(1)].call(objMenuItem, eval("objData." + prop));
				break;
			}
	
	return(objMenuItem);
};

MenuItem.prototype.getClickListeners			=	function()
{
	if(this.mFuncArrClick == undefined)
		this.mFuncArrClick = [];
	
	return(this.mFuncArrClick);
};

MenuItem.prototype.getDescription				=	function()
{
	if(this.msDescription == undefined)
		this.msDescription = getModule().getDescription();
	
	return(this.msDescription);
};

MenuItem.prototype.getId						=	function()
{
	if(this.miId == undefined)
		this.miId = 0;
	
	return(this.miId);
};

MenuItem.prototype.getJQuery					=	function()
{
	if(this.mObjJQuery == undefined)
		{
		this.mObjJQuery = new Panel	(	{	id:						"pnlMenuItem_" + this.getId()	}
									,	{	"background-color":		"#3366DD"
										,	color:					"white"
										,	cursor:					(this.isActive() ? "pointer" : "default")
										,	height:					"35px"
										,	left:					"-5px"
										,	position:				"relative"
										,	"text-align":			"center"
										,	top:					"-5px"
										,	"vertical-align":		"middle"
										,	width:					(this.getWidth() * 8) + "px"
										,	"z-index":				100
										})
							.html(this.getName());
		
		if(this.isActive())
			{
			var this_ = this;
			
			this.mObjJQuery.click(function()
			{
				this_.click();
			});
			}
		}
	
	return(this.mObjJQuery);
};

MenuItem.prototype.getModule					=	function()
{
	if(this.mObjModule == undefined)
		this.mObjModule = new Module();
	
	return(this.mObjModule);
};

MenuItem.prototype.getName						=	function()
{
	if(this.msName == undefined)
		this.msName = getModule().getName();
	
	return(this.msName);
};

MenuItem.prototype.getOrderNumber				=	function()
{
	if(this.miOrderNo == undefined)
		this.miOrderNo = 0;
	
	return(this.miOrderNo);
};

MenuItem.prototype.getWidth						=	function()
{
	if(this.miWidth == undefined)
		this.miWidth = this.getName().length * 12;
	
	return(this.miWidth);
};

MenuItem.prototype.isActive						=	function()
{
	return(this.getModule().isActive());
};

MenuItem.prototype.isClicked					=	function()
{
	return(this.mbClicked);
};

MenuItem.prototype.iterateClickListeners		=	function(objArgument)
{
	for(var iLength = this.getClickListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getClickListeners()[iLoop].call(this, objArgument);
};

MenuItem.prototype.setActive					=	function(bActive)
{
	if(bActive == undefined)
		this.mbActive = false;
	else
		this.mbActive = bActive;
	
	return(this);
};

MenuItem.prototype.setDescription				=	function(sDescription)
{
	if(sDescription == undefined)
		this.msDescription = this.getModule().getDescription();
	else
		this.msDescription = sDescription;
	
	return(this);
};

MenuItem.prototype.setId						=	function(iId)
{
	if(iId == undefined)
		this.miId = 0;
	else
		this.miId = iId;
	
	return(this);
};

MenuItem.prototype.setModule					=	function(objModule)
{
	if(objModule == undefined)
		this.mObjModule = new Module();
	else
		this.mObjModule = objModule;
	
	return(this);
};

MenuItem.prototype.setName						=	function(sName)
{
	if(sName == undefined)
		this.msName = this.getModule().getName();
	else
		this.msName = sName;
	
	return(this);
};

MenuItem.prototype.setOrderNumber				=	function(iOrderNo)
{
	if(iOrderNo == undefined)
		this.miOrderNo = 0;
	else
		this.miOrderNo = iOrderNo;
};

MenuItem.prototype.setWidth						=	function(iWidth)
{
	if(iWidth == undefined)
		this.miWidth = this.getWidth();
	else
		this.miWidth = iWidth;
	
	if(this.mObjJQuery != undefined)
		this.getJQuery().css("width", this.miWidth + "px");
};

function Menu(arrItems)
{
	this.mArrItems 				=	Common.defaultIfUndefined(arrItems, []);
	this.mObjClickedItem		=	undefined;
	this.mFuncArrClickListeners	=	[];
	this.miMaximumWidth 		=	undefined;
	this.mObjJQuery				=	undefined;
	this.mFuncArrSize			=	[];
	
	this.layoutMenu();
}

Menu.prototype.addClickListener					=	function(funcClick)
{
	if(funcClick != undefined)
		this.getClickListeners().push(funcClick);
	
	return(this);
};

Menu.prototype.addItem							=	function(objItem)
{
	this.mArrItems.push(objItem);
		
	this.miMaximumWidth = undefined;
	
	this.layoutMenu();
};

Menu.prototype.addSizeCallback					=	function(funcSize)
{
	if(funcSize != undefined)
		this.getSizeCallbacks().push(funcSize);
	
	return(this);
};

Menu.prototype.click							=	function(objItem)
{
	var arrItems = this.getItems();
	
	for(var iLength = arrItems.length, iLoop = 0; iLoop < iLength; iLoop++)
		{
		if(Common.isNumeric(objItem))
			if(arrItems[iLoop] == objItem)
				{
				this.mObjClickedItem = arrItems[iLoop];
				
				arrItems[iLoop].click();
				}
			else
				arrItems[iLoop].click(false);
		else if(arrItems[iLoop].getId() == objItem.getId())
			{
			this.mObjClickedItem = arrItems[iLoop];
			
			arrItems[iLoop].click();
			}
		else
			arrItems[iLoop].click(false);
		}
};

Menu.prototype.getClickedItem					=	function()
{
	return(this.mObjClickedItem);
};

Menu.prototype.getClickListeners				=	function()
{
	if(this.mFuncArrClickListeners == undefined)
		this.mFuncArrClickListeners = [];
	
	return(this.mFuncArrClickListeners);
};

Menu.prototype.getItems							=	function()
{
	if(this.mArrItems == undefined)
		this.mArrItems = [];
	
	return(this.mArrItems);
};

Menu.prototype.getMaximumWidth					=	function()
{
	if(this.miMaximumWidth == undefined)
		{
		var iMax = 0;
		arrItems = this.getItems();
		
		for(var iLength = arrItems.length, iLoop = 0; iLoop < iLength; iLoop++)
			if(arrItems[iLoop].getWidth() > iMax)
				iMax = arrItems[iLoop].getWidth();
		
		this.miMaximumWidth = iMax;
		}
	
	return(this.miMaximumWidth);
};

Menu.prototype.getJQuery						=	function()
{
	if(this.mObjJQuery == undefined)
		this.mObjJQuery = new Panel(	{	id:					"pnlMenu"	}
									, 	{	"background-color":	"white"
										,	height:				"50px"
										,	position:			"relative"
										,	width:				this.getMaximumWidth() * 16 + "px"
										});
	
	return(this.mObjJQuery);
};

Menu.prototype.getSizeCallbacks					=	function()
{
	if(this.mFuncArrSize == undefined)
		this.mFuncArrSize = [];
	
	return(this.mFuncArrSize);
};

Menu.prototype.iterateClickListeners			=	function(objArgument)
{
	for(var iLength = this.getClickListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getClickListeners()[iLoop].call(this, objArgument);
};

Menu.prototype.layoutMenu				=	function()
{
	var arrItems = this.getItems();
	
	for(var iLength = arrItems.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getJQuery().append(arrItems[iLoop].getJQuery());
	
	for(var iLength = arrItems.length, iLoop = 0; iLoop < iLength; iLoop++)
		{
		arrItems[iLoop].getJQuery().css("top", (iLoop * 10) + ((iLoop + 1) * 15) + "px");
		arrItems[iLoop].setWidth(this.getMaximumWidth());
		}
	
	this.getJQuery().css(	{	height:	((arrItems.length-1) * 10) + (arrItems.length * 15) + "px"
							,	width:	this.getMaximumWidth() + "px"
							});
	
	for(var iLength = this.getSizeCallbacks().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getSizeCallbacks()[iLoop].call(this, parseInt(Common.extractDimensionFromString(this.getJQuery().css("left"), "px", 0)), parseInt(Common.extractDimensionFromString(this.getJQuery().css("top"), "px", 0)), parseInt(Common.extractDimensionFromString(this.getJQuery().css("width"), "px", 0)), parseInt(Common.extractDimensionFromString(this.getJQuery().css("height"), "px", 0)));
};

Menu.loadMenus									=	function()
{
	var objMenu	=	new Menu();
	
	$.ajax(	{	dataType:	"json"
			,	success:	function(data)
							{
								for(var iLength = data.length, iLoop = 0; iLoop < iLength; iLoop++)
									{
									var objMenuItem = MenuItem.copyFromJSON(data[iLoop]);
									
									objMenuItem.addClickListener(function(objMenuItem)
									{
										for(var iLength = objMenu.getItems().length, iLoop = 0; iLoop < iLength; iLoop++)
											if(objMenu.getItems()[iLoop].getId() != objMenuItem.getId())
												objMenu.getItems()[iLoop].click(false);
										
										objMenu.iterateClickListeners(objMenuItem);
									});
									
									objMenu.addItem(objMenuItem);
									}
								
								$.ajax(	{	dataType:	"json"
										,	success:	function(data)
											{
												if(data.id > 0)
													{
													var objItem = MenuItem.copyFromJSON(data);
													
													for(var iLength = objMenu.getItems().length, iLoop = 0; iLoop < iLength; iLoop++)
														{
														var objMenuItem = objMenu.getItems()[iLoop];
														
														if(objMenuItem.getId() == objItem.getId())
															objMenu.click(objMenuItem);
														}
													}
												else
													objMenu.click(objMenu.getItems()[0]);
											}
										,	type:		"post"
										,	url:		"menu/current"
										});
							}
			,	type:		"post"
			,	url:		"menu"
			});
	
	return(objMenu);
};