package net.draconia.askaround.domain;

import java.io.Serializable;

public class AssetStatus implements Serializable
{
	private static final long serialVersionUID = -5641828564465821589L;
	
	private Integer miId;
	private String msDescription, msStatus;
	
	public AssetStatus()
	{ }
	
	public AssetStatus(final String sStatus)
	{
		setStatus(sStatus);
	}
	
	public AssetStatus(final Integer iId, final String sStatus)
	{
		setId(iId);
		setStatus(sStatus);
	}
	
	public AssetStatus(final String sStatus, final String sDescription)
	{
		setStatus(sStatus);
		setDescription(sDescription);
	}
	
	public AssetStatus(final Integer iId, final String sStatus, final String sDescription)
	{
		setId(iId);
		setStatus(sStatus);
		setDescription(sDescription);
	}
	
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
	
	public String getStatus()
	{
		if(msStatus == null)
			msStatus = "";
		
		return(msStatus);
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
	
	public void setStatus(final String sStatus)
	{
		if(sStatus == null)
			msStatus = "";
		else
			msStatus = sStatus;
	}
}