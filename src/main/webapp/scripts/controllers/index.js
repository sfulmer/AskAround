function IndexController(bInSignup, objAppUser)
{
	this.mObjAppUser			=	undefined;
	this.mObjCommonArea			=	undefined;
	this.mArrFuncAuthentication	=	[];
	this.mObjHeader				=	undefined;
	this.mbInLogin				=	false;
	this.mbInSignup				=	(bInSignup == undefined) ? false : bInSignup;
	this.mObjLogin				=	undefined;
	this.mObjSignup				=	undefined;
	this.mObjMenu				=	undefined;
	this.mObjNoSelect			=	undefined;
	
	this.setAppUser(	(objAppUser == null)
						?	new AppUser()
						:	(function(objAppUser)
							{
								return(AppUser.copyFromJSON(JSON.parse(objAppUser)));
							})(objAppUser));
}

IndexController.prototype.addAuthenticationCallback		=	function(funcCallback)
{
	this.getAuthenticationCallbacks().push(funcCallback);
};

IndexController.prototype.getAppUser					=	function()
{
	if(this.mObjAppUser == undefined)
		this.mObjAppUser = new AppUser();
	
	return(this.mObjAppUser);
};

IndexController.prototype.getAuthenticationCallbacks	=	function()
{
	if(this.mArrFuncAuthentication == undefined)
		this.mArrFuncAuthentication = [];
	
	return(this.mArrFuncAuthentication);
};

IndexController.prototype.getCommonArea					=	function()
{
	if(this.mObjCommonArea == undefined)
		this.mObjCommonArea = new Panel(	{	id:			"pnlCommon"		}
										,	{	border:		"1px solid black"
											,	position:	"absolute"
											,	"z-index":	100
											});
	
	return(this.mObjCommonArea);
};

IndexController.prototype.getCurrentMenuItem			=	function()
{
	return(this.getMenu().getClickedItem());
};

IndexController.prototype.getHeader						=	function()
{
	if(this.mObjHeader == undefined)
		{
		var this_ = this;
		
		this.mObjHeader = new Header(this.getAppUser());
		
		this.mObjHeader.addUserListener(function(objUser)
		{
			this_.setAppUser(objUser);
		});
		}
	
	return(this.mObjHeader);
};

IndexController.prototype.getLoginPanel					=	function()
{
	if(this.mObjLogin == undefined)
		{
		var this_ = this;
		
		this.mObjLogin = new LoginPanel(400, 200, 100);
		
		this.mObjLogin
			.addAuthenticationListener(function(objApp)
			{
				this_.getHeader().setAppUser(objApp);
				
				this_.mObjLogin.reset();
				
				this_.showBackground();
			})
			.addSignupClickedListener(function()
			{
				this_.mObjLogin.reset();
				
				this_.showSignupPanel();
			});
		}
	
	return(this.mObjLogin);
};

IndexController.prototype.getMenu						=	function()
{
	if(this.mObjMenu == undefined)
		{
		var this_ = this;
		
		this.mObjMenu = Menu.loadMenus();
		this.mObjMenu
			.addClickListener(function(objMenuItem)
			{
				$.ajax(	{	contentType:	"application/json; charset=utf-8"
						,	data:			JSON.stringify(
											{	id:				objMenuItem.getId()
											,	name:			objMenuItem.getName()
											,	description:	objMenuItem.getDescription()
											,	orderNumber:	objMenuItem.getOrderNumber()
											,	module:			{	id:				objMenuItem.getModule().getId()
																,	name:			objMenuItem.getModule().getName()
																,	description:	objMenuItem.getModule().getDescription()
																,	URL:			objMenuItem.getModule().getURL()
																,	active:			objMenuItem.getModule().isActive()
																}
											})
						,	dataType:		"html"
						,	processData:	false
						,	success:		function(data)
							{
								this_.getCommonArea().html(data);
								
								Common.loadCSSFromExternalContent(this_.getCommonArea().html());
							}
						,	type:			"post"
						,	url:			"modules"
						});
			})
			.addSizeCallback(function(iLeft, iTop, iWidth, iHeight)
			{
				var iHeaderHeight = Common.extractDimensionFromString(this_.getHeader().getHeader().css("height"), "px", 0);
				var iHeaderTop = Common.extractDimensionFromString(this_.getHeader().getHeader().css("top"), "px", 0);
				var iHeaderBottom = iHeaderTop + iHeaderHeight;
				var iCommonTop = iHeaderBottom + 10;
				var iCommonHeight = $(window).height() - iCommonTop - 50;
				
				var iMenuRight = iLeft + iWidth;
				var iCommonLeft = iMenuRight + 10;
				var iCommonWidth = $(window).width() - iCommonLeft - 5; 
				
				this_.getCommonArea().css(	{	height:	iCommonHeight + "px"
											,	left:	iCommonLeft + "px"
											,	top:	iCommonTop + "px"
											,	width:	iCommonWidth + "px"
											});
			})
			.click(this.mObjMenu.getItems()[0]);
		
		this.mObjMenu.getJQuery().css(	{	left:	"0px"
										,	top:	Common.extractDimensionFromString(this.getHeader().getHeader().css("height"), "px", 0) + "px"
										});
		}
	
	return(this.mObjMenu);
};

IndexController.prototype.getNoSelectBackground			=	function()
{
	if(this.mObjNoSelect == undefined)
		this.mObjNoSelect = new Panel(		{	"class":	"noselect"	}
										,	{	height:		$(window).height() + "px"
											,	left:		"0px"
											,	position:	"absolute"
											,	top:		"0px"
											,	width:		$(window).width() + "px"
											,	"z-index":	50
											});
	
	return(this.mObjNoSelect);
};

IndexController.prototype.getSignupPanel				=	function()
{
	if(this.mObjSignup == undefined)
		{
		var this_ = this;
		
		this.mObjSignup = new SignupPanel(400, 500, 100);
		
		this
			.mObjSignup
				.addClosedListener(function()
				{
					this_.mObjSignup.reset();
					
					if(!this_.getAppUser().isAuthenticated())
						this_.showLoginPanel();
				});
		}
		
	return(this.mObjSignup);
};

IndexController.prototype.hideBackground				=	function()
{
	this.getMenu().getJQuery().remove();
	this.getCommonArea().remove();
};

IndexController.prototype.isInLogin						=	function()
{
	if(this.mbInLogin == undefined)
		this.mbInLogin = false;
	
	return(this.mbInLogin);
};

IndexController.prototype.isInSignup					=	function()
{
	if(this.mbInSignup == undefined)
		this.mbInSignup = false;
	
	return(this.mbInSignup);
};

IndexController.prototype.removeAuthenticationCallback	=	function(funcCallback)
{
	this.getAuthenticationCallbacks().push(funcCallback);
};

IndexController.prototype.setAppUser					=	function(objAppUser)
{
	this.mObjAppUser = Common.defaultIfUndefined(objAppUser, new AppUser());
	
	if(this.isInSignup())
		this.showSignupPanel();
	else if(!this.getAppUser().getLoginInfo().isAuthenticated())
		this.showLoginPanel();
	else
		this.showBackground();
};

IndexController.prototype.setInLogin					=	function(bInLogin)
{
	this.mbInLogin = Common.defaultIfUndefined(bInLogin, false);
};

IndexController.prototype.setInSignup					=	function(bInSignup)
{
	this.mbInSignup = Common.defaultIfUndefined(bInSignup, false);
};

IndexController.prototype.setupView						=	function()
{
	$("body")
		.css(	{	"font-size":	"16px"
				,	overflow:		"hidden"
				})
		.append(this.getHeader().getHeader())
		.append(this.getNoSelectBackground());
};

IndexController.prototype.showBackground				=	function()
{
	var this_ = this;
	
	if(this.isInLogin() || this.isInSignup())
		{
		this.setInLogin(false);
		this.setInSignup(false);
		}
	
	$("body")
		.append(this_.getMenu().getJQuery())
		.append(this_.getCommonArea());
};

IndexController.prototype.showLoginPanel				=	function()
{
	if(this.isInSignup())
		this.setInSignup(false);
	else
		this.hideBackground();
	
	this.setInLogin(true);
	
	$("body").append(this.getLoginPanel().getPanel());
};

IndexController.prototype.showSignupPanel				=	function()
{
	if(this.isInLogin())
		this.setInLogin(false);
	else
		this.hideBackground();
	
	this.setInSignup(true);
	
	$("body").append(this.getSignupPanel().getPanel());
};