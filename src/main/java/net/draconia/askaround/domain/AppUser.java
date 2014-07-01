package net.draconia.askaround.domain;

import java.io.Serializable;

import java.util.Date;

import net.draconia.askaround.util.DateSerializer;

import org.codehaus.jackson.map.annotate.JsonSerialize;

public class AppUser implements Serializable
{
	private static final long serialVersionUID = 6289188460713227245L;
	
	private Date mDtSignup;
	private Integer miAppUserId;
	private LoginInfo mObjLoginInfo;
	private Office mObjOffice;
	private String msFirstName, msLastName;

	public AppUser()
	{ }
	
	public AppUser(final Integer iAppUserId, final String sFirstName, final String sLastName, final Date dtSignup, final Office objOffice)
	{
		setAppUserId(iAppUserId);
		setFirstName(sFirstName);
		setLastName(sLastName);
		setOffice(objOffice);
		setSignupDate(dtSignup);
	}
	
	public Integer getAppUserId()
	{
		if(miAppUserId == null)
			miAppUserId = 0;
		
		return(miAppUserId);
	}
	
	public String getFirstName()
	{
		if(msFirstName == null)
			msFirstName = "";
		
		return(msFirstName);
	}
	
	public String getLastName()
	{
		if(msLastName == null)
			msLastName = "";
		
		return(msLastName);
	}
	
	public LoginInfo getLoginInfo()
	{
		if(mObjLoginInfo == null)
			mObjLoginInfo = new LoginInfo();
		
		return(mObjLoginInfo);
	}
	
	public Office getOffice()
	{
		if(mObjOffice == null)
			mObjOffice = new Office();
		
		return(mObjOffice);
	}
	
	/**
	 * getSignupDate - Returns the SignUp date for this AppUser
	 * @return Signup date in the AppUser record
	 */
	// The annotation permits the Jackson library to encode the date into the JSON
	@JsonSerialize(using = DateSerializer.class)
	public Date getSignupDate()
	{
		if(mDtSignup == null)
			mDtSignup = new Date();
		
		return(mDtSignup);
	}
	
	public void setAppUserId(final Integer iId)
	{
		if(iId == null)
			miAppUserId = 0;
		else
			miAppUserId = iId;
	}
	
	public void setFirstName(final String sFirstName)
	{
		if(sFirstName == null)
			msFirstName = "";
		else
			msFirstName = sFirstName;
	}
	
	public void setLastName(final String sLastName)
	{
		if(sLastName == null)
			msLastName = "";
		else
			msLastName = sLastName;
	}
	
	public void setLoginInfo(final LoginInfo objLoginInfo)
	{
		if(objLoginInfo == null)
			mObjLoginInfo = new LoginInfo();
		else
			mObjLoginInfo = objLoginInfo;
	}
	
	public void setOffice(final Office objOffice)
	{
		if(objOffice == null)
			mObjOffice = new Office();
		else
			mObjOffice = objOffice;
	}
	
	public void setSignupDate(final Date dtSignup)
	{
		if(mDtSignup == null)
			mDtSignup = new Date();
		else
			mDtSignup = dtSignup;
	}
}