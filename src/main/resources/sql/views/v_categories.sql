drop view if exists askaround.Categories;

create view askaround.Categories as
	select		Category.CategoryId			as	CategoryId
		,		Category.CategoryName		as	CategoryName
		,		Category.Description		as	CategoryDescription
		,		Parent.CategoryId			as	ParentCategoryId
		,		Parent.CategoryName			as	ParentCategoryName
		,		Parent.Description			as	ParentCategoryDescription
		from	Category
			left outer join Category Parent
				on Category.parentCategoryId = Parent.CategoryId;