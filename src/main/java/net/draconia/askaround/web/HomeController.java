package net.draconia.askaround.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/home")
public class HomeController
{
	@RequestMapping(method=RequestMethod.POST)
	public String getHome(HttpServletRequest objRequest)
	{
		return("home");
	}
}