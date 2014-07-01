package net.draconia.askaround.domain;

import java.io.Serializable;

public class City implements Serializable
{
	private static final long serialVersionUID = 6298054579376482225L;
	
	private Integer miId;
	private State mObjState;
	private String msName;
	
	public City()
	{ }
	
	public City(final String sName, final State objState)
	{
		setName(sName);
		setState(objState);
	}
	
	public City(final Integer iId, final String sName, final State objState)
	{
		setId(iId);
		setName(sName);
		setState(objState);
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
	
	public State getState()
	{
		if(mObjState == null)
			mObjState = new State();
		
		return(mObjState);
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
	
	public void setState(final State objState)
	{
		if(objState == null)
			mObjState = new State();
		else
			mObjState = objState;
	}
}