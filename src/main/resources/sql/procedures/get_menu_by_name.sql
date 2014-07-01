-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_menu_by_name $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `get_menu_by_name`(in sName varchar(100))
BEGIN
	select	MenuId
	,		MenuName
	,		MenuDescription
	,		ModuleId
	,		ModuleName
	,		ModuleDescription
	,		ModuleURL
	,		ModuleIsActive
	,		MenuOrderNumber
	from	Menus
	where	MenuName			=	sName;
END