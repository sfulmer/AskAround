-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
delimiter $$

drop procedure if exists askaround.get_assets_by_id $$

create procedure askaround.get_assets_by_id (in	iId	integer)
begin
	select	Assets.AssetId
	,		Assets.ItemNumber
	,		Assets.Title
	,		Assets.Description
	,		Assets.PostedDate
	,		Assets.ExpirationDate
	,		Assets.RetailValue
	,		Assets.DepreciatedValue
	,		Assets.CategoryId
	,		Assets.CategoryName
	,		Assets.CategoryDescription
	,		Assets.ParentCategoryId
	,		Assets.ParentCategoryName
	,		Assets.ParentCategoryDescription
	,		Assets.AssetStatusId
	,		Assets.StatusText
	,		Assets.StatusDescription
	,		Assets.AssetImageId
	,		Assets.ImageName
	,		Assets.ImageDescription
	,		Assets.ImageData
	,		Assets.ImageWidth
	,		Assets.ImageHeight
	,		Assets.AppUserId
	,		Assets.FirstName
	,		Assets.LastName
	,		Assets.LoginInfoId
	,		Assets.UserName
	,		Assets.Passcode
	,		Assets.SignupDate
	,		Assets.OfficeId
	,		Assets.CompanyId
	,		Assets.CompanyName
	,		Assets.AddressId
	,		Assets.AddressLines
	,		Assets.CityId
	,		Assets.CityName
	,		Assets.StateId
	,		Assets.StateName
	,		Assets.StateAbbreviation
	,		Assets.ZipCodeId
	,		Assets.ZipCode
	,		Assets.CountryId
	,		Assets.CountryName
	,		Assets.CountryAbbreviation
	from	Assets
	where	Assets.AssetId	=	iId;
end