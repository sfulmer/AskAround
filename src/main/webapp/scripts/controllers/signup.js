function SignupController(txtFirstName, txtLastName, txtUsername, txtPassword1, txtPassword2, btnSignup, btnCancel, objUser)
{
	this.mBtnCancel			=	btnCancel;
	this.mFuncArrCancelled	=	undefined;
	this.mTxtFirstName		=	txtFirstName;
	this.mLblId				=	undefined;
	this.mTxtLastName		=	txtLastName;
	this.mTxtPassword1		=	txtPassword1;
	this.mTxtPassword2		=	txtPassword2;
	this.mBtnSignup			=	btnSignup;
	this.mDivMain			=	undefined;
	this.mFuncArrUserAdded	=	undefined;
	this.mTxtUserName		=	txtUsername;
	this.mObjUser			=	Common.defaultIfUndefined(objUser, new AppUser());
}

SignupController.prototype.addCancelledListener			=	function(funcCancelled)
{
	if(funcCancelled != undefined)
		this.getCancelledListeners().push(funcCancelled);
	
	return(this);
};

SignupController.prototype.addUserAddedListener			=	function(funcUserAdded)
{
	if(funcUserAdded == undefined)
		this.mFuncArrUserAdded().push(funcUserAdded);
	
	return(this);
};

SignupController.prototype.getAppUser					=	function()
{
	return(this.mObjUser);
};

SignupController.prototype.getCancelButton				=	function()
{
	return(this.mBtnCancel);
};

SignupController.prototype.getCancelledListeners		=	function()
{
	if(this.mFuncArrCancelled == undefined)
		this.mFuncArrCancelled = [];
	
	return(this.mFuncArrCancelled);
};

SignupController.prototype.getFirstNameField			=	function()
{
	return(this.mTxtFirstName);
};

SignupController.prototype.getIdLabel					=	function()
{
	return(this.mLblId);
};

SignupController.prototype.getLastNameField				=	function()
{
	return(this.mTxtLastName);
};

SignupController.prototype.getPassword1Field			=	function()
{
	return(this.mTxtPassword1);
};

SignupController.prototype.getPassword2Field			=	function()
{
	return(this.mTxtPassword2);
};

SignupController.prototype.getRequiredFields			=	function()
{
	return(this.getMainLayer().find(".required"));
};

SignupController.prototype.getSignupButton				=	function()
{
	return(this.mBtnSignup);
};

SignupController.prototype.getMainLayer					=	function()
{
	return(this.mDivMain);
};

SignupController.prototype.getUserAddedListeners		=	function()
{
	if(this.mFuncArrUserAdded == undefined)
		this.mFuncArrUserAdded = [];
	
	return(this.mFuncArrUserAdded);
};

SignupController.prototype.getUsernameField				=	function()
{
	return(this.mTxtUserName);
};

SignupController.prototype.iterateCancelledListeners	=	function(objArgument)
{
	for(var iLength = this.getCancelledListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getCancelledListeners()[iLoop].call(this, objArgument);
};

SignupController.prototype.iterateUserAddedLIsteners	=	function(objArgument)
{
	for(var iLength = this.getUserAddedListeners().length, iLoop = 0; iLoop < iLength; iLoop++)
		this.getUserAddedListeners()[iLoop].call(this, objArgument);
};

SignupController.prototype.setCancelButton				=	function(btnCancel)
{
	this.mBtnCancel = btnCancel;
	
	return(this);
};

SignupController.prototype.setFirstNameField			=	function(txtFirstName)
{
	this.mTxtFirstName = txtFirstName;
	
	return(this);
};

SignupController.prototype.setIdLabel					=	function(lblId)
{
	this.mLblId = lblId;
	
	return(this);
};

SignupController.prototype.setLastNameField				=	function(txtLastName)
{
	this.mTxtLastName = txtLastName;
	
	return(this);
};

SignupController.prototype.setPassword1Field			=	function(txtPassword)
{
	this.mTxtPassword1 = txtPassword;
	
	return(this);
};

SignupController.prototype.setPassword2Field			=	function(txtPassword)
{
	this.mTxtPassword2 = txtPassword;
	
	return(this);
};

SignupController.prototype.setSignupButton				=	function(btnSignup)
{
	this.mBtnSignup = btnSignup;
	
	return(this);
};

SignupController.prototype.setMainLayer					=	function(divMain)
{
	this.mDivMain 	= divMain;
	
	return(this);
};

SignupController.prototype.setUsernameField				=	function(txtUserName)
{
	this.mTxtUserName = txtUserName;
	
	return(this);
};

SignupController.prototype.setAppUser					=	function(objUser)
{
	if(objUser == undefined)
		this.mObjUser = new AppUser();
	else
		this.mObjUser = objUser;
};

SignupController.prototype.setupView					=	function()
{
	this.getCancelButton()
		.click({this_: this}, function(e)
		{
			e.data.this_.iterateCancelledListeners();
		});
	
	this.getRequiredFields().keyup({this_: this}, function(e)
	{
		setTimeout(function()
		{
			var bValidated = e.data.this_.validate();
			
			if(bValidated)
				e.data.this_.getSignupButton().prop("disabled", false);
			
			if(e.keyCode == 27)
				e.data.this_.getCancelButton().click();
		}, 1);
	});
	
	this.getSignupButton()
		.click({this_: this}, function(e)
		{
			if(e.data.this_.validate())
				e.data.this_.signup();
		})
		.prop("disabled", !(this.validate()));
	
	this.getFirstNameField().focus();
};

SignupController.prototype.signup						=	function()
{
	var this_ = this;
	
	$.ajax(	{	data:		{	firstname:	this.getFirstNameField().val()
							,	lastname:	this.getLastNameField().val()
							,	password:	this.getPassword1Field().val()
							,	username:	this.getUsernameField().val()
							}
			,	dataType:	"json"
			,	success:	function(response)
							{
								debugger;
								
								this_.getIdLabel().html(response.apppersonid);
								
								for(var iLength = this_.getUserAddedListeners().length(), iLoop = 0; iLoop < iLength; iLoop++)
									this_.getUserAddedListeners()[iLoop].call(this_, response);
							}
			,	type:		"post"
			,	url:		"api/signup/add"
			});
	
	return(false);
};

SignupController.prototype.validate						=	function()
{
	var this_ = this;
	var bValidated = true;
	
	this.getRequiredFields().each(function()
	{
		if(bValidated)
			{
			objSource = $(this);
			
			if(objSource.is(":visible"))
				{
				bValidated = (objSource.val().length > 0);
			
				if(objSource.hasClass("matching"))
					this_.getMainLayer().find(".matching").each(function()
					{
						if(bValidated)
							bValidated = (objSource.val() == $(this).val());
					});
				}
			}
	});
	
	return(bValidated);
};