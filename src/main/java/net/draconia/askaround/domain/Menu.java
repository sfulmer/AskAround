package net.draconia.askaround.domain;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnore;

public class Menu implements Serializable
{
	private static final long serialVersionUID = -982971557070962889L;
	
	private Integer miId, miOrderNumber;
	private Module mObjModule;
	private String msDescription, msName;
	
	public Menu()
	{ }
	
	public String getDescription()
	{
		if(msDescription == null)
			msDescription = getModule().getDescription();
		
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
			msName = getModule().getName();
		
		return(msName);
	}
	
	public Module getModule()
	{
		if(mObjModule == null)
			mObjModule = new Module();
		
		return(mObjModule);
	}
	
	public int getOrderNumber()
	{
		if(miOrderNumber == null)
			miOrderNumber = -1;
		
		return(miOrderNumber);
	}
	
	@JsonIgnore
	public boolean isActive()
	{
		return(getModule().isActive());
	}
	
	public void setDescription(final String sDescription)
	{
		if(sDescription == null)
			msDescription = getModule().getDescription();
		else
			msDescription = sDescription;
	}
	
	public void setId(final int iId)
	{
		miId = iId;
	}
	
	public void setName(final String sName)
	{
		if(sName == null)
			msName = getModule().getName();
		else
			msName = sName;
	}
	
	public void setModule(final Module objModule)
	{
		if(objModule == null)
			mObjModule = new Module();
		else
			mObjModule = objModule;
	}
	
	public void setOrderNumber(final Integer iOrderNumber)
	{
		if(iOrderNumber == null)
			miOrderNumber = -1;
		else
			miOrderNumber = iOrderNumber;
	}
}