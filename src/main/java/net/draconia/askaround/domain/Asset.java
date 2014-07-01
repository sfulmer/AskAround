package net.draconia.askaround.domain;

import java.io.Serializable;

import java.math.BigDecimal;

import java.util.Date;

import net.draconia.askaround.util.CurrencySerializer;
import net.draconia.askaround.util.DateSerializer;

import org.codehaus.jackson.map.annotate.JsonSerialize;

public class Asset implements Serializable
{
	private static final long serialVersionUID = -4432542610644713603L;
	
	private AppUser mObjPoster;
	private AssetImage mObjImage;
	private AssetStatus mObjStatus;
	private BigDecimal mdDepreciatedValue, mdRetailValue;
	private Category mObjCategory;
	private Date mDtExpiration, mDtPosted;
	private Integer miId;
	private String msDescription, msItemNumber, msTitle;
	
	public Asset()
	{ }
	
	public Category getCategory()
	{
		if(mObjCategory == null)
			mObjCategory = new Category();
		
		return(mObjCategory);
	}
	
	@JsonSerialize(using=CurrencySerializer.class)
	public BigDecimal getDepreciatedValue()
	{
		if(mdDepreciatedValue == null)
			mdDepreciatedValue = new BigDecimal(0);
		
		return(mdDepreciatedValue);
	}
	
	public String getDescription()
	{
		if(msDescription == null)
			msDescription = "";
		
		return(msDescription);
	}
	
	/**
	 * getExpirationDate - Returns the expiration date for this Asset
	 * @return expiration date in the Asset record
	 */
	// The annotation permits the Jackson library to encode the date into the JSON
	@JsonSerialize(using = DateSerializer.class)
	public Date getExpirationDate()
	{
		if(mDtExpiration == null)
			mDtExpiration = new Date();
		
		return(mDtExpiration);
	}
	
	public int getId()
	{
		if(miId == null)
			miId = 0;
		
		return(miId);
	}
	
	public AssetImage getImage()
	{
		if(mObjImage == null)
			mObjImage = new AssetImage();
		
		return(mObjImage);
	}
	
	public String getItemNumber()
	{
		if(msItemNumber == null)
			msItemNumber = "";
		
		return(msItemNumber);
	}
	
	/**
	 * getPostedDate - Returns the expiration date for this Asset
	 * @return posted date in the Asset record
	 */
	// The annotation permits the Jackson library to encode the date into the JSON
	@JsonSerialize(using = DateSerializer.class)
	public Date getPostedDate()
	{
		if(mDtPosted == null)
			mDtPosted = new Date();
		
		return(mDtPosted);
	}
	
	public AppUser getPoster()
	{
		if(mObjPoster == null)
			mObjPoster = new AppUser();
		
		return(mObjPoster);
	}
	
	@JsonSerialize(using=CurrencySerializer.class)
	public BigDecimal getRetailValue()
	{
		if(mdRetailValue == null)
			mdRetailValue = new BigDecimal(0);
		
		return(mdRetailValue);
	}
	
	public AssetStatus getStatus()
	{
		if(mObjStatus == null)
			mObjStatus = new AssetStatus();
		
		return(mObjStatus);
	}
	
	public String getTitle()
	{
		if(msTitle == null)
			msTitle = "";
		
		return(msTitle);
	}
	
	public void setCategory(final Category objCategory)
	{
		if(objCategory == null)
			mObjCategory = new Category();
		else
			mObjCategory = objCategory;
	}
	
	public void setDepreciatedValue(final BigDecimal dDepreciatedValue)
	{
		if(dDepreciatedValue == null)
			mdDepreciatedValue = new BigDecimal(0);
		else
			mdDepreciatedValue = dDepreciatedValue;
	}
	
	public void setDescription(final String sDescription)
	{
		if(sDescription == null)
			msDescription = "";
		else
			msDescription = sDescription;
	}
	
	public void setExpirationDate(final Date dtExpiration)
	{
		if(dtExpiration == null)
			mDtExpiration = new Date();
		else
			mDtExpiration = dtExpiration;
	}
	
	public void setId(final Integer iId)
	{
		if(iId == null)
			miId = 0;
		else
			miId = iId;
	}
	
	public void setImage(final AssetImage objImage)
	{
		if(objImage == null)
			mObjImage = new AssetImage();
		else
			mObjImage = objImage;
	}
	
	public void setItemNumber(final String sItemNumber)
	{
		if(sItemNumber == null)
			msItemNumber = "";
		else
			msItemNumber = sItemNumber;
	}
	
	public void setPostedDate(final Date dtPosted)
	{
		if(dtPosted == null)
			mDtPosted = new Date();
		else
			mDtPosted = dtPosted;
	}
	
	public void setPoster(final AppUser objPoster)
	{
		if(objPoster == null)
			mObjPoster = new AppUser();
		else
			mObjPoster = objPoster;
	}
	
	public void setRetailValue(final BigDecimal dRetailValue)
	{
		if(dRetailValue == null)
			mdRetailValue = new BigDecimal(0);
		else
			mdRetailValue = dRetailValue;
	}
	
	public void setStatus(final AssetStatus objStatus)
	{
		if(objStatus == null)
			mObjStatus = new AssetStatus();
		else
			mObjStatus = objStatus;
	}
	
	public void setTitle(final String sTitle)
	{
		if(sTitle == null)
			msTitle = "";
		else
			msTitle = sTitle;
	}
}