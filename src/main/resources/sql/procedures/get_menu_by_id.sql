-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_menu_by_id $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `get_menu_by_id`(in iId integer)
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
	where	Menus.MenuId		=	iId;
END