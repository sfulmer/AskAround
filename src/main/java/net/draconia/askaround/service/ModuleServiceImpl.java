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

import net.draconia.askaround.domain.Module;

public class ModuleServiceImpl implements ModuleService
{
	private static Logger log = LoggerFactory.getLogger(AppUserServiceImpl.class);
	
	private DataSource mObjDataSource;
	
	public ModuleServiceImpl(final DataSource objDataSource)
	{
		setDataSource(objDataSource);
	}
	
	protected Module createModuleFromResult(final ResultSet objResults)
	{
		try
			{
			Module objModule = new Module();
			
			objModule.setId(objResults.getInt("moduleId"));
			objModule.setName(objResults.getString("moduleName"));
			objModule.setDescription(objResults.getString("description"));
			objModule.setURL(objResults.getString("URL"));
			objModule.setActive(objResults.getBoolean("active"));
			
			return(objModule);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Module());
			}
	}
	
	protected List<Module> createModulesFromResults(final ResultSet objResults, List<Module> lstModules)
	{
		try
			{
			lstModules.clear();
			
			while(objResults.next())
				lstModules.add(createModuleFromResult(objResults));
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			}
		
		return(lstModules);
	}
	
	public Module findById(final int iId)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_module_by_id(?)");
			ResultSet objResults;
			
			objStatement.setInt(1, iId);
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(createModuleFromResult(objResults));
			else
				{
				log.error("Procedure 'get_module_by_id' returned no rows");
				
				return(new Module());
				}
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_module_by_id'", objException);
			
			return(new Module());
			}
	}
	
	public List<Module> findByName(final String sName)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_module_by_name(?)");
			
			objStatement.setString(1, sName);
			
			return(createModulesFromResults(objStatement.executeQuery(), Collections.synchronizedList(new ArrayList<Module>())));
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_module_by_name'", objException);
			
			return(Collections.synchronizedList(new ArrayList<Module>()));
			}
	}

	public List<Module> getAllModules()
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_all_modules()");
			
			return(createModulesFromResults(objStatement.executeQuery(), Collections.synchronizedList(new ArrayList<Module>())));
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_all_modules'", objException);
			
			return(Collections.synchronizedList(new ArrayList<Module>()));
			}
	}
	
	protected DataSource getDataSource()
	{
		return(mObjDataSource);
	}
	
	public void insert(final Module objModule)
	{ }
	
	public void remove(final Module objModule)
	{ }
	
	protected void setDataSource(final DataSource objDataSource)
	{
		mObjDataSource = objDataSource;
	}
}