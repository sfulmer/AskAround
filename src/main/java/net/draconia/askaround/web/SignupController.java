package net.draconia.askaround.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.draconia.askaround.domain.AppUser;
import net.draconia.askaround.service.AppUserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value="/api/signup")
public class SignupController
{
	@Autowired
	private AppUserService mObjAppUserService;
	
	protected AppUserService getAppUserService()
	{
		return(mObjAppUserService);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public String getSignupForm(final HttpServletRequest objRequest)
	{
		AppUser objAppUser;
		HttpSession objSession = objRequest.getSession();
		
		objAppUser = ((AppUser)(objSession.getAttribute("appUser")));
		
		if(objAppUser == null)
			objAppUser = new AppUser();
			
		objSession.setAttribute("inSignup", true);
		objSession.setAttribute("appUser", objAppUser);
		
		return("signup");
	}
	
	protected void setAppUserService(final AppUserService objAppUserService)
	{
		mObjAppUserService = objAppUserService;
	}
	
	@RequestMapping(value={"/add"}, method=RequestMethod.POST)
	public @ResponseBody AppUser signup(	@RequestParam("username") String sUserName
										, 	@RequestParam("password") String sPassword
										,	@RequestParam("firstname") String sFirstName
										,	@RequestParam("lastname") String sLastName
										,	HttpServletRequest objRequest)
	{
		AppUser objAppUser = ((AppUser)(objRequest.getSession().getAttribute("appUser")));
		
		if(objAppUser == null)
			objAppUser = new AppUser();
		
		objAppUser.setFirstName(sFirstName);
		objAppUser.setLastName(sLastName);
		objAppUser.getLoginInfo().setUsername(sUserName);
		objAppUser.getLoginInfo().setPasscode(sPassword);
		
		return(getAppUserService().insert(objAppUser));
	}
	
	@RequestMapping(value={"/out"}, method=RequestMethod.POST)
	@ResponseBody
	public AppUser logout(HttpServletRequest objRequest)
	{
		objRequest.getSession().removeAttribute("appUser");
		
		return(new AppUser());
	}
}