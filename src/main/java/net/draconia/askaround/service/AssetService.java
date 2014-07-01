package net.draconia.askaround.service;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;

import net.draconia.askaround.domain.AppUser;
import net.draconia.askaround.domain.Asset;
import net.draconia.askaround.domain.AssetStatus;
import net.draconia.askaround.domain.Category;

public interface AssetService extends Serializable
{
	public List<Asset> getAllAssets() throws SQLException;
	public Asset getAssetById(final int iId);
	public List<Asset> getAssetsByCategory(final Category objCategory) throws SQLException;
	public List<Asset> getAssetsByItemNumber(final String sItemNumber) throws SQLException;
	public List<Asset> getAssetsByPoster(final AppUser objPoster) throws SQLException;
	public List<Asset> getAssetsByStatus(final AssetStatus objStatus) throws SQLException;
	public List<Asset> getAssetsByTitle(final String sTitle) throws SQLException;
	public Asset insertAsset(final Asset objAsset) throws SQLException;
}