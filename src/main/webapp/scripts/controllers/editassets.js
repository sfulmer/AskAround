function EditAssetsController()
{
	this.mImgAsset												=	undefined;
	this.mBtnCancel												=	undefined;
	this.mArrFuncCancel											=	[];
	this.mCboCategory											=	undefined;
	this.mCboSubCategory										=	undefined;
	this.mTxtDepreciatedValue									=	undefined;
	this.mTxtDescription										=	undefined;
	this.mBtnFileUpload											=	undefined;
	this.mObjFileUpload											=	undefined;
	this.mTxtImageHeight										=	undefined;
	this.mTxtImageWidth											=	undefined;
	this.mTxtItemNumber											=	undefined;
	this.mObjModel												=	undefined;
	this.mBtnOk													=	undefined;
	this.mArrFuncOk												=	[];
	this.mTxtRetailValue										=	undefined;
	this.mCboStatus												=	undefined;
	this.mObjTableBody											=	undefined;
	this.mTxtTitle												=	undefined;
}

EditAssetsController.prototype.addCancelledListener				=	function(funcListener)
{
	this.getCancelledListeners().push(funcListener);
	
	return(this);
};

EditAssetsController.prototype.addOkListener					=	function(funcListener)
{
	this.getOkListeners().push(funcListener);
	
	return(this);
};

EditAssetsController.prototype.getAssetImage					=	function()
{
	return(this.mImgAsset);
};

EditAssetsController.prototype.getCancelButton					=	function()
{
	return(this.mBtnCancel);
};

EditAssetsController.prototype.getCancelledListeners			=	function()
{
	if(this.mArrFuncCancel == undefined)
		this.mArrFuncCancel 									=	[];
	
	return(this.mArrFuncCancel);
};

EditAssetsController.prototype.getCategoryDropDown				=	function()
{
	return(this.mCboCategory);
};

EditAssetsController.prototype.getDepreciatedValueInput			=	function()
{
	return(this.mTxtDepreciatedValue);
};

EditAssetsController.prototype.getDescriptionInput				=	function()
{
	return(this.mTxtDescription);
};

EditAssetsController.prototype.getFileUploadButton				=	function()
{
	return(this.mBtnFileUpload);
};

EditAssetsController.prototype.getFileUploadControl				=	function()
{
	return(this.mObjFileUpload);
};

EditAssetsController.prototype.getImageHeightInput				=	function()
{
	return(this.mTxtImageHeight);
};

EditAssetsController.prototype.getImageWidthInput				=	function()
{
	return(this.mTxtImageWidth);
};

EditAssetsController.prototype.getItemNumberInput				=	function()
{
	return(this.mTxtItemNumber);
};

EditAssetsController.prototype.getModel							=	function()
{
	if(this.mObjModel == undefined)
		{
		this.mObjModel = new Asset();
		
		this.mObjModel.addObserver((function(this_)
			{
				return(function()
				{
					this_.updateView();
				});
			})(this));
		}
	
	return(this.mObjModel);
};

EditAssetsController.prototype.getOkButton						=	function()
{
	return(this.mBtnOk);
};

EditAssetsController.prototype.getOkListeners					=	function()
{
	if(this.mArrFuncOk == undefined)
		this.mArrFuncOk											=	[];
	
	return(this.mArrFuncOk);
};

EditAssetsController.prototype.getRetailValueInput				=	function()
{
	return(this.mTxtRetailValue);
};

EditAssetsController.prototype.getStatusDropDown				=	function()
{
	return(this.mCboStatus);
};

EditAssetsController.prototype.getSubCategoryDropDown			=	function()
{
	return(this.mCboSubCategory);
};

EditAssetsController.prototype.getTitleInput					=	function()
{
	return(this.mTxtTitle);
};

EditAssetsController.prototype.iterateCancelledListeners		=	function(objArgument)
{
	var arrListeners = this.getCancelledListeners();
	
	for(var iLength = arrListeners.length, iLoop = 0; iLoop < iLength; iLoop++)
		arrListeners[iLoop].call(this, objArgument);
};

