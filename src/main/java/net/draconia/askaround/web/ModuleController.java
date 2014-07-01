package net.draconia.askaround.web;

import javax.servlet.http.HttpServletRequest;

import net.draconia.askaround.domain.Menu;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/modules")
public class ModuleController
{
	@RequestMapping(method=RequestMethod.POST, consumes="application/json")
	public String getModule(@RequestBody Menu objMenuItem, final HttpServletRequest objRequest)
	{
		objRequest.getSession().setAttribute("defaultMenu", objMenuItem);
		
		return("forward:/" + objMenuItem.getModule().getURL());
	}
}