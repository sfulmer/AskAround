package net.draconia.askaround.web;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Currency;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.draconia.askaround.domain.Asset;
import net.draconia.askaround.domain.AssetImage;
import net.draconia.askaround.domain.AssetStatus;
import net.draconia.askaround.domain.Category;
import net.draconia.askaround.service.AssetService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
@RequestMapping("/assets")
public class AssetsController
{
	private static final Logger log = LoggerFactory.getLogger(AssetsController.class);
	
	@Autowired
	private AssetService mObjAssetService;
	
	@RequestMapping(method=RequestMethod.GET, value={"/asset/edit"})
	public String editAsset(HttpServletRequest objRequest)
	{
		int iAssetId = 0;
		String sAssetId = "";
		
		if((sAssetId = objRequest.getParameter("assetId")) != null)
			try
				{
				iAssetId = Integer.parseInt(sAssetId);
				}
			catch(Exception objException)
				{
				log.warn("No Asset ID parameter passed in or malformatted id", objException);
				
				iAssetId = 0;
				}
		
		initEditing(objRequest);
		
		objRequest.setAttribute("assetId", iAssetId);
		
		return("editasset");
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public String getAssetPage(HttpServletRequest objRequest)
	{
		return("assets");
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/asset/{assetId}")
	public @ResponseBody Asset getAsset(@PathVariable("assetId") int iAssetId, HttpServletRequest objRequest)
	{
		Asset objAsset;
		
		if(iAssetId <= 0)
			objAsset = new Asset();
		else
			objAsset = getAssetService().getAssetById(iAssetId);
		
		objRequest.getSession().setAttribute("editasset", objAsset);
		
		return(objAsset);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public @ResponseBody List<Asset> getAssets(@RequestParam("pageNumber") Integer iPageNumber, @RequestParam("recordsPerPage") Integer iRecordsPerPage, final HttpServletRequest objRequest)
	{
		List<Asset> lstAssets = Collections.synchronizedList(new ArrayList<Asset>());
		
		lstAssets.add(new Asset());
		
		return(lstAssets);
	}
	
	protected AssetService getAssetService()
	{
		return(mObjAssetService);
	}
	
	protected void initEditing(HttpServletRequest objRequest)
	{
		List<Category> lstCategories = new ArrayList<Category>();
		List<AssetStatus> lstStatuses = new ArrayList<AssetStatus>();
		
		lstCategories.add(new Category(1, "Test"));
		lstStatuses.add(new AssetStatus(1, "Test"));
		
		objRequest.setAttribute("categories", lstCategories);
		objRequest.setAttribute("statuses", lstStatuses);
		
		objRequest.setAttribute("currency_symbol", Currency.getInstance(Locale.getDefault()).getSymbol());
	}
	
	@RequestMapping(method=RequestMethod.POST, value={"/edit/remember"})
	public @ResponseBody Asset rememberAsset(HttpServletRequest objRequest)
	{
		return(new Asset());
	}
	
	@RequestMapping(method=RequestMethod.POST, value={"/asset/upload/image"})
	public @ResponseBody Asset uploadImage(MultipartHttpServletRequest objRequest)
	{
		Asset objAsset;
		HttpSession objSession = objRequest.getSession();
		
		objAsset = ((Asset)(objSession.getAttribute("editasset")));
		
		try
			{
			AssetImage objAssetImage = objAsset.getImage();
			BufferedImage objBufferedImage;
			Iterator<String> objIterator = objRequest.getFileNames();
			MultipartFile objFile = objRequest.getFile(objIterator.next());
			
			objBufferedImage = ImageIO.read(objFile.getInputStream());
			
			objAssetImage.setName(objFile.getOriginalFilename());
			objAssetImage.setData(objBufferedImage);
			objAssetImage.setWidth(objBufferedImage.getWidth());
			objAssetImage.setHeight(objBufferedImage.getHeight());
			
			objSession.setAttribute("editasset", objAsset);
			}
		catch(IOException objException)
			{
			log.error("Failure opening file", objException);
			}
		
		return(objAsset);
	}
}