package net.draconia.askaround.domain;

import java.io.Serializable;

public class Country implements Serializable
{
	private static final long serialVersionUID = -2772829025433975422L;
	
	private Integer miId;
	private String msAbbreviation, msName;
	
	public Country()
	{ }
	
	public Country(final String sName, final String sAbbreviation)
	{
		setAbbreviation(sAbbreviation);
		setName(sName);
	}
	
	public Country(final Integer iId, final String sName, final String sAbbreviation)
	{
		setId(iId);
		setName(sName);
		setAbbreviation(sAbbreviation);
	}
	
	public String getAbbreviation()
	{
		if(msAbbreviation == null)
			msAbbreviation = "";
		
		return(msAbbreviation);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	public String getName()
	{
		if(msName == null)
			msName = "";
		
		return(msName);
	}
	
	public void setAbbreviation(final String sAbbreviation)
	{
		if(sAbbreviation == null)
			msAbbreviation = "";
		else
			msAbbreviation = sAbbreviation;
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
	
	public void setName(final String sName)
	{
		if(sName == null)
			msName = "";
		else
			msName = sName;
	}
}