drop view if exists askaround.Offices;

create view askaround.Offices as
	select	OfficeId
	,		Address.AddressId
	,		Address.AddressLines
	,		Address.ZipCodeId
	,		Address.ZipCode
	,		Address.CityId
	,		Address.CityName
	,		Address.StateId
	,		Address.StateName
	,		Address.StateAbbreviation
	,		Address.CountryId
	,		Address.CountryName
	,		Address.CountryAbbreviation
	,		Company.CompanyId						as	CompanyId
	,		Company.CompanyName						as	CompanyName
	from	Office
		inner join Addresses			Address
			on	Office.AddressId	=	Address.AddressId
		inner join Company
			on	Office.CompanyId	=	Company.CompanyId;