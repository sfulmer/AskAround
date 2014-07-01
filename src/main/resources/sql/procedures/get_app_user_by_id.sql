-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

Drop procedure if exists get_app_user_by_id $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE get_app_user_by_id(in iAppUserId int)
BEGIN
	select	AppUserId
	,		FirstName
	,		LastName
	,		SignupDate
	,		LoginInfoId
	,		UserName
	,		Passcode
	,		OfficeId
	,		AddressId
	,		AddressLines
	,		ZipCodeId
	,		ZipCode
	,		CityId
	,		CityName
	,		StateId
	,		StateName
	,		StateAbbreviation
	,		CountryId
	,		CountryName
	,		CountryAbbreviation
	,		CompanyId
	,		CompanyName
	from	Users
	where	AppUserId				=	iAppUserId;
END