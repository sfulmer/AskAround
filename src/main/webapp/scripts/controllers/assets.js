function AssetsListModel()
{
	this.mbChanged									=	undefined;
	this.mArrObjAssets								=	[];
	this.mArrObjObservers							=	[];
	this.miPageNumber								=	undefined;
	this.miRecsPerPage								=	undefined;
	this.miTotalRecQty								=	undefined;
}

AssetsListModel.prototype.addObserver				=	function(objObserver)
{
	if(objObserver != undefined)
		{
		if(this.mArrObjObservers == undefined)
			this.mArrObjObservers = [];
		
		this.mArrObjObservers.push(objObserver);
		}
	
	return(this);
};

AssetsListModel.prototype.addAsset					=	function(objAsset)
{
	this.getAssets().push(objAsset);
	
	this.notifyObservers();
	
	return(this);
};

AssetsListModel.prototype.clearAssets				=	function()
{
	this.mArrObjAssets								=	[];
	
	this.notifyObservers();
	
	return(this);
};

AssetsListModel.prototype.getAssets					=	function()
{
	if(this.mArrObjAssets == undefined)
		this.mArrObjAssets = [];
	
	return(this.mArrObjAssets);
};

AssetsListModel.prototype.getMaxPageNumber			=	function()
{
	return(Math.ceil(this.getTotalRecordQuantity() / this.getRecordsPerPage()));
};

AssetsListModel.prototype.getPageNumber				=	function()
{
	if(this.miPageNumber == undefined)
		this.miPageNumber = 1;
	
	return(this.miPageNumber);
};

AssetsListModel.prototype.getRecordsPerPage			=	function()
{
	if(this.miRecsPerPage == undefined)
		this.miRecsPerPage = 10;
	
	return(this.miRecsPerPage);
};

AssetsListModel.prototype.getTotalRecordQuantity	=	function()
{
	if(this.miTotalRecQty == undefined)
		this.miTotalRecQty = this.getAssets().length;
	
	return(this.miTotalRecQty);
};

AssetsListModel.prototype.hasChanged				=	function()
{
	if(this.mbChanged == undefined)
		this.mbChanged = false;
	
	return(this.mbChanged);
};

AssetsListModel.prototype.notifyObservers			=	function(objArgument)
{
	this.mbChanged = true;
	
	for(var iLength = this.mArrObjObservers.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.mArrObjObservers[iLoop].call(this, objArgument);
	
	this.mbChanged = false;
};

AssetsListModel.prototype.setAssets					=	function(arrObjAssets)
{
	if(arrObjAssets == undefined)
		this.mArrObjAssets = [];
	else
		this.mArrObjAssets = arrObjAssets;
	
	this.notifyObservers();
	
	return(this);
};

AssetsListModel.prototype.setPageNumber				=	function(iPageNumber)
{
	if(iPageNumber == undefined)
		this.miPageNumber = 1;
	else
		this.miPageNumber = iPageNumber;
	
	this.notifyObservers();
	
	return(this);
};

AssetsListModel.prototype.setRecordsPerPage			=	function(iRecsPerPage)
{
	if(iRecsPerPage == undefined)
		this.miRecsPerPage = 10;
	else
		this.miRecsPerPage = iRecsPerPage;
	
	this.notifyObservers();
	
	return(this);
};

function AssetsController()
{
	this.mObjModel									=	undefined;
	this.mBtnDelete									=	undefined;
	this.mPnlEdit									=	undefined;
	this.mBtnFirst									=	undefined;
	this.mBtnLast									=	undefined;
	this.mBtnNext									=	undefined;
	this.mTxtPageNumber								=	undefined;
	this.mTxtPageSize								=	undefined;
	this.mBtnPostAsset								=	undefined;
	this.mBtnPrevious								=	undefined;
	this.mObjTableBody								=	undefined;
}

AssetsController.prototype.addAssetRow				=	function(objAsset)
{
	this.getTableBody()
		.append(
			$("<tr></tr>")
				.append($("<td></td>").append(this.createAssetSelection(objAsset.getId())))
				.append($("<td></td>").append(this.createImage(objAsset.getImage())))
				.append($("<td></td>").html(objAsset.getPostedDate()))
				.append($("<td></td>").html(objAsset.getItemNumber()))
				.append($("<td></td>").html(objAsset.getStatus().getStatus()))
				.append($("<td></td>").html(objAsset.getTitle()))
				.append($("<td></td>").html(objAsset.getCategory().getName()))
				.append($("<td></td>").html(objAsset.getRetailValue()))
				.append($("<td></td>").html(objAsset.getDepreciatedValue())));
};

AssetsController.prototype.clearAssetRows			=	function()
{
	this.getTableBody().find("tr").remove();
};

AssetsController.prototype.createAssetSelection		=	function(iId)
{
	return(
		$("<input />",	{	id:		"chk_" + iId
						,	title:	"selects Asset #" + iId
						,	type:	"checkbox"
						}));
};

AssetsController.prototype.createImage				=	function(objImage)
{
	return(
		$("<img />",	{	height:	objImage.getHeight()
						,	src:	"data:image/png;base64," + objImage.getData()
						,	title:	objImage.getDescription()
						,	width:	objImage.getWidth()
						}));
};

AssetsController.prototype.getDeleteButton			=	function()
{
	return(this.mBtnDelete);
};

AssetsController.prototype.getEditPanel				=	function()
{
	if(this.mPnlEdit == undefined)
		this.mPnlEdit = new EditAssetPanel(400, 500, 100);
	
	return(this.mPnlEdit);
};

AssetsController.prototype.getFirstButton			=	function()
{
	return(this.mBtnFirst);
};

AssetsController.prototype.getLastButton			=	function()
{
	return(this.mBtnLast);
};

AssetsController.prototype.getModel					=	function()
{
	if(this.mObjModel == undefined)
		{
		this.mObjModel	=	new AssetsListModel();
		
		this.mObjModel.addObserver((function(objThis)
		{
			return(function()
			{
				objThis.updateView();
			});
		})(this));
		}
	
	return(this.mObjModel);
};

AssetsController.prototype.getNextButton			=	function()
{
	return(this.mBtnNext);
};

AssetsController.prototype.getPageNumber			=	function()
{
	return(this.mTxtPageNumber);
};

AssetsController.prototype.getPageSize				=	function()
{
	return(this.mTxtPageSize);
};

AssetsController.prototype.getPostAssetButton		=	function()
{
	return(this.mBtnPostAsset);
};

AssetsController.prototype.getPreviousButton		=	function()
{
	return(this.mBtnPrevious);
};

AssetsController.prototype.getTableBody				=	function()
{
	return(this.mObjTableBody);
};

AssetsController.prototype.loadAssets				=	function()
{
	var this_ = this;
	
	$.ajax(	{	data:		{	pageNumber:		this.getModel().getPageNumber()
							,	recordsPerPage:	this.getModel().getRecordsPerPage()
							}
			,	dataType:	"json"
			,	success:	function(data)
							{
								this_.getModel().clearAssets();
								
								for(var iLength = data.length, iLoop = 0; iLoop < iLength; iLoop++)
									this_.getModel().addAsset(Asset.copyFromJSON(data[iLoop]));
							}
			,	type:		"get"
			,	url:		"assets"
			});
};

AssetsController.prototype.setDeleteButton			=	function(btnDelete)
{
	this.mBtnDelete									=	btnDelete;
	
	return(this);
};

AssetsController.prototype.setFirstButton			=	function(btnFirst)
{
	this.mBtnFirst									=	btnFirst;
	
	return(this);
};

AssetsController.prototype.setLastButton			=	function(btnLast)
{
	this.mBtnLast 									=	btnLast;
	
	return(this);
};

AssetsController.prototype.setNextButton			=	function(btnNext)
{
	this.mBtnNext 									=	btnNext;
	
	return(this);
};

AssetsController.prototype.setPageNumber			=	function(txtPageNumber)
{
	this.mTxtPageNumber 							=	txtPageNumber;
	
	return(this);
};

AssetsController.prototype.setPageSize				=	function(txtPageSize)
{
	this.mTxtPageSize								=	txtPageSize;
	
	return(this);
};

AssetsController.prototype.setPostAssetButton		=	function(btnPostAssets)
{
	this.mBtnPostAsset 								=	btnPostAssets;
	
	return(this);
};

AssetsController.prototype.setPreviousButton		=	function(btnPreious)
{
	this.mBtnPrevious = btnPreious;
	
	return(this);
};

AssetsController.prototype.setTableBody				=	function(objTableBody)
{
	this.mObjTableBody								=	objTableBody;
	
	return(this);
};

AssetsController.prototype.setupView				=	function()
{
	this.getDeleteButton()
		.attr("disabled", "true")
		.click(function()
		{
			alert("Delete");
		});
	
	this.getFirstButton()
		.attr("disabled", "true")
		.click(function()
		{
			alert("First");
		});
	
	this.getLastButton()
		.attr("disabled", (this.getModel().getMaxPageNumber() <= this.getModel().getPageNumber()) ? "true" : "false")
		.click(function()
		{
			alert("Last");
		});
	
	this.getNextButton()
		.attr("disabled", (this.getModel().getMaxPageNumber() <= this.getModel().getPageNumber()) ? "true" : "false")
		.click(function()
		{
			alert("Next");
		});
	
	this.getPostAssetButton()
		.click((function(this_)
		{
			return(function()
				{
					this_.showPostAssetPanel();
				});
		})(this));
	
	this.getPreviousButton()
		.attr("disabled", "false")
		.click(function()
		{
			alert("Previous");
		});
	
	this.loadAssets();
	
	return(this);
};

AssetsController.prototype.showPostAssetPanel		=	function()
{
	$("body").append(this.getEditPanel().setAssetId(0).getPanel());
};

AssetsController.prototype.updateView				=	function()
{
	var arrAssets = this.getModel().getAssets();
	
	this.clearAssetRows();
	
	for(var iLength = arrAssets.length, iLoop = 0; iLoop < iLength; iLoop++)
		this.addAssetRow(arrAssets[iLoop]);
};