EditAssetsController.prototype.iterateOkListeners				=	function(objArgument)
{
	var arrListeners = this.getOkListeners();
	
	for(var iLength = arrListeners.length, iLoop = 0; iLoop < iLength; iLoop++)
		arrListeners[iLoop].call(this, objArgument);
};

EditAssetsController.prototype.loadModel						=	function(iAssetId)
{
	var objThis = this;
	
	$.ajax(	{	dataType:	"json"
			,	success:	function(data)
							{
								debugger;
								
								objThis.setModel(Asset.copyFromJSON(data, objThis.getModel()));
							}
			,	type:		"get"
			,	url:		"assets/asset/" + iAssetId
			});
};

EditAssetsController.prototype.setAssetImage					=	function(imgAsset)
{
	this.mImgAsset												=	$(imgAsset);
	
	return(this);
};

EditAssetsController.prototype.setCancelButton					=	function(btnCancel)
{
	this.mBtnCancel												=	$(btnCancel);
	
	return(this);
};

EditAssetsController.prototype.setCategoryDropDown				=	function(cboCategory)
{
	this.mCboCategory											=	$(cboCategory);
	
	return(this);
};

EditAssetsController.prototype.setDepreciatedValueInput			=	function(txtDepreciatedValueCents)
{
	this.mTxtDepreciatedValue									=	$(txtDepreciatedValue);
	
	return(this);
};

EditAssetsController.prototype.setDescriptionInput				=	function(txtDescription)
{
	this.mTxtDescription										=	$(txtDescription);
	
	return(this);
};

EditAssetsController.prototype.setFileUploadButton				=	function(btnFileUpload)
{
	this.mBtnFileUpload											=	$(btnFileUpload);
	
	return(this);
};

EditAssetsController.prototype.setFileUploadControl				=	function(objFileUpload)
{
	this.mObjFileUpload											=	$(objFileUpload);
	
	return(this);
};

EditAssetsController.prototype.setImageHeightInput				=	function(txtImageHeight)
{
	this.mTxtImageHeight										=	$(txtImageHeight);
	
	return(this);
};

EditAssetsController.prototype.setImageWidthInput				=	function(txtImageWidth)
{
	this.mTxtImageWidth											=	$(txtImageWidth);
	
	return(this);
};

EditAssetsController.prototype.setItemNumberInput				=	function(txtItemNumber)
{
	this.mTxtItemNumber											=	$(txtItemNumber);
	
	return(this);
};

EditAssetsController.prototype.setModel							=	function(objModel)
{
	if(objModel == undefined)
		this.mObjModel = new Asset();
	else
		this.mObjModel = objModel;
	
	this.mObjModel.addObserver((function(this_)
	{
		return(function()
		{
			this_.updateView();
		});
	})(this));
	
	return(this);
};

EditAssetsController.prototype.setOkButton						=	function(btnOk)
{
	this.mBtnOk													=	$(btnOk);
	
	return(this);
};

EditAssetsController.prototype.setRetailValueInput				=	function(txtRetailValue)
{
	this.mTxtRetailValue										=	$(txtRetailValue);
	
	return(this);
};

EditAssetsController.prototype.setStatusDropDown				=	function(cboStatus)
{
	this.mCboStatus												=	$(cboStatus);
	
	return(this);
};

EditAssetsController.prototype.setSubCategoryDropDown			=	function(cboSubCategory)
{
	this.mCboSubCategory										=	$(cboSubCategory);
	
	return(this);
};

EditAssetsController.prototype.setTitleInput					=	function(txtTitle)
{
	this.mTxtTitle												=	$(txtTitle);
	
	return(this);
};

