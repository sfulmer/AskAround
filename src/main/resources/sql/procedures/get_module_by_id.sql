-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_module_by_id $$

CREATE DEFINER=`sfulmer`@`localhost` PROCEDURE `get_module_by_id`(in iId integer)
BEGIN
	select	ModuleId
	,		ModuleName
	,		Description
	,		URL
	,		Active
	from	Module
	where	ModuleId			=	iId;
END