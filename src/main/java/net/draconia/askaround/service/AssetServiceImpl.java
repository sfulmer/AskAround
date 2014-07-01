package net.draconia.askaround.service;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.draconia.askaround.domain.AppUser;
import net.draconia.askaround.domain.Asset;
import net.draconia.askaround.domain.AssetStatus;
import net.draconia.askaround.domain.Category;

public class AssetServiceImpl implements AssetService
{
	private static final long serialVersionUID = 7953845365265133639L;
	
	private static final Logger log = LoggerFactory.getLogger(AssetServiceImpl.class);
	
	private DataSource mObjDataSource;
	private DomainDAOBuilder mObjDomainDAOBuilder;
	
	public AssetServiceImpl(final DataSource objDatasSource, final DomainDAOBuilder objDAOBuilder)
	{
		setDataSource(objDatasSource);
		setDAOBuilder(objDAOBuilder);
	}

	public List<Asset> getAllAssets() throws SQLException
	{
		return null;
	}

	public Asset getAssetById(final int iId)
	{
		try
			{
			CallableStatement objStatement = getDataSource().getConnection().prepareCall("get_assets_by_id(?)");
			ResultSet objResults;
			
			objStatement.setInt(1, iId);
			
			objResults = objStatement.executeQuery();
			
			if(objResults.next())
				return(getDAOBuilder().createAssetFromResults(objResults));
			else
				{
				log.error("Procedure 'get_asset_by_id' returned no rows");
				
				return(new Asset());
				}
			}
		catch(SQLException objException)
			{
			log.error("There was a problem with the call to 'get_asset_by_id'", objException);
			
			return(new Asset());
			}
	}

	public List<Asset> getAssetsByCategory(final Category objCategory) throws SQLException
	{
		return(null);
	}

	public List<Asset> getAssetsByItemNumber(final String sItemNumber) throws SQLException
	{
		return(null);
	}

	public List<Asset> getAssetsByPoster(final AppUser objPoster) throws SQLException
	{
		return(null);
	}

	public List<Asset> getAssetsByStatus(final AssetStatus objStatus) throws SQLException
	{
		return(null);
	}

	public List<Asset> getAssetsByTitle(final String sTitle) throws SQLException
	{
		return(null);
	}

	protected DataSource getDataSource()
	{
		return(mObjDataSource);
	}
	
	protected DomainDAOBuilder getDAOBuilder()
	{
		return(mObjDomainDAOBuilder);
	}
	
	public Asset insertAsset(Asset objAsset) throws SQLException
	{
		return null;
	}
	
	protected void setDataSource(final DataSource objDatasSource)
	{
		mObjDataSource = objDatasSource;
	}
	
	protected void setDAOBuilder(final DomainDAOBuilder objDAOBuilder)
	{
		mObjDomainDAOBuilder = objDAOBuilder;
	}
}