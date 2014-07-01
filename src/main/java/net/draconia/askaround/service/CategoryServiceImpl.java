package net.draconia.askaround.service;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.draconia.askaround.domain.Category;

public class CategoryServiceImpl implements CategoryService
{
	private static Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);
	
	private DataSource mObjDataSource;
	
	public CategoryServiceImpl(final DataSource objDataSource)
	{
		setDataSource(objDataSource);
	}
	
	protected Category createCategoryFromResult(final ResultSet objResults)
	{
		try
			{
			Category objCategory = new Category();
			
			objCategory.setId(objResults.getInt("CategoryId"));
			objCategory.setName(objResults.getString("Name"));
			objCategory.setDescription(objResults.getString("Description"));
			objCategory.setParent(createParentCategoryFromResult(objResults));
			
			return(objCategory);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Category());
			}
	}
	
	protected Category createParentCategoryFromResult(final ResultSet objResults)
	{
		try
			{
			Category objCategory = new Category();
			
			objCategory.setId(objResults.getInt("CategoryId"));
			objCategory.setName(objResults.getString("Name"));
			objCategory.setDescription(objResults.getString("Description"));
			
			return(objCategory);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Category());
			}
	}

	public List<Category> getAllCategories() throws SQLException
	{
		return null;
	}
	
	public Category getCategoryById(final int iId) throws SQLException
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_app_user_by_id(?)");
			ResultSet objResults;
			
			objStatement.setInt(1, iId);
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(createCategoryFromResult(objResults));
			else
				{
				log.error("Procedure 'get_category_by_id' returned no rows");
				
				return(new Category());
				}
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_category_by_id'", objException);
			
			return(new Category());
			}
	}
	
	protected DataSource getDataSource()
	{
		return(mObjDataSource);
	}
	
	public Category insert(final Category objCategory)
	{
		return(null);
	}
	
	protected void setDataSource(final DataSource objDataSource)
	{
		mObjDataSource = objDataSource;
	}
}