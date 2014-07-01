package net.draconia.askaround.domain;

import java.io.Serializable;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class Company implements Comparator<Company>, Serializable
{
	private static final long serialVersionUID = 8832385464951588885L;
	
	private Integer miId;
	private SortedSet<Office> mSetOffices;
	private String msName;
	
	public Company()
	{ }
	
	public Company(final String sName)
	{
		setName(sName);
	}
	
	public Company(final Integer iId, final String sName)
	{
		setId(iId);
		setName(sName);
	}
	
	public Company addOffice(final Office objOffice)
	{
		getInternalOffices().add(objOffice);
		
		return(this);
	}
	
	public Company addOffice(final Address objAddress)
	{
		getInternalOffices().add(new Office(this, objAddress));
		
		return(this);
	}
	
	public Company clearOffices()
	{
		getInternalOffices().clear();
		
		return(this);
	}
	
	public int compare(final Company objCompany1, final Company objCompany2)
	{
		return(getName().compareTo(objCompany2.getName()));
	}
	
	public boolean equals(final Object objOther)
	{
		if((objOther instanceof Company) && (objOther != null))
			{
			Company objCompany = ((Company)(objOther));
			
			return(new Integer(getId()).equals(objCompany.getId()) && getName().equals(objCompany));
			}
		else
			return(false);
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
	
	protected SortedSet<Office> getInternalOffices()
	{
		if(mSetOffices == null)
			mSetOffices = Collections.synchronizedSortedSet(new TreeSet<Office>());
		
		return(mSetOffices);
	}
	
	public SortedSet<Office> getOffices()
	{
		return(Collections.unmodifiableSortedSet(getInternalOffices()));
	}
	
	public Company removeOffice(final Office objOffice)
	{
		getInternalOffices().remove(objOffice);
		
		return(this);
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
	
	public String toString()
	{
		return(getName());
	}
}