EditAssetsController.prototype.setupView						=	function()
{
	$("input.currency")
		.change(function()
		{
			if($(this).val().match(/^\$?(\-|\+)?((([1-9]\d{2})|([1-9]\d)|([1-9])),?)(((\d{3}),?)*).(\d{2})$/g) != null)
				{
				var arrParts = $(this).val().match(/((([1-9]\d{2})|([1-9]\d)|([1-9])|(\d{3})))/g);
				var sNewVal = arrParts[0];
				
				for(iLength = arrParts.length - 1, iLoop = 1; iLoop < iLength; iLoop++)
					sNewVal = sNewVal + "," + arrParts[iLoop];
				
				sNewVal = sNewVal + "." + arrParts[arrParts.length - 1];
				
				$(this).val(sNewVal);
				$(this).attr("oldvalue", "");
				}
			else
				$(this).val($(this).attr("oldvalue"));
		})
		.focus(function()
		{
			$(this).attr("oldvalue", $(this).val());
		});
				
	this.getImageHeightInput()
		.change((function(this_)
		{
			return(function()
			{
				this_.getModel().getImage().setHeight(this_.getImageHeightInput().val());
			});
		})(this));
	
	this.getImageWidthInput()
		.click((function(this_)
		{
			return(function()
			{
				this_.getModel().getImage().setWidth(this_.getImageWidthInput().val());
			});
		})(this));
	
	this.getFileUploadButton()
		.click((function(this_)
		{
			return(function()
			{
				this_.getFileUploadControl().click();
			});
		})(this));
	
	this.getFileUploadControl()
		.change((function(this_)
		{
			return(function(objEvent)
			{
				this_.uploadFile(objEvent.target.files);
			});
		})(this));
	
	/*this.getOkButton()
		.click((function(this_)
		{
			return(function()
				{
					alert("posted");
				});
		})(this));*/
	
	return(this);
};

EditAssetsController.prototype.updateModel						=	function(objJSON)
{
	this.mObjModel = Asset.copyFromJSON(objJSON, this.mObjModel);
};

EditAssetsController.prototype.updateView						=	function()
{
	var objAsset 	=	this.getModel();
	
	if(objAsset.getDescription() != this.getDescriptionInput().val())
		this.getDescriptionInput().val(objAsset.getDescription());
	if(objAsset.getItemNumber() != this.getItemNumberInput().val())
		this.getItemNumberInput().val(objAsset.getItemNumber());
	if(objAsset.getTitle() != this.getTitleInput().val())
		this.getTitleInput().val(objAsset.getTitle());
	
	{
	var objCategory = objAsset.getCategory(), objParentCategory = objCategory.getParent();
	
	if(!(objParentCategory == undefined))
		this.getCategoryDropDown().find("option[id='" + objParentCategory.getId() + "']").attr("selected", "selected");
	if(!(objCategory == undefined))
		this.getSubCategoryDropDown().find("option[id='" + objCategory.getId() + "']").attr("selected", "selected");
	}
	
	{
	var objStatus = objAsset.getStatus();
	
	if(!(objStatus == undefined))
		this.getStatus().find("option[id='" + objStatus.getId() + "']").attr("selected", "selected");
	}
	
	{
	var iDepreciatedValue = objAsset.getDepreciatedValue();
	var iRetailValue = objAsset.getDepreciatedValue();
	
	if(iDepreciatedValue != this.getDepreciatedValueInput().val())
		this.getDepreciatedValueInput().val(iDepreciatedValue);
	if(iRetailValue != this.getRetailValueInput().val())
		this.getRetailValueInput().val(iRetailValue);
	}
	
	{
	var objAssetImage	=	objAsset.getImage();
	var objImage		=	this.getAssetImage();
	
	if(objAssetImage.getHeight() != this.getImageHeightInput().val())
		{
		this.getImageHeightInput().val(objAssetImage.getHeight());
		objImage.attr("height", objAssetImage.getHeight());
		}
	if(objAssetImage.getWidth() != this.getImageWidthInput().val())
		{
		this.getImageWidthInput().val(objAssetImage.getWidth());
		objImage.attr("width", objAssetImage.getWidth());
		}
	
	if(("data:image/png;base64," + objAssetImage.getData()) != objImage.attr("src"))
		objImage.attr("src", "data:image/png;base64," + objAssetImage.getData());
	}
};

EditAssetsController.prototype.uploadFile						=	function(arrFiles)
{
	var data = new FormData();
	
	debugger;
	
	$.each(arrFiles, function(key, value)
	{
		data.append(key, value);
	});
	
	$.ajax(	{	cache:			false
			,	contentType:	false
			,	data:			data
			,	dataType:		"json"
			,	processData:	false
			,	success:		(function(objThis)
								{
									return(function(data)
									{
										objThis.updateModel(data);
									});
								})(this)
			,	type:			"post"
			,	url:			"assets/asset/upload/image"
			});
};