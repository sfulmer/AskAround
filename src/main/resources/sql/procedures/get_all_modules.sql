-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_all_modules $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `get_all_modules`()
BEGIN
	select	ModuleId
	,		ModuleName
	,		Description
	,		URL
	,		Active
	from	Module;
END