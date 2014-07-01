<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
	<head>
		<title>Assets</title>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
		<script src="scripts/controllers/assets.js"></script>
		<script src="scripts/ui/editassetpanel.js"></script>
		<script>
			$(document).ready(function()
			{
				assetsController = new AssetsController();
				
				assetsController
					.setDeleteButton($("div#divAssets table tfoot tr th button#btnDeleteAsset"))
					.setFirstButton($("div#divAssets table tfoot tr th button#btnFirstPage"))
					.setLastButton($("div#divAssets table tfoot tr th button#btnLastPage"))
					.setNextButton($("div#divAssets table tfoot tr th button#btnNextPage"))
					.setPageNumber($("div#divAssets table tfoot tr th input#numPageNumber"))
					.setPageSize($("div#divAssets table tfoot tr th input#numRecordCountPerPage"))
					.setPostAssetButton($("div#divAssets table tfoot tr th button#btnPostAsset"))
					.setPreviousButton($("div#divAssets table tfoot tr th button#btnPreviousPage"))
					.setTableBody($("div#divAssets table tbody"))
					.setupView();
				
				$(document).trigger("load", ["assetsController", assetsController]);
			});
		</script>
		<style type="text/css">
			div#divAssets table
			{
				margin:				0% auto;
				width: 				100%;
			}
			
			div#divAssets table tbody tr td
			{
				text-align:			center;
			}
			
			div#divAssets table tfoot tr th button
			{
				font-weight:		bold;
			}
			
			div#divAssets table tfoot tr th button span
			{
				text-decoration:	underline;
			}
			
			div#divAssets input[type='number']
			{
				text-align:			right;
			}
		</style>
	</head>
	<body id="bodyAssets">
		<div id="divAssets" style="height: 100%;width: 100%">
			<table>
				<thead>
					<tr>
						<th><input id="chkSelect_All" title="Selects All Assets" type="checkbox" /></th>
						<th>Image</th>
						<th>Posting Date</th>
						<th>Item #</th>
						<th>Status</th>
						<th>Title</th>
						<th>Category</th>
						<th>Retail Value</th>
						<th>Depreciated Value</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th><button accesskey="d" id="btnDeleteAsset" title="Deletes selected assets after prompting user"><span>D</span>elete</button></th>
						<th colspan="7">
							<button id="btnFirstPage">&lt;&lt;</button>
							<button id="btnPreviousPage">&lt;</button>
							Page: <input id="numPageNumber" max="1" maxlength="1" min="1" size="3" type="number" value="1" /> of <span id="lblPageCount">1</span>
							&nbsp;&nbsp;Page Size: 
							<input id="numRecordCountPerPage" max="1" maxlength="1" min="1" size="3" step="5" type="number" value="1" /> 
							<button id="btnNextPage">&gt;</button>
							<button id="btnLastPage">&gt;&gt;</button>
						</th>
						<th><button accesskey="p" id="btnPostAsset" title="Posts new asset to the site"><span>P</span>ost Asset</button></th>
				</tfoot>
				<tbody></tbody>
			</table>
		</div>
	</body>
</html>