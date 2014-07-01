package net.draconia.askaround.domain;

import java.io.Serializable;

import java.util.Collections;
import java.util.Comparator;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

public class Address implements Serializable
{
	private static final long serialVersionUID = -5937262721296711576L;
	
	private Integer miId;
	private Set<AddressLine> mSetLines;
	private ZipCode mObjZipCode;
	
	public Address()
	{ }
	
	public Address addAddressLine(final String sAddressLine)
	{
		getInternalLines().add(new AddressLine(Collections.max(getInternalLines()).getLineNumber(), sAddressLine));
		
		return(this);
	}
	
	public Address addAddressLine(final Integer iLineNumber, final String sAddressLine)
	{
		addAddressLine(new AddressLine(iLineNumber, sAddressLine));
		
		return(this);
	}
	
	public Address addAddressLine(final AddressLine objLine)
	{
		getInternalLines().add(objLine);
		
		return(this);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	protected Set<AddressLine> getInternalLines()
	{
		if(mSetLines == null)
			mSetLines = Collections.synchronizedSortedSet(new TreeSet<AddressLine>(new Comparator<AddressLine>()
			{
				public int compare(final AddressLine objAddressLine1, final AddressLine objAddressLine2)
				{
					return(new Integer(objAddressLine1.getLineNumber()).compareTo(objAddressLine2.getLineNumber()));
				}
			}));
		
		return(mSetLines);
	}
	
	public Set<AddressLine> getLines()
	{
		if(mSetLines == null)
			mSetLines = Collections.unmodifiableSet(getInternalLines());
		
		return(mSetLines);
	}
	
	public ZipCode getZipCode()
	{
		if(mObjZipCode == null)
			mObjZipCode = new ZipCode();
		
		return(mObjZipCode);
	}
	
	public void removeAddressLine(final AddressLine objLine)
	{
		getInternalLines().remove(objLine);
	}
	
	public void setAddressLines(final SortedSet<AddressLine> setAddressLines)
	{
		if(setAddressLines == null)
			mSetLines = Collections.synchronizedSortedSet(new TreeSet<AddressLine>());
		else
			mSetLines = Collections.synchronizedSortedSet(setAddressLines);
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
	
	public void setZipCode(final ZipCode objZipCode)
	{
		if(objZipCode == null)
			mObjZipCode = new ZipCode();
		else
			mObjZipCode = objZipCode;
	}
}