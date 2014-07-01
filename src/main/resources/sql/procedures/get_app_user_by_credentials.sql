-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_app_user_by_credentials$$

create definer=`sfulmer`@`localhost` procedure get_app_user_by_credentials
(	in	sUsername	varchar(100)
,	in	sPasscode	varchar(256)
)
begin
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
	where	Username	=	sUsername
	and		Passcode	=	HEX(AES_ENCRYPT(sPasscode, SHA2('Holy Fuck it''s Christmas!', 512)));
end$$