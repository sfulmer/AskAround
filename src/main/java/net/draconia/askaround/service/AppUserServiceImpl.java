package net.draconia.askaround.service;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.sql.DataSource;

import net.draconia.askaround.domain.AppUser;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AppUserServiceImpl implements AppUserService
{
	private static Logger log = LoggerFactory.getLogger(AppUserServiceImpl.class);
	
	private DataSource mObjDataSource;
	private DomainDAOBuilder mObjDomainDAOBuilder;
	
	public AppUserServiceImpl(final DataSource objDataSource, final DomainDAOBuilder objDAOBuilder)
	{
		setDataSource(objDataSource);
		setDAOBuilder(objDAOBuilder);
	}
	
	protected DataSource getDataSource()
	{
		return(mObjDataSource);
	}
	
	protected DomainDAOBuilder getDAOBuilder()
	{
		return(mObjDomainDAOBuilder);
	}
	
	public AppUser getUserByCredentials(final String sUserName, final String sPasscode)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_app_user_by_credentials(?, ?)");
			ResultSet objResults;
			
			objStatement.setString(1, sUserName);
			objStatement.setString(2, sPasscode);
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(getDAOBuilder().createUserFromResult(objResults));
			else
				{
				log.error("Procedure 'get_app_user_by_credentials' returned no rows");
				
				return(new AppUser());
				}
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_app_user_by_credentials'", objException);
			
			return(new AppUser());
			}
	}
	
	public AppUser getUserById(final int iId)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_app_user_by_id(?)");
			ResultSet objResults;
			
			objStatement.setInt(1, iId);
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(getDAOBuilder().createUserFromResult(objResults));
			else
				{
				log.error("Procedure 'get_app_user_by_id' returned no rows");
				
				return(new AppUser());
				}
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_app_user_by_id'", objException);
			
			return(new AppUser());
			}
	}
	
	public List<AppUser> getUsersByName(final String sFirstName, final String sLastName)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_app_user_by_name(?, ?)");
			
			objStatement.setString(1, sFirstName);
			objStatement.setString(2, sLastName);
			
			return(processMultipleUsers(objStatement.executeQuery()));
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_app_user_by_name'", objException);
			
			return(Collections.synchronizedList(new ArrayList<AppUser>()));
			}
	}
	
	public List<AppUser> getUsersBySignupDate(final Date dtSignup)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call get_app_user_by_signup_date(?)");
			
			objStatement.setDate(1, new java.sql.Date(dtSignup.getTime()));
			
			return(processMultipleUsers(objStatement.executeQuery()));
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_app_user_by_signup_date'", objException);
			
			return(Collections.synchronizedList(new ArrayList<AppUser>()));
			}
	}
	
	public AppUser insert(AppUser objAppUser)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("call insert_app_user(?, ?, ?, ?)");
			ResultSet objResults;
			
			objStatement.setString(1, objAppUser.getFirstName());
			objStatement.setString(2, objAppUser.getLastName());
			objStatement.setString(3, objAppUser.getLoginInfo().getUsername());
			objStatement.setString(4, objAppUser.getLoginInfo().getPasscode());
			objStatement.setInt(5, objAppUser.getOffice().getId());
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(getDAOBuilder().createUserFromResult(objResults));
			else
				return(objAppUser);
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'insert_new_app_user'", objException);
			
			return(objAppUser);
			}
	}
	
	protected List<AppUser> processMultipleUsers(ResultSet objResults) throws SQLException
	{
		List<AppUser> lstAppUsers = Collections.synchronizedList(new ArrayList<AppUser>());
		
		while(objResults.next())
			lstAppUsers.add(new DomainDAOBuilder().createUserFromResult(objResults));
		
		return(lstAppUsers);
	}
	
	protected void setDataSource(final DataSource objDataSource)
	{
		mObjDataSource = objDataSource;
	}
	
	protected void setDAOBuilder(final DomainDAOBuilder objDAOBuilder)
	{
		mObjDomainDAOBuilder = objDAOBuilder;
	}
}