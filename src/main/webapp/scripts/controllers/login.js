function LoginController(txtUsername, txtPassword, btnLogin, lblSignUp)
{
	this.mObjAppUser			=	new AppUser();
	this.mFuncArrAuthenticated	=	undefined;
	this.mFuncArrFailure		=	undefined;
	this.mBtnLogin				=	btnLogin;
	this.mTxtPassword			=	txtPassword;
	this.mLblSignup				=	lblSignUp;
	this.mFuncArrSignupClicked	=	undefined;
	this.mTxtUserName			=	txtUsername;
}

LoginController.prototype.addAuthenticatedListener	=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getAuthenticatedListeners().push(funcListener);
	
	return(this);
};

LoginController.prototype.addFailureListener		=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getFailuredListeners().push(funcListener);
	
	return(this);
};

LoginController.prototype.addSignupClickedListener	=	function(funcListener)
{
	if(!(funcListener == undefined))
		this.getSignupClickedListeners().push(funcListener);
	
	return(this);
};

LoginController.prototype.getAuthenticatedUser		=	function()
{
	return(this.mObjAppUser);
};

LoginController.prototype.getAuthenticatedListeners	=	function()
{
	if(this.mFuncArrAuthenticated == undefined)
		this.mFuncArrAuthenticated = [];
	
	return(this.mFuncArrAuthenticated);
};

LoginController.prototype.getFailureListeners		=	function()
{
	if(this.mFuncArrFailure == undefined)
		this.mFuncArrFailure = [];
	
	return(this.mFuncArrFailure);
};

LoginController.prototype.getLoginButton			=	function()
{
	return(this.mBtnLogin);
};

LoginController.prototype.getPasswordField				=	function()
{
	return(this.mTxtPassword);
};

LoginController.prototype.getSignupClickedListeners	=	function()
{
	if(this.mFuncArrSignupClicked == undefined)
		this.mFuncArrSignupClicked = [];
	
	return(this.mFuncArrSignupClicked);
};

LoginController.prototype.getSignupLabel			=	function()
{
	return(this.mLblSignup);
};

LoginController.prototype.getUsernameField			=	function()
{
	return(this.mTxtUserName);
};

LoginController.prototype.initFocus					=	function()
{
	this.getUsernameField().focus();
	
	return(this);
};

LoginController.prototype.iterateAuthenticatedListeners	=	function(objArgument)
{
	for(var iLength = this.getAuthenticatedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getAuthenticatedListeners()[iLoop].call(this, objArgument);
};

LoginController.prototype.iterateFailureListeners	=	function(objArgument)
{
	for(var iLength = this.getFailureListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getFailureListeners()[iLoop].call(this, objArgument);
};

LoginController.prototype.iterateSignupClickedListeners	=	function(objArgument)
{
	for(var iLength = this.getSignupClickedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getSignupClickedListeners()[iLoop].call(this, objArgument);
};

LoginController.prototype.login						=	function()
{
	var this_ = this;
	
	$.ajax(	{	data:		{	username:	this.getUsernameField().val()
							,	password:	this.getPasswordField().val()
							}
			,	dataType:	"json"
			,	success:	function(response)
							{
								if(response.loginInfo.authenticated == true)
									this_.iterateAuthenticatedListeners(AppUser.copyFromJSON(response));
								else
									this_.iterateFailureListeners(AppUser.copyFromJSON(response));
							}
			,	type:		"post"
			,	url:		"api/log/in"
			});
	
	return(false);
};

LoginController.prototype.setAuthenticatedUser		=	function(objAppUser)
{
	if(objUser == undefined)
		this.mObjAppUser = new AppUser();
	else
		this.mObjAppUser = objAppUser;
	
	return(this);
};

LoginController.prototype.setLoginButton			=	function(btnLogin)
{
	this.mBtnLogin = btnLogin;
	
	return(this);
};

LoginController.prototype.setPasswordField			=	function(txtPassword)
{
	this.mTxtPassword = txtPassword;
	
	return(this);
};

LoginController.prototype.setupView					=	function()
{
	var btnLogin = this.getLoginButton();
	var lblSignup = this.getSignupLabel();
	
	btnLogin.click({this_: this}, function(e)
	{
		var this_ = e.data.this_;
		
		this_.login.call(this_);
	});
	
	lblSignup
		.click({this_: this}, function(e)
		{
			e.data.this_.iterateSignupClickedListeners();
		})
		.css(	{	cursor:	"pointer"	}	);
};

LoginController.prototype.setSignupLabel			=	function(lblSignup)
{
	this.mLblSignup = lblSignup;
	
	return(this);
};

LoginController.prototype.setUsernameField			=	function(txtUsername)
{
	this.mTxtUserName = txtUsername;
	
	return(this);
};