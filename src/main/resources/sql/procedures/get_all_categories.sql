-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_all_categories $$

create definer=`sfulmer`@`localhost` procedure `get_all_categories`()
begin
	select	CategoryId
	,		CategoryName
	,		CategoryDescription
	,		ParentCategoryId
	,		ParentCategoryName
	,		ParentCategoryDescription
	from	Categories;
end