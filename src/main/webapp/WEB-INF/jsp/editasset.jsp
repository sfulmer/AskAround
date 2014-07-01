<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<head>
		<link href="styles/smoothness/jquery-ui-1.10.4.custom.css" rel="stylesheet" />
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
		<script src="scripts/jquery-ui-1.10.4.custom.js"></script>
		<script src="scripts/controllers/editassets.js"></script>
		<script src="scripts/models/address.js"></script>
		<script src="scripts/models/addressline.js"></script>
		<script src="scripts/models/asset.js"></script>
		<script src="scripts/models/assetimage.js"></script>
		<script src="scripts/models/assetstatus.js"></script>
		<script src="scripts/models/category.js"></script>
		<script src="scripts/models/city.js"></script>
		<script src="scripts/models/company.js"></script>
		<script src="scripts/models/country.js"></script>
		<script src="scripts/models/office.js"></script>
		<script src="scripts/models/state.js"></script>
		<script src="scripts/models/zipcode.js"></script>
		<script>
			$(document).ready(function()
			{
				editAssetsController = new EditAssetsController();
				
				editAssetsController
					.setAssetImage($("div#divEditAsset img#imgAsset"))
					.setCategoryDropDown($("div#divEditAsset select#cboCategory"))
					.setDepreciatedValueInput($("div#divEditAsset input#txtDepreciatedValue"))
					.setDescriptionInput($("div#divEditAsset textarea#txtDescription"))
					.setItemNumberInput($("div#divEditAsset input#txtItemNumber"))
					.setRetailValueInput($("div#divEditAsset input#txtRetailValue"))
					.setFileUploadButton($("div#divEditAsset button#btnUpload"))
					.setFileUploadControl($("div#divEditAsset input#fileUpload"))
					.setImageHeightInput($("div#divEditAsset input#numHeight"))
					.setImageWidthInput($("div#divEditAsset input#numWidth"))
					.setStatusDropDown($("div#divEditAsset select#cboStatus"))
					.setSubCategoryDropDown($("div#divEditAsset select#cboSubCategory"))
					.setTitleInput($("div#divEditAsset input#txtTitle"))
					.setupView()
					.loadModel(${assetId});
				
				$(".tabs").tabs();
				
				$(document).trigger("load", ["editasset", editAssetsController]);
			});
		</script>
		<style type="text/css">
			div#divEditAsset
			{
				font-size:			.9em;
			}
			
			div#divEditAsset button
			{
				font-weight:		bold;
			}
			
			div#divEditAsset label
			{
				font-weight:		bold;
			}
			
			div#divEditAsset span.mnemonic
			{
				text-decoration:	underline;
			}
			
			div#divEditAsset table
			{
				table:				100%;
			}
			
			div#divEditAsset table tr td
			{
				font-weight:		normal;
				text-align:			left;
				vertical-align: 	top;
			}
			
			div#divEditAsset textarea
			{
				resize:				none;
			}
		</style>
		<title>Post Asset</title>
	</head>
	<body id="bodyPostAsset">
		<div id="divEditAsset">
			<div class="tabs">
				<ul>
					<li><a href="#tabBasics"><label><span class="mnemonic">B</span>asics</label></a></li>
					<li><a href="#tabDetails"><label>De<span class="mnemonic">t</span>ails</label></a></li>
					<li><a href="#tabImage"><label><span class="mnemonic">I</span>mage</label></a></li>
				</ul>
				<div id="tabBasics">
					<table>
						<tr>
							<td><label>Poster:</label></td>
							<td>Seth Fulmer</td>
						</tr>
						<tr>
							<td><label for="txtItemNumber">Item <span class="mnemonic">N</span>umber:</label></td>
							<td><input id="txtItemNumber" title="Item Number for the Asset" type="text" value="${editasset.itemNumber}" /></td>
						</tr>
						<tr>
							<td><label for="txtTitle"><span class="mnemonic">T</span>itle:</label></td>
							<td><input id="txtTitle" title="Title for the Asset" type="text" value="${editasset.title}" /></td>
						</tr>
						<tr>
							<td><label for="txtDescription"><span class="mnemonic">D</span>escription:</label></td>
							<td><textarea id="txtDescription"  rows="4" title="Description for the Asset">${editasset.description}</textarea></td>
						</tr>
						<tr>
							<td><label for="cboCategory"><span class="mnemonic">C</span>ategory:</label></td>
							<td>
								<select id="cboCategory" title="Category of the Asset">
									<option value="0">&nbsp;</option>
								<c:forEach items="${categories}" var="category">
									<option value="${category.id}">${category.name}</option>
								</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<td><label for="cboSubCategory">S<span class="mnemonic">u</span>b-Category:</label></td>
							<td>
								<select id="cboSubCategory" title="Sub-Category of the Asset">
									<option value="0">&nbsp;</option>
								<c:forEach items="${categories}" var="category">
									<option value="${category.id}">${category.name}</option>
								</c:forEach>
								</select>
							</td>
						</tr>
						<tr>
							<td><label for="cboAssetStatus"><span class="mnemonic">S</span>tatus:</label></td>
							<td>
								<select id="cboAssetStatus" title="Status of the Asset">
									<option value="0">&nbsp;</option>
								<c:forEach items="${statuses}" var="status">
									<option value="${status.id}">${status.status}</option>
								</c:forEach>
								</select>
							</td>
						</tr>
					</table>
				</div>
				<div id="tabDetails">
					<table>
						<tr>
							<td><label for="txtPostingDate"><span class="mnemonic">P</span>osting Date:</label></td>
							<td><input id="txtPostingDate" title="Date the Asset was posted" type="datetime" value="<fmt:formatDate pattern="MM/dd/yyyy HH:mm:ss" value="${editasset.postedDate}" />" /></td>
						</tr>
						<tr>
							<td><label for="txtExpirationDate">E<span class="mnemonic">x</span>pires:</label></td>
							<td><input id="txtExpirationDate" title="Date the Asset expires" type="datetime" /></td>
						</tr>
						<tr>
							<td colspan="2" style="font-size: 1.1em;">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="2" style="font-weight: bold;">Asset Value:</td>
						</tr>
						<tr>
							<td><label for="txtRetailValue"><span class="mnemonic">R</span>etail:</label></td>
							<td>
								${currency_symbol}<input class="currency" id="txtRetailValue" size="15" style="text-align: right;" title="Retail Value of the Asset" type="text" />
							</td>
						</tr>
						<tr>
							<td><label for="txtDepreciatedValue"><span class="mnemonic">D</span>epreciated:</label></td>
							<td>
								${currency_symbol}<input id="txtDepreciatedValue" size="15" style="text-align: right;" title="Depreciated Value of the Asset" type="text" />
							</td>
						</tr>
					</table>
				</div>
				<div id="tabImage">
					<table>
						<tr><td colspan="2" style="font-weight: bold;">Current Asset Image:</td></tr>
						<tr>
							<td>
								<div style="background-color: white;border: 1px solid #EEEEEE;height: 256px;width: 256px;">
									<img field="editasset.image.data" height="${editasset.image.height}" id="imgAsset" src="data:image/png;base64,${editasset.image.base64}" width="${editasset.image.width}" />
								</div>
							</td>
							<td>
								<table>
									<tr>
										<td><label for="numWidth"><span class="mnemonic">W</span>idth:</label></td>
									</tr>
									<tr>
										<td><input field="editasset.image.width" id="numWidth" max="256" min="32" maxlength="3" step="1" title="Width of Asset's Image" type="number" value="${editasset.image.width}" /></td>
									</tr>
									<tr>
										<td><label for="numHeight"><span class="mnemonic">H</span>eight:</label></td>
									</tr>
									<tr>
										<td><input field="editasset.image.height" id="numHeight" max="256" min="32" maxlength="3" step="1" title="Height of Asset's Image" type="number" value="${editasset.image.height}" /></td>
									</tr>
									<tr><td>&nbsp;</td></tr>
									<tr>
										<td colspan="2">
											<input id="fileUpload" style="display: none;" type="file" />
											<button accesskey="u" id="btnUpload"><span class="mnemonic">U</span>pload...</button>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</body>
</html>