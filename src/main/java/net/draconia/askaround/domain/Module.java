package net.draconia.askaround.domain;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonProperty;

public class Module implements Serializable
{
	private static final long serialVersionUID = -982971557070962889L;
	
	private Boolean mbActive;
	private Integer miId;
	private String msDescription, msName, msURL;
	
	public Module()
	{ }
	
	public String getDescription()
	{
		if(msDescription == null)
			msDescription = "";
		
		return(msDescription);
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
	
	@JsonProperty("URL")
	public String getURL()
	{
		if(msURL == null)
			msURL = "";
		
		return(msURL);
	}
	
	public boolean isActive()
	{
		if(mbActive == null)
			mbActive = false;
		
		return(mbActive);
	}
	
	public void setActive(final Boolean bActive)
	{
		if(bActive == null)
			mbActive = true;
		else
			mbActive = bActive;
	}
	
	public void setURL(final String sURL)
	{
		if(sURL == null)
			msURL = "";
		else
			msURL = sURL;
	}
	
	public void setDescription(final String sDescription)
	{
		if(sDescription == null)
			msDescription = "";
		else
			msDescription = sDescription;
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