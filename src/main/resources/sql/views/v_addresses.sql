drop view if exists askaround.Addresses;

create view askaround.Addresses as
	select	Address.addressId
	,		get_AddressLines(Address.AddressId)		as 	AddressLines
	,		ZipCode.ZipCodeId						as	ZipCodeId
	,		ZipCode.ZipCode							as	ZipCode
	,		City.CityId								as	CityId
	,		City.CityName							as	CityName
	,		State.StateId							as	StateId
	,		State.StateName							as	StateName
	,		State.Abbreviation						as	StateAbbreviation
	,		Country.CountryId						as	CountryId
	,		Country.CountryName						as	CountryName
	,		Country.Abbreviation					as	CountryAbbreviation
	from	Address
		inner join ZipCode
			on	Address.ZipCodeId	=	ZipCode.ZipCodeId
		inner join City
			on	ZipCode.CityId		=	City.CityId
		inner join State
			on	City.StateId		=	State.StateId
		inner join Country
			on	State.CountryId		=	Country.CountryId;