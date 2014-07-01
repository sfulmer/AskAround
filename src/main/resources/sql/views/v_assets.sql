drop view if exists AskAround.Assets;

create view AskAround.Assets as
	select	Asset.AssetId
	,		Asset.ItemNumber
	,		Asset.Title
	,		Asset.Description
	,		Asset.PostedDate
	,		Asset.ExpirationDate
	,		Asset.RetailValue
	,		Asset.DepreciatedValue
	,		Category.CategoryId
	,		Category.CategoryName
	,		Category.CategoryDescription
	,		ParentCategoryId
	,		ParentCategoryName
	,		ParentCategoryDescription
	,		AssetStatus.AssetStatusId
	,		AssetStatus.StatusText
	,		AssetStatus.Description	as	StatusDescription
	,		AssetImage.AssetImageId
	,		AssetImage.ImageName
	,		AssetImage.Description	as	ImageDescription
	,		AssetImage.ImageData
	,		AssetImage.Width		as	ImageWidth
	,		AssetImage.Height		as	ImageHeight
	,		AppUser.AppUserId
	,		AppUser.FirstName
	,		AppUser.LastName
	,		AppUser.LoginInfoId
	,		AppUser.UserName
	,		AppUser.Passcode
	,		AppUser.SignupDate
	,		AppUser.OfficeId
	,		AppUser.CompanyId
	,		AppUser.CompanyName
	,		AppUser.AddressId
	,		AppUser.AddressLines
	,		AppUser.CityId
	,		AppUser.CityName
	,		AppUser.StateId
	,		AppUser.StateName
	,		AppUser.StateAbbreviation
	,		AppUser.ZipCodeId
	,		AppUser.ZipCode
	,		AppUser.CountryId
	,		AppUser.CountryName
	,		AppUser.CountryAbbreviation
	from	Asset
		inner join Categories			Category
			on 	Asset.CategoryId	=	Category.CategoryId
		inner join AssetImage
			on	Asset.ImageId		=	AssetImage.AssetImageId
		inner join AssetStatus
			on	Asset.StatusId		=	AssetStatus.AssetStatusId
		inner join Users				AppUser
			on	Asset.AppUserId		=	AppUser.AppUserId;