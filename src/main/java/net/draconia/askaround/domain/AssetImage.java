package net.draconia.askaround.domain;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;

import javax.imageio.ImageIO;

import net.draconia.askaround.util.ImageSerializer;

import org.apache.commons.codec.binary.Base64;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

public class AssetImage implements Serializable
{
	private static final long serialVersionUID = -1032171751975532303L;
	
	private Integer miHeight, miId, miWidth;
	private String msDescription, msName;
	private Image mObjData;
	
	public AssetImage()
	{ }
	
	public AssetImage(final Image objData)
	{
		setData(objData);
	}
	
	public AssetImage(final Integer iWidth, final Integer iHeight)
	{
		setWidth(iWidth);
		setHeight(iHeight);
	}
	
	public AssetImage(final Image objData, final String sName)
	{
		setData(objData);
		setName(sName);
	}
	
	public AssetImage(final Image objData, final Integer iWidth, final Integer iHeight)
	{
		setData(objData);
		setWidth(iWidth);
		setHeight(iHeight);
	}
	
	public AssetImage(final Image objData, final Integer iWidth, final Integer iHeight, final String sName)
	{
		setData(objData);
		setWidth(iWidth);
		setHeight(iHeight);
		setName(sName);
	}
	
	public AssetImage(final Image objData, final Integer iWidth, final Integer iHeight, final String sName, final String sDescription)
	{
		setData(objData);
		setWidth(iWidth);
		setHeight(iHeight);
		setName(sName);
		setDescription(sDescription);
	}
	
	public AssetImage(final Integer iId, final Image objData, final Integer iWidth, final Integer iHeight, final String sName, final String sDescription)
	{
		setId(iId);
		setData(objData);
		setWidth(iWidth);
		setHeight(iHeight);
		setName(sName);
		setDescription(sDescription);
	}
	
	public boolean equals(final Object objOther)
	{
		if((objOther instanceof AssetImage) && (objOther != null))
			{
			AssetImage objImage = ((AssetImage)(objOther));
			
			return(		(getId() == objImage.getId())
					&&	(getData().equals(objImage.getData()))
					&&	(getWidth() == objImage.getWidth())
					&&	(getHeight() == objImage.getHeight())
					&&	(getName().equals(objImage.getName()))
					&&	(getDescription().equals(objImage.getDescription())));
			}
		else
			return(false);
	}
	
	@JsonIgnore
	public String getBase64() throws IOException
	{
		ByteArrayOutputStream objStream = new ByteArrayOutputStream();
		
		ImageIO.write(((BufferedImage)(getData())), "jpg", objStream);
		
		objStream.flush();
		
		return(Base64.encodeBase64String(objStream.toByteArray()));
	}
	
	/**
	 * getData - Returns the image for this thumbnail
	 * @return image/thumbnail in the Asset record
	 */
	// The annotation permits the Jackson library to encode the image into the JSON
	@JsonSerialize(using = ImageSerializer.class)
	public Image getData()
	{
		if(mObjData == null)
			mObjData = new BufferedImage(32, 32, BufferedImage.TYPE_4BYTE_ABGR);
		
		return(mObjData);
	}
	
	public String getDescription()
	{
		if(msDescription == null)
			msDescription = "";
		
		return(msDescription);
	}
	
	public int getHeight()
	{
		if(miHeight == null)
			miHeight = ((BufferedImage)(getData())).getHeight();
		
		return(miHeight);
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
	
	public int getWidth()
	{
		if(miWidth == null)
			miWidth = ((BufferedImage)(getData())).getWidth();
		
		return(miWidth);
	}
	
	public void setData(final Image objData)
	{
		if(objData == null)
			mObjData = new BufferedImage(32, 32, BufferedImage.TYPE_4BYTE_ABGR);
		else
			mObjData = objData;
	}
	
	public void setDescription(final String sDescription)
	{
		if(sDescription == null)
			msDescription = "";
		else
			msDescription = sDescription;
	}
	
	public void setHeight(final Integer iHeight)
	{
		if(iHeight == null)
			miHeight = 32;
		else
			miHeight = iHeight;
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
	
	public void setWidth(final Integer iWidth)
	{
		if(iWidth == null)
			miWidth = 32;
		else
			miWidth = iWidth;
	}
}