package net.draconia.askaround.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.Serializable;

import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import net.draconia.askaround.domain.Address;
import net.draconia.askaround.domain.AddressLine;
import net.draconia.askaround.domain.AppUser;
import net.draconia.askaround.domain.Asset;
import net.draconia.askaround.domain.AssetImage;
import net.draconia.askaround.domain.AssetStatus;
import net.draconia.askaround.domain.Category;
import net.draconia.askaround.domain.City;
import net.draconia.askaround.domain.Company;
import net.draconia.askaround.domain.Country;
import net.draconia.askaround.domain.LoginInfo;
import net.draconia.askaround.domain.Office;
import net.draconia.askaround.domain.State;
import net.draconia.askaround.domain.ZipCode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import org.xml.sax.SAXException;

public class DomainDAOBuilder implements Serializable
{
	private static final long serialVersionUID = 1110395566759247766L;
	
	private static Logger log = LoggerFactory.getLogger(DomainDAOBuilder.class);
	
	public DomainDAOBuilder()
	{ }
	
	public Address createAddressFromResult(final ResultSet objResults)
	{
		try
			{
			Address objAddress = new Address();
			
			objAddress.setId(objResults.getInt("LoginInfoId"));
			objAddress.setZipCode(createZipCodeFromResult(objResults));
			
			for(AddressLine objLine : createAddressLineListFromResult(objResults.getString("AddressLines")))
				objAddress.addAddressLine(objLine);
			
			return(objAddress);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Address());
			}
	}
	
	public List<AddressLine> createAddressLineListFromResult(final String sAddressLines)
	{
		List<AddressLine> lstAddressLines = new ArrayList<AddressLine>();
		
		try
			{
			Document docAddressLines = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new ByteArrayInputStream(sAddressLines.getBytes("UTF8")));
			NodeList xmlAddressLines = docAddressLines.getElementsByTagName("addressline");
			
			for(int iLength = xmlAddressLines.getLength(), iLoop = 0; iLoop < iLength; iLoop++)
				{
				AddressLine objAddressLine = new AddressLine();
				NamedNodeMap xmlAddressLineAttrs;
				Node xmlAddressLine = xmlAddressLines.item(iLoop);
				
				xmlAddressLineAttrs = xmlAddressLine.getAttributes();
				objAddressLine.setId(Integer.valueOf(xmlAddressLineAttrs.getNamedItem("id").getNodeValue()));
				objAddressLine.setLineNumber(Integer.valueOf(xmlAddressLineAttrs.getNamedItem("linenumber").getNodeValue()));
				
				objAddressLine.setAddressLine(xmlAddressLine.getTextContent());
				
				lstAddressLines.add(objAddressLine);
				}
			}
		catch(IOException objException)
			{
			log.error("Error parsing AddressLines", objException);
			}
		catch(ParserConfigurationException objException)
			{
			log.error("Error with the configuration of XML parser", objException);
			}
		catch(SAXException objException)
			{
			log.error("Error in AddressLines XML", objException);
			}
		
		return(lstAddressLines);
	}
	
	public Asset createAssetFromResults(final ResultSet objResults)
	{
		Asset objAsset = new Asset();
		
		try
			{
			objAsset.setId(objResults.getInt("AssetId"));
			objAsset.setItemNumber(objResults.getString("ItemNumber"));
			objAsset.setTitle(objResults.getString("Title"));
			objAsset.setDescription(objResults.getString("Description"));
			objAsset.setPostedDate(objResults.getTimestamp("PostedDate"));
			objAsset.setPostedDate(objResults.getTimestamp("ExpirationDate"));
			objAsset.setRetailValue(objResults.getBigDecimal("RetailValue"));
			objAsset.setDepreciatedValue(objResults.getBigDecimal("DepreciatedValue"));
			objAsset.setCategory(createCategoryFromResult(objResults));
			objAsset.setStatus(createAssetStatusFromResult(objResults));
			objAsset.setPoster(createUserFromResult(objResults));
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			}
		
		return(objAsset);
	}
	
	public AssetImage createAssetImageFromResult(final ResultSet objResults)
	{
		AssetImage objAssetImage	=	new AssetImage();
		
		try
			{
			objAssetImage.setId(objResults.getInt("AssetImageId"));
			objAssetImage.setName(objResults.getString("ImageName"));
			objAssetImage.setDescription(objResults.getString("ImageDescription"));
			objAssetImage.setData(ImageIO.read(objResults.getBinaryStream("ImageData")));
			objAssetImage.setWidth(objResults.getInt("ImageWidth"));
			objAssetImage.setHeight(objResults.getInt("ImageHeight"));
			
			return(objAssetImage);
			}
		catch(IOException objException)
			{
			log.error("Error reading image data from recordset", objException);
			
			return(objAssetImage);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(objAssetImage);
			}
	}
	
	public AssetStatus createAssetStatusFromResult(final ResultSet objResults)
	{
		try
			{
			AssetStatus objAssetStatus	=	new AssetStatus();
			
			objAssetStatus.setId(objResults.getInt("AssetStatusId"));
			objAssetStatus.setStatus(objResults.getString("StatusText"));
			objAssetStatus.setDescription(objResults.getString("StatusDescription"));
			
			return(objAssetStatus);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new AssetStatus());
			}
	}
	
	public Category createCategoryFromResult(final ResultSet objResults)
	{
		try
			{
			Category objCategory	=	new Category();
			Integer iParentId;
			
			objCategory.setId(objResults.getInt("CategoryId"));
			objCategory.setName(objResults.getString("CategoryName"));
			objCategory.setDescription(objResults.getString("CategoryDescription"));
			
			iParentId				=	objResults.getInt("ParentCategoryId");
			
			if(!objResults.wasNull())
				{
				Category objParent 	=	new Category();
				
				objParent.setId(iParentId);
				objParent.setName(objResults.getString("ParentCategoryName"));
				objParent.setDescription(objResults.getString("ParentCategoryDescription"));
				}
			
			return(objCategory);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Category());
			}
	}
	
	public City createCityFromResult(final ResultSet objResults)
	{
		try
			{
			City objCity = new City();
			
			objCity.setId(objResults.getInt("CityId"));
			objCity.setName(objResults.getString("CityName"));
			objCity.setState(createStateFromResult(objResults));
			
			return(objCity);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new City());
			}
	}
	
	public Company createCompanyFromResult(final ResultSet objResults)
	{
		try
			{
			Company objCompany = new Company();
			
			objCompany.setId(objResults.getInt("CompanyId"));
			objCompany.setName(objResults.getString("CountryName"));
			
			return(objCompany);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Company());
			}
	}
	
	public Country createCountryFromResult(final ResultSet objResults)
	{
		try
			{
			Country objCountry = new Country();
			
			objCountry.setId(objResults.getInt("CountryId"));
			objCountry.setName(objResults.getString("CountryName"));
			objCountry.setAbbreviation(objResults.getString("CountryAbbreviation"));
			
			return(objCountry);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Country());
			}
	}
	
	public LoginInfo createLoginInfoFromResult(final ResultSet objResults)
	{
		try
			{
			LoginInfo objLoginInfo = new LoginInfo();
			
			objLoginInfo.setId(objResults.getInt("LoginInfoId"));
			objLoginInfo.setUsername(objResults.getString("UserName"));
			objLoginInfo.setPasscode(objResults.getString("Passcode"));
			objLoginInfo.setAuthenticated(false);
			
			return(objLoginInfo);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new LoginInfo());
			}
	}
	
	public Office createOfficeFromResult(final ResultSet objResults)
	{
		try
			{
			Integer iId = objResults.getInt("OfficeId");
			Office objOffice = new Office();
			
			if(!objResults.wasNull())
				{
				objOffice.setId(iId);
				objOffice.setAddress(createAddressFromResult(objResults));
				objOffice.setCompany(createCompanyFromResult(objResults));
				
				return(objOffice);
				}
			else
				return(objOffice);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new Office());
			}
	}
	
	public State createStateFromResult(final ResultSet objResults)
	{
		try
			{
			State objState = new State();
			
			objState.setId(objResults.getInt("StateId"));
			objState.setName(objResults.getString("StateName"));
			objState.setAbbreviation(objResults.getString("StateAbbreviation"));
			objState.setCountry(createCountryFromResult(objResults));
			
			return(objState);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new State());
			}
	}
	
	public AppUser createUserFromResult(final ResultSet objResults)
	{
		try
			{
			AppUser objAppUser = new AppUser();
			
			objAppUser.setAppUserId(objResults.getInt("AppUserId"));
			objAppUser.setFirstName(objResults.getString("FirstName"));
			objAppUser.setLastName(objResults.getString("LastName"));
			objAppUser.setSignupDate(objResults.getTimestamp("SignupDate"));
			objAppUser.setOffice(createOfficeFromResult(objResults));
			
			objAppUser.setLoginInfo(createLoginInfoFromResult(objResults));
			
			return(objAppUser);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new AppUser());
			}
	}
	
	public ZipCode createZipCodeFromResult(final ResultSet objResults)
	{
		try
			{
			ZipCode objZipCode = new ZipCode();
			
			objZipCode.setId(objResults.getInt("ZipCodeId"));
			objZipCode.setCity(createCityFromResult(objResults));
			objZipCode.setZipCode(objResults.getString("ZipCode"));
			
			return(objZipCode);
			}
		catch(SQLException objException)
			{
			log.error("Error with resultset returned", objException);
			
			return(new ZipCode());
			}
	}
}