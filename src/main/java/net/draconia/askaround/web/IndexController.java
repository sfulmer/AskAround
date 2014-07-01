package net.draconia.askaround.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class IndexController
{
	@RequestMapping(method = RequestMethod.GET)
	public String index(final HttpServletRequest objRequest)
	{
		Boolean bInSignup;
		HttpSession objSession = objRequest.getSession(true);
		
		bInSignup = ((Boolean)(objSession.getAttribute("inSignup")));
		
		if(bInSignup == null)
			objSession.setAttribute("inSignup", false);
		
		return("index");
	}
}