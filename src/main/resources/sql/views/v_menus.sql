drop view if exists askaround.Menus;

create view askaround.Menus as
	select	MenuId				as	MenuId
	,		Menu.menuName 		as	MenuName
	,		Menu.description 	as	MenuDescription
	,		Module.moduleId		as	ModuleId
	,		Module.moduleName	as	ModuleName
	,		Module.description	as	ModuleDescription
	,		Module.URL			as	ModuleURL
	,		Module.active		as	ModuleIsActive
	,		Menu.OrderNumber	as	MenuOrderNumber
	from	Menu
		inner join Module
			on	Menu.ModuleId	=	Module.ModuleId;