package net.draconia.askaround.web;

import java.io.IOException;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.draconia.askaround.domain.Menu;
import net.draconia.askaround.service.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/menu")
public class MenuController
{	
	private MenuService mObjMenuSystem;
	
	protected MenuService getMenuSystem()
	{
		return(mObjMenuSystem);
	}
	
	@RequestMapping(method = RequestMethod.POST, value={"/current"})
	public @ResponseBody Menu getCurrentMenu(final HttpServletRequest objRequest)
	{
		HttpSession objSession = objRequest.getSession();
		Menu objMenu = ((Menu)(objSession.getAttribute("defaultMenu")));
		
		return((objMenu == null) ? new Menu() : objMenu);
	}
	
	@RequestMapping(method=RequestMethod.POST)
	@ResponseBody
	public List<Menu> menus() throws IOException
	{
		return(getMenuSystem().getAllMenus());
	}
	
	@Autowired
	@Qualifier(value="menuService")
	protected void setMenuSystem(final MenuService objMenuSystem)
	{
		mObjMenuSystem = objMenuSystem;
	}
}