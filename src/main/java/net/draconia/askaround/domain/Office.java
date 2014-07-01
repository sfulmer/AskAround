package net.draconia.askaround.domain;

import java.io.Serializable;

public class Office implements Serializable
{
	private static final long serialVersionUID = -31075565680769583L;
	
	private Address mObjAddress;
	private Company mObjCompany;
	private Integer miId;
	
	public Office()
	{ }
	
	public Office(final Company objCompany)
	{
		setCompany(objCompany);
	}
	
	public Office(final Company objCompany, final Address objAddress)
	{
		setCompany(objCompany);
		setAddress(objAddress);
	}
	
	public Office(final Integer iId, final Company objCompany, final Address objAddress)
	{
		setCompany(objCompany);
		setId(iId);
		setAddress(objAddress);
	}
	
	public Address getAddress()
	{
		if(mObjAddress == null)
			mObjAddress = new Address();
		
		return(mObjAddress);
	}
	
	public Company getCompany()
	{
		return(mObjCompany);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	public void setAddress(final Address objAddress)
	{
		if(objAddress == null)
			mObjAddress = new Address();
		else
			mObjAddress = objAddress;
	}
	
	public void setCompany(final Company objCompany)
	{
		mObjCompany = objCompany;
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
}