package net.draconia.askaround.web;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.draconia.askaround.domain.AppUser;
import net.draconia.askaround.service.AppUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/api/log")
public class LoginController
{
	private static Logger log = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private AppUserService mObjAppUserService;
	
	protected AppUserService getAppUserService()
	{
		return(mObjAppUserService);
	}
	
	@RequestMapping(value={"/in"}, method=RequestMethod.GET)
	public String getLoginForm(final HttpServletRequest objRequest)
	{
		AppUser objAppUser;
		HttpSession objSession = objRequest.getSession(true);
		
		objAppUser = ((AppUser)(objSession.getAttribute("appUser")));
		
		if(objAppUser == null)
			{
			objAppUser = new AppUser();
			
			objSession.setAttribute("appUser", objAppUser);
			}
		
		objSession.removeAttribute("inSignup");
		
		return("login");
	}
	
	@RequestMapping(value={"/status"}, method=RequestMethod.GET)
	public @ResponseBody AppUser getStatus(final HttpServletRequest objRequest)
	{
		AppUser objAppUser;
		HttpSession objSession = objRequest.getSession(true);
		
		objAppUser = ((AppUser)(objSession.getAttribute("appUser")));
		
		if(objAppUser == null)
			{
			objAppUser = new AppUser();
			
			objSession.setAttribute("appUser", objAppUser);
			}
		
		return(objAppUser);
	}
	
	protected void setAppUserService(final AppUserService objAppUserService)
	{
		mObjAppUserService = objAppUserService;
	}
	
	@RequestMapping(value={"/in"}, method=RequestMethod.POST)
	public @ResponseBody AppUser login(@RequestParam("username") String sUserName, @RequestParam("password") String sPassword, HttpServletRequest objRequest) throws IOException
	{
		AppUser objAppUser;
		HttpSession objSession = objRequest.getSession(true);
		
		try
			{
			objAppUser = getAppUserService().getUserByCredentials(sUserName, sPassword);
			
			if(objAppUser == null)
				objAppUser = new AppUser();
			else
				objAppUser.getLoginInfo().setAuthenticated(true);
			
			objSession.setAttribute("appUser", objAppUser);
			
			return(objAppUser);
			}
		catch(SQLException objException)
			{
			log.error("Failed to retrieve user from database with credentials (" + sUserName + ", " + sPassword + ")", objException);
			
			objAppUser = new AppUser();
			
			return(objAppUser);
			}
	}
	
	@RequestMapping(value={"/out"}, method=RequestMethod.POST)
	@ResponseBody
	public AppUser logout(HttpServletRequest objRequest) throws IOException
	{
		objRequest.getSession().removeAttribute("appUser");
		
		return(new AppUser());
	}
}