drop view if exists askaround.Users;

create view askaround.Users as
	select	AppUser.AppUserId						as	AppUserId
	,		AppUser.FirstName						as	FirstName
	,		AppUser.LastName						as	LastName
	,		AppUser.SignupDate						as	SignupDate
	,		LoginInfo.LoginInfoId					as	LoginInfoId
	,		LoginInfo.username 						as	UserName
	,		convert(AES_DECRYPT(UNHEX(LoginInfo.passcode), SHA2('Holy Fuck it''s Christmas!', 512)) using utf8) as passcode
	,		Office.OfficeId							as	OfficeId
	,		Office.AddressId						as	AddressId
	,		Office.AddressLines						as	AddressLines
	,		Office.ZipCodeId						as	ZipCodeId
	,		Office.ZipCode							as	ZipCode
	,		Office.CityId							as	CityId
	,		Office.CityName							as	CityName
	,		Office.StateId							as	StateId
	,		Office.StateName						as	StateName
	,		Office.StateAbbreviation				as	StateAbbreviation
	,		Office.CountryId						as	CountryId
	,		Office.CountryName						as	CountryName
	,		Office.CountryAbbreviation				as	CountryAbbreviation
	,		Office.CompanyId						as	CompanyId
	,		Office.CompanyName						as	CompanyName
	from	AppUser
		inner join LoginInfo
			on 	AppUser.LoginInfoId	=	LoginInfo.LoginInfoId
		left outer join Offices						as	Office
			on	AppUser.OfficeId	=	Office.OfficeId;