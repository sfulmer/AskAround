<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
		<title>Ask-Around</title>
		<!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> -->
		<script src="scripts/jquery-1.11.0.js"></script>
		<script src="scripts/common.js"></script>
		<script src="scripts/models/LoginInfo.js"></script>
		<script src="scripts/models/address.js"></script>
		<script src="scripts/models/addressline.js"></script>
		<script src="scripts/models/appuser.js"></script>
		<script src="scripts/models/asset.js"></script>
		<script src="scripts/models/assetimage.js"></script>
		<script src="scripts/models/assetstatus.js"></script>
		<script src="scripts/models/category.js"></script>
		<script src="scripts/models/city.js"></script>
		<script src="scripts/models/company.js"></script>
		<script src="scripts/models/country.js"></script>
		<script src="scripts/models/menu.js"></script>
		<script src="scripts/models/module.js"></script>
		<script src="scripts/models/office.js"></script>
		<script src="scripts/models/state.js"></script>
		<script src="scripts/models/zipcode.js"></script>
		<script src="scripts/ui/tag.js"></script>
		<script src="scripts/ui/panel.js"></script>
		<script src="scripts/ui/static.js"></script>
		<script src="scripts/ui/header.js"></script>
		<script src="scripts/ui/loginpanel.js"></script>
		<script src="scripts/ui/signuppanel.js"></script>
		<script src="scripts/controllers/index.js"></script>
		<script>
			$(document).ready(function()
			{
				$.ajax(	{	dataType:	"text"
						,	success:	function(data)
										{
											indexController = new IndexController(${inSignup}, data);
											indexController.setupView();
										}
						,	type:		"get"
						,	url:		"api/log/status"
						});
			});
		</script>
	</head>
</html>