package net.draconia.askaround.domain;

import java.io.Serializable;

public class ZipCode implements Serializable
{
	private static final long serialVersionUID = -2249941706837740878L;
	
	private City mObjCity;
	private Integer miId;
	private String msZipCode;
	
	public ZipCode()
	{ }
	
	public ZipCode(final String sZipCode, final City objCity)
	{
		setZipCode(sZipCode);
		setCity(objCity);
	}
	
	public ZipCode(final Integer iId, final String sZipCode, final City objCity)
	{
		setId(iId);
		setZipCode(sZipCode);
		setCity(objCity);
	}
	
	public City getCity()
	{
		if(mObjCity == null)
			mObjCity = new City();
		
		return(mObjCity);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	public String getZipCode()
	{
		if(msZipCode == null)
			msZipCode = "";
		
		return(msZipCode);
	}
	
	public void setCity(final City objCity)
	{
		if(objCity == null)
			mObjCity = new City();
		else
			mObjCity = objCity;
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
	
	public void setZipCode(final String sZipCode)
	{
		if(sZipCode == null)
			msZipCode = "";
		else
			msZipCode = sZipCode;
	}
}