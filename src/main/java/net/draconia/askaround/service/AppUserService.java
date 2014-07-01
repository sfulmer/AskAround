package net.draconia.askaround.service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import net.draconia.askaround.domain.AppUser;

public interface AppUserService
{
	public AppUser getUserById(final int iId) throws SQLException;
	public AppUser getUserByCredentials(final String sUserName, final String sPasscode) throws SQLException;
	public List<AppUser> getUsersByName(final String sFirstName, final String sLastName) throws SQLException;
	public List<AppUser> getUsersBySignupDate(final Date dtSignup) throws SQLException;
	public AppUser insert(final AppUser objAppUser);
}