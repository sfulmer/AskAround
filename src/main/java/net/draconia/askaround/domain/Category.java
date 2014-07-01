package net.draconia.askaround.domain;

import java.io.Serializable;

public class Category implements Serializable
{
	private static final long serialVersionUID = -8127223752150362634L;
	
	private Category mObjParent;
	private Integer miId;
	private String msDescription, msName;
	
	public Category()
	{ }
	
	public Category(final String sName)
	{
		setName(sName);
	}
	
	public Category(final Integer iId, final String sName)
	{
		setId(iId);
		setName(sName);
	}
	
	public Category(final Category objParent, final String sName)
	{
		setParent(objParent);
		setName(sName);
	}
	
	public Category(final Category objParent, final Integer iId, final String sName)
	{
		setParent(objParent);
		setId(iId);
		setName(sName);
	}
	
	public Category(final String sName, final String sDescription)
	{
		setName(sName);
		setDescription(sDescription);
	}
	
	public Category(final Integer iId, final String sName, final String sDescription)
	{
		setId(iId);
		setName(sName);
		setDescription(sDescription);
	}
	
	public Category(final Category objParent, final String sName, final String sDescription)
	{
		setParent(objParent);
		setName(sName);
		setDescription(sDescription);
	}
	
	public Category(final Category objParent, final Integer iId, final String sName, final String sDescription)
	{
		setParent(objParent);
		setId(iId);
		setName(sName);
		setDescription(sDescription);
	}
	
	public boolean equals(final Object objOther)
	{
		if((objOther instanceof Category) && (objOther != null))
			{
			Category objCategory = ((Category)(objOther));
			
			if((objCategory.getParent() == getParent()) && (getParent() == null))
				return(		(new Integer(getId()).equals(objCategory.getId()))
						&&	(getName().equals(objCategory.getName()))
						&&	(getDescription().equals(objCategory.getDescription())));
			else if((getParent() == null) && getParent().equals(objCategory.getParent()))
				return(		(new Integer(getId()).equals(objCategory.getId()))
						&&	(getName().equals(objCategory.getName()))
						&&	(getDescription().equals(objCategory.getDescription())));
			else
				return(false);
			}
		else
			return(false);
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
	
	public String getName()
	{
		if(msName == null)
			msName = "";
		
		return(msName);
	}
	
	public Category getParent()
	{
		return(mObjParent);
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
	
	public void setParent(final Category objParent)
	{
		mObjParent = objParent;
	}
	
	public String toString()
	{
		if(getParent() == null)
			return(getName());
		else
			return(getParent().getName() + " / " + getName());
	}
}