package net.draconia.askaround.service;

import java.sql.SQLException;

import java.util.List;

import net.draconia.askaround.domain.Category;;

public interface CategoryService
{
	public List<Category> getAllCategories() throws SQLException;
	public Category getCategoryById(final int iId) throws SQLException;
	public Category insert(final Category objCategory);
}