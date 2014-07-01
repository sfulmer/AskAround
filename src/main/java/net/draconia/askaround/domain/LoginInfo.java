package net.draconia.askaround.domain;

import java.io.Serializable;

public class LoginInfo implements Serializable
{
	private static final long serialVersionUID = -6837002254601834881L;
	
	private Boolean mbAuthenticated;
	private Integer miId;
	private String msPasscode, msUsername;
	
	public LoginInfo()
	{ }
	
	public LoginInfo(final int iId, final String sUserName, final String sPassword)
	{
		setId(iId);
		setUsername(sUserName);
		setPasscode(sPassword);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	public String getPasscode()
	{
		if(msPasscode == null)
			msPasscode = "";
		
		return(msPasscode);
	}
	
	public String getUsername()
	{
		if(msUsername == null)
			msUsername = "";
		
		return(msUsername);
	}
	
	public Boolean isAuthenticated()
	{
		if(mbAuthenticated == null)
			mbAuthenticated = false;
		
		return(mbAuthenticated);
	}
	
	public void setAuthenticated(final Boolean bAuthenticated)
	{
		mbAuthenticated = (bAuthenticated == null) ? false : bAuthenticated;
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
	
	public void setPasscode(final String sPasscode)
	{
		if(sPasscode == null)
			msPasscode = "";
		else
			msPasscode = sPasscode;
	}
	
	public void setUsername(final String sUsername)
	{
		if(sUsername == null)
			msUsername = "";
		else
			msUsername = sUsername;
	}
}