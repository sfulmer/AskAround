package net.draconia.askaround.service;

import java.util.List;

import net.draconia.askaround.domain.Menu;

public interface MenuService
{
	public void insert(final Menu objMenu);
	public Menu findById(final int iMenuId);
	public List<Menu> findByName(final String sName);
	public List<Menu> getAllMenus();
	public void remove(final Menu objMenu);
}