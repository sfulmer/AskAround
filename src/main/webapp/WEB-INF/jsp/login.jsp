<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
		<title>Login</title>
		<script src="scripts/controllers/login.js"></script>
		<script>
			$(document).ready(function()
			{
				loginController = new LoginController();
				
				loginController
					.setUsernameField($("#frmLogin #txtUserName"))
					.setPasswordField($("#frmLogin #txtPassword"))
					.setLoginButton($("#frmLogin #btnLogin"))
					.setSignupLabel($("#frmLogin #lblSignUp"))
					.setupView();
				
				$(document).trigger("load", ["login", loginController]);
			});
		</script>
	</head>
	<body>
		<form action="api/log/in" id="frmLogin" method="post" onsubmit="return(false);">
			<table style="width: 100%;">
				<tr>
					<td colspan="2" style="left: -35%; position: relative;">Login</td>
				</tr>
				<tr><td colspan="2">&nbsp;</td></tr>
				<tr>
					<td>Username:</td>
					<td><input id="txtUserName" type="text" value="${appUser.loginInfo.username}" /></td>
				</tr>
				<tr>
					<td>Password:</td>
					<td><input id="txtPassword" type="password" value="${appUser.loginInfo.passcode}" /></td>
				</tr>
				<tr><td colspan="2">&nbsp;</td></tr>
				<tr>
					<td colspan="2"><button id="btnLogin">Login</button></td>
				</tr>
				<tr>
					<td colspan="2"><span id="lblSignUp">Sign up</span>
				</tr>
			</table>
		</form>
	</body>
</html>