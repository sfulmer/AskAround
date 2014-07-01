package net.draconia.askaround.domain;

import java.io.Serializable;

public class State implements Serializable
{
	private static final long serialVersionUID = 6645877398852435359L;
	
	private Country mObjCountry;
	private Integer miId;
	private String msAbbreviation, msName;
	
	public State()
	{ }
	
	public State(final String sName)
	{
		setName(sName);
	}
	
	public State(final Integer iId, final String sName)
	{
		setId(iId);
		
		setName(sName);
	}
	
	public State(final String sName, final String sAbbreviation)
	{
		this(sName);
		
		setAbbreviation(sAbbreviation);
	}
	
	public State(final String sName, final Country objCountry)
	{
		this(sName);
		
		setCountry(objCountry);
	}
	
	public State(final Integer iId, final String sName, final String sAbbreviation)
	{
		this(iId, sName);
		
		setAbbreviation(sAbbreviation);
	}
	
	public State(final String sName, final String sAbbreviation, final Country objCountry)
	{
		this(sName, sAbbreviation);
		
		setCountry(objCountry);
	}
	
	public State(final Integer iId, final String sName, final Country objCountry)
	{
		this(iId, sName);
		
		setCountry(objCountry);
	}
	
	public State(final Integer iId, final String sName, final String sAbbreviation, final Country objCountry)
	{
		this(iId, sName, sAbbreviation);
		
		setCountry(objCountry);
	}
	
	public String getAbbreviation()
	{
		if(msAbbreviation == null)
			msAbbreviation = "";
		
		return(msAbbreviation);
	}
	
	public Country getCountry()
	{
		if(mObjCountry == null)
			mObjCountry = new Country();
		
		return(mObjCountry);
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
	
	public void setCountry(final Country objCountry)
	{
		if(objCountry == null)
			mObjCountry = new Country();
		else
			mObjCountry = objCountry;
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