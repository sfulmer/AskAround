<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
		<title>Signup</title>
		<script src="scripts/controllers/signup.js"></script>
		<script>
			var signupController;
			
			$(document).ready(function()
			{
				signupController = new SignupController();
				
				signupController
					.setCancelButton($("div#divSignup button#btnCancel"))
					.setFirstNameField($("div#divSignup input#txtFirstName"))
					.setIdLabel($("div#divSignup div#divId"))
					.setLastNameField($("div#divSignup input#txtLastName"))
					.setUsernameField($("div#divSignup input#txtUserName"))
					.setPassword1Field($("div#divSignup input#txtPassword1"))
					.setPassword2Field($("div#divSignup input#txtPassword2"))
					.setSignupButton($("div#divSignup input#btnSignup"))
					.setMainLayer($("div#divSignup"))
					.setupView();
				
				$(document).trigger("load", ["signup", signupController]);
			})
		</script>
		<style type="text/css">
			div#divSignup
			{
				height:				100%;
				width:				100%;
			}
			
			div#divSignup div.table
			{
				display:			table;
				margin:				0 auto;
				width:				90%;
			}
			
			div#divSignup div.table div#divRowId div.cell
			{
				padding-bottom: 	1em;
			}
			
			div#divSignup div.caption
			{
				display:			table-caption;
				left:				10%;
				padding-bottom:		1em;
				position:			relative;
				text-align:			left;
			}
			
			div#divSignup div.body
			{
				text-align:			left;
			}
			
			div#divSignup div.body div.label
			{
				font-weight: 		bold;
			}
			
			div#divSignup div.body span
			{
				text-decoration: 	underline;
			}
			
			div#divSignup div.cell
			{
				display:			table-cell;
			}
			
			div#divSignup div.footer
			{
				text-align:			center;
			}
			
			div#divSignup div.footer button
			{
				font-weight:		bold;
			}
			
			div#divSignup div.footer button span
			{
				text-decoration:	underline;
			}
			
			div#divSignup div.row
			{
				display:			table-row;
			}
			
			#trPassword0
			{
				display:			none;
			}
		</style>
	</head>
	<body>
		<div id="divSignup">
			<div class="table">
				<div class="caption">Signup</div>
				<div class="row" id="divRowId">
					<div class="body cell label" id="divLblId">Id:</div>
					<div class="body cell" id="divId">${appUser.appUserId}</div>
				</div>
				<div class="row">
					<div class="body cell label positioner"><label accesskey="f" for="txtFirstName"><span>F</span>irst name:</label></div>
					<div class="body cell"><input class="required" id="txtFirstName" type="text" value="${appUser.firstName}" /></div>
				</div>
				<div class="row">
					<div class="body cell label positioner"><label accesskey="l" for="txtLastName"><span>L</span>ast name:</label></div>
					<div class="body cell"><input class="required" id="txtLastName" type="text" value="${appUser.lastName}" /></div>
				</div>
				<div class="row">
					<div class="body cell label positioner">Signup Date:</div>
					<div class="body cell" style="font-weight: bold;padding-bottom: 1em;"><fmt:formatDate pattern="MM/dd/yyyy hh:mm:ss a z" value="${appUser.signupDate}" /></div>
				</div>
				<div class="row">
					<div class="body cell label positioner"><label accesskey="u" for="txtUserName"><span>U</span>sername:</label></div>
					<div class="body cell"><input class="required" id="txtUserName" type="text" value="${appUser.username}" /></div>
				</div>
				<div class="row" id="trPassword0">
					<div class="body cell label positioner"><label accesskey="o" for="txtPassword0"><span>O</span>ld Password:</label></div>
					<div class="body cell"><input class="required" id="txtPassword0" type="password" value="" /></div>
				</div>
				<div class="row">
					<div class="body cell label positioner"><label accesskey="p" for="txtPassword1"><span>P</span>assword:</label></div>
					<div class="body cell"><input class="matching password required" id="txtPassword1" type="password" value="" /></div>
				</div>
				<div class="row">
					<div class="body cell label positioner"><label accesskey="r" for="txtPassword2"><span>O</span>ld Password:</label></div>
					<div class="body cell" style="padding-bottom: 1em;"><input class="matching password required" id="txtPassword2" type="password" value="" /></div>
				</div>
			</div>
			<div class="table" id="divButtons">
				<div class="row">
					<div class="cell footer"><button accesskey="s" id="btnSignup"><span>S</span>ignup</button></div>
					<div class="cell footer"><button accesskey="c" id="btnCancel"><span>C</span>ancel</button></div>
				</div>
			</div>
		</div>
	</body>
</html>