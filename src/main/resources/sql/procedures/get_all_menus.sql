-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_all_menus $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `get_all_menus`()
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
	from	Menus;
END$$