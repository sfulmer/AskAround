-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_app_user_by_name $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE get_app_user_by_name
(	in	sFirstName	varchar(50)
,	in	sLastName	varchar(50)
)
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
	where	FirstName				=	sFirstName
	and		LastName				=	sLastName;
END