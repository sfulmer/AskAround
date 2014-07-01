-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

drop procedure if exists get_category_by_id $$

create definer=`sfulmer`@`localhost` procedure `get_category_by_id`(in iId integer)
begin
	select	CategoryId
	,		CategoryName
	,		CategoryDescription
	,		ParentCategoryId
	,		ParentCategoryName
	,		ParentCategoryDescription
	from	Categories
	where	Categories.CategoryId		=	iId;
end