package net.draconia.askaround.service;

import java.util.List;

import net.draconia.askaround.domain.Module;

public interface ModuleService
{
	public Module findById(final int iModuleId);
	public List<Module> findByName(final String sName);
	public List<Module> getAllModules();
	public void insert(final Module objModule);
	public void remove(final Module objModule);
}