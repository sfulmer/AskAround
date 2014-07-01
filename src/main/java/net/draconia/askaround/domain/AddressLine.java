package net.draconia.askaround.domain;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnore;

public class AddressLine implements Comparable<AddressLine>, Serializable
{
	private static final long serialVersionUID = 7734615744636182703L;
	
	private Address mObjAddress;
	private Integer miId, miLineNumber;
	private String msAddressLine;
	
	public AddressLine()
	{ }
	
	public AddressLine(final Address objAddress)
	{
		setAddress(objAddress);
	}
	
	public AddressLine(final Integer iLineNumber, final String sAddressLine)
	{
		setLineNumber(iLineNumber);
		setAddressLine(sAddressLine);
	}
	
	public AddressLine(final Address objAddress, final Integer iLineNumber, final String sAddressLine)
	{
		setAddress(objAddress);
		setLineNumber(iLineNumber);
		setAddressLine(sAddressLine);
	}
	
	public AddressLine(final Integer iId, final Integer iLineNumber, final String sAddressLine)
	{
		setId(iId);
		setLineNumber(iLineNumber);
		setAddressLine(sAddressLine);
	}
	
	public AddressLine(final Address objAddress, final Integer iId, final Integer iLineNumber, final String sAddressLine)
	{
		setAddress(objAddress);
		setId(iId);
		setLineNumber(iLineNumber);
		setAddressLine(sAddressLine);
	}
	
	public int compareTo(final AddressLine objAddressLine)
	{
		return(new Integer(getLineNumber()).compareTo(objAddressLine.getLineNumber()));
	}
	
	public boolean equals(final Object objAddressLine)
	{
		if((objAddressLine instanceof AddressLine) && (objAddressLine != null))
			{
			AddressLine objLine = ((AddressLine)(objAddressLine));
			
			if((objLine.getAddress() == null) && (objLine.getAddress() == getAddress()))
				return(new Integer(objLine.getLineNumber()).equals(getLineNumber()) && objLine.getAddressLine().equals(getAddressLine()));
			else if((getAddress() != null) && (getAddress().equals(objLine.getAddress())))
				return(new Integer(objLine.getLineNumber()).equals(getLineNumber()) && objLine.getAddressLine().equals(getAddressLine()));
			else
				return(false);
			}
		else
			return(false);
	}
	
	@JsonIgnore
	public Address getAddress()
	{
		return(mObjAddress);
	}
	
	public String getAddressLine()
	{
		if(msAddressLine == null)
			msAddressLine = "";
		
		return(msAddressLine);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	public int getLineNumber()
	{
		if(miLineNumber == null)
			miLineNumber = 0;
		
		return(miLineNumber);
	}
	
	public void setAddress(final Address objAddress)
	{
		mObjAddress = objAddress;
	}
	
	public void setAddressLine(final String sAddressLine)
	{
		if(sAddressLine == null)
			msAddressLine = "";
		else
			msAddressLine = sAddressLine;
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
	
	public void setLineNumber(final Integer iLineNumber)
	{
		if(iLineNumber == null)
			miLineNumber = 0;
		else
			miLineNumber = iLineNumber;
	}
}