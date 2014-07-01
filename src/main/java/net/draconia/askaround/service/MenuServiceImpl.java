package net.draconia.askaround.service;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.draconia.askaround.domain.Menu;
import net.draconia.askaround.domain.Module;

public class MenuServiceImpl implements MenuService
{
	private static Logger log = LoggerFactory.getLogger(AppUserServiceImpl.class);
	
	private DataSource mObjDataSource;
	
	public MenuServiceImpl(final DataSource objDataSource)
	{
		setDataSource(objDataSource);
	}
	
	protected Menu createMenuFromResult(final ResultSet objResults)
	{
		try
			{
			Menu objMenu = new Menu();
			Module objModule = new Module();
			
			objMenu.setId(objResults.getInt("menuId"));
			objMenu.setName(objResults.getString("menuName"));
			objMenu.setDescription(objResults.getString("menuDescription"));
			objMenu.setOrderNumber(objResults.getInt("menuOrderNumber"));
			
			objModule.setId(objResults.getInt("moduleId"));
			objModule.setName(objResults.getString("moduleName"));
			objModule.setDescription(objResults.getString("moduleDescription"));
			objModule.setURL(objResults.getString("ModuleURL"));
			objModule.setActive(objResults.getBoolean("ModuleIsActive"));
			
			objMenu.setModule(objModule);
			
			return(objMenu);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Menu());
			}
	}
	
	protected List<Menu> createMenusFromResults(final ResultSet objResults, List<Menu> lstMenus)
	{
		try
			{
			lstMenus.clear();
			
			while(objResults.next())
				lstMenus.add(createMenuFromResult(objResults));
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			}
		
		return(lstMenus);
	}
	
	public Menu findById(final int iId)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_menu_by_id(?)");
			ResultSet objResults;
			
			objStatement.setInt(1, iId);
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(createMenuFromResult(objResults));
			else
				{
				log.error("Procedure 'get_menu_by_id' returned no rows");
				
				return(new Menu());
				}
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_menu_by_id'", objException);
			
			return(new Menu());
			}
	}
	
	public List<Menu> findByName(final String sName)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_menu_by_name(?)");
			
			objStatement.setString(1, sName);
			
			return(createMenusFromResults(objStatement.executeQuery(), Collections.synchronizedList(new ArrayList<Menu>())));
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_menu_by_name'", objException);
			
			return(Collections.synchronizedList(new ArrayList<Menu>()));
			}
	}

	public List<Menu> getAllMenus()
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_all_menus()");
			
			return(createMenusFromResults(objStatement.executeQuery(), Collections.synchronizedList(new ArrayList<Menu>())));
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_all_menus'", objException);
			
			return(Collections.synchronizedList(new ArrayList<Menu>()));
			}
	}
	
	protected DataSource getDataSource()
	{
		return(mObjDataSource);
	}
	
	public void insert(final Menu objMenu)
	{ }
	
	public void remove(final Menu objMenu)
	{ }
	
	protected void setDataSource(final DataSource objDataSource)
	{
		mObjDataSource = objDataSource;
	}
}