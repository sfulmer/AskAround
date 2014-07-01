//***************************************************************************************
//* Common
//***************************************************************************************
function Common()
{ }

Common.defaultIfUndefined				=	function(value, vDefault)
{
	return((value == undefined) ? vDefault : value);
};

Common.executeScriptInAjaxLoadedPage	=	function(pnlContainer)
{
	var html = pnlContainer.html();
	var script = html.substring(html.indexOf("<script>") + 8, html.indexOf("<\/script"));
	
	eval(script);
};

Common.extractDimensionFromString		=	function(sValue, sUnit, vDefault)
{
	var value = Common.defaultIfUndefined(sValue, 0);
	
	if(Common.isNumeric(value))
		return(parseInt(value));
	else if(value.toString().toLowerCase().indexOf(sUnit))
		return(parseInt(value.substring(0, sValue.toLowerCase().indexOf(sUnit))));
	else
		return(parseInt(value));
};

Common.isNumeric						=	function(value)
{
	return((!isNaN(value)) && isFinite(value));
};

/*Common.loadScript						=	function(sScriptName)
{
	$.ajax(	{	async:		false
			,	cache:		true
			,	complete:	function(scriptText)
							{
								eval(scriptText.responseText);
							}
			,	dataType:	"script"
			,	url:		"scripts/" + sScriptName
			});
};*/

Common.loadCSSFromExternalContent		=	function(objContent)
{
	var arrStyles 	= (function(objContent)
	{
		var arrStyleTags = [];
		var iIndex = objContent.indexOf("<style");
		
		for(var iLength = objContent.length; (iIndex < iLength) && (iIndex >= 0); iIndex = objContent.indexOf("<style", iIndex))
			{
			var iNewIndex	= 	objContent.indexOf("</style>", iIndex);
			
			arrStyleTags.push(objContent.substring(iIndex, iNewIndex + "</style>".length));
			
			iIndex = iNewIndex;
			}
		
		return(arrStyleTags);
	})(objContent);
	
	for(var iLength = arrStyles.length, iLoop = 0; iLoop < iLength; iLoop++)
		{
		var sCSS = $(arrStyles[iLoop]).text().replace(/\/\*([\s\S]*)\*\//g, "").trim();
		
		if(sCSS.length > 0)
			{
			var arrTokens = sCSS.split(/[\{,\}]/);
			var arrSelectors = [];
			
			if(arrTokens[arrTokens.length - 1].trim().length <= 0)
				arrTokens.splice(arrTokens.length - 1, 1);
			
			for(var iLength = arrTokens.length, iLoop = 0; iLoop < iLength; iLoop+=2)
				arrSelectors[arrTokens[iLoop].trim()] = (function(sStyleText)
				{
					sStyleText = sStyleText.trim();
					
					if(sStyleText.length > 0)
						{
						var arrTokens = sStyleText.trim().split(/[;,\=,\:]/);
						var arrStyle = [];
						
						if(arrTokens[arrTokens.length - 1].trim().length <= 0)
							arrTokens.splice(arrTokens.length - 1, 1);
						
						for(var iLength = arrTokens.length, iLoop = 0; iLoop < iLength; iLoop+=2)
							if((arrTokens[iLoop].trim().length > 0) && (arrTokens[iLoop + 1].trim().length > 0))
								arrStyle[arrTokens[iLoop].trim()] = arrTokens[iLoop + 1].trim();
						
						return(arrStyle);
						}
				})(arrTokens[iLoop + 1]);
			
			for(sSelector in arrSelectors)
				for(sStyleKey in arrSelectors[sSelector])
					$(sSelector).css(sStyleKey, arrSelectors[sSelector][sStyleKey]);
			}
		}
};

Common.loadExternalCSSFromExternalContent	=	function(objContent)
{
	var arrLinks 	= (function(objContent)								// This retrieves all the link tags from the content passed to the method
	{
		var arrLinkTags = [];
		var sRegExp = /<\/?link\s+[^>]*>/g;
		var iIndex = objContent.indexOf(sRegExp);
		
		for(var iLength = objContent.length; (iIndex < iLength) && (iIndex >= 0); iIndex = objContent.indexOf(sRegExp, iIndex))
			{
			var iNewIndex = objContent.indexOf(">", iIndex);
			
			arrLinkTags.push(objContent.substring(iIndex, iNewIndex));
			
			iIndex = iNewIndex;
			}
		
		return(arrLinkTags);
	})(objContent);
	
	for(var iLength = arrLinks.length, iLoop = 0; iLoop < iLength; iLoop++)										// This loop is in case there are multiple link tags
		{	// This assumes proper HTML/XHTML is used and attributes are quoted - like all of my UI code is coded
		var iHREFIndex = arrLinks[iLoop].indexOf(/\"[^\"]*\"/g);												// Find me the first index (where the < is) of the link tag
		var sHREF = arrLinks[iLoop].substring(iHREFIndex + 7, arrLinks[iLoop].indexOf("\"", iHREFIndex) - 1); 	// Get me JUST the HREF within the quotations
		
		$.ajax(
			{	dataType:	"text"
			,	success:	function(data)
							{
								var sCSS = data.replace(/\/\*([\s\S]*)\*\//g, "").trim();			// Blowing away any comments
								
								if(sCSS.length > 0)													// Making sure that my CSS isn't blank (save future trouble)
									{
									var arrTokens = sCSS.split(/[\{,\}]/);							// Splits each selector into selector and style groupings alternated
									var arrSelectors = [];											// Data structure to hold selectors
									
									// When splitting arrays and strings, it seems if the last item is blank if the last character or item is a token upon which is split
									// So if the last item is empty, remove it so the next loop can function properly
									if(arrTokens[arrTokens.length - 1].trim().length <= 0)
										arrTokens.splice(arrTokens.length - 1, 1);
									
									for(var iLength = arrTokens.length, iLoop = 0; iLoop < iLength; iLoop+=2)	// Loop through the Tokenized array
										arrSelectors[arrTokens[iLoop].trim()] = (function(sStyleText)			// Calling a closure with the grouped style text(iLoop + 1)
										{	// closure returns dictionary/symbolic array with key/value pairs of the styles underneath the selector
											sStyleText = sStyleText.trim();		//Trim so no issues later
											
											if(sStyleText.length > 0)			// If the Style text is empty then it may be an empty selector (error but still checking!)
												{								// because Eclipse may have crashed so the CSS may have been flawed
												var arrTokens = sStyleText.trim().split(/[;,\=,\:]/);	// Split Style into individual styles as well as key/value pairs
												var arrStyle = [];				// Data Structure to hold selectors
												
												// Again, remove last item if it's empty so next loop works well
												if(arrTokens[arrTokens.length - 1].trim().length <= 0)
													arrTokens.splice(arrTokens.length - 1, 1);
												
												/* 
												 * Loop through Tokens
												 * make certain that the Token's key (iLoop) and its value (iLoop + 1) is properly valued
												 * if so, set the key inside the data structure to the value
												 */
												for(var iLength = arrTokens.length, iLoop = 0; iLoop < iLength; iLoop+=2)
													if((arrTokens[iLoop].trim().length > 0) && (arrTokens[iLoop + 1].trim().length > 0))
														arrStyle[arrTokens[iLoop].trim()] = arrTokens[iLoop + 1].trim();
												
												return(arrStyle);
												}
										})(arrTokens[iLoop + 1]);
									
									// Process the selectors in the data structure with jQuery to set the CSS.
									// It is assumed that the CSS is within a specifically named div or body so as not to mess up the main page
									for(sSelector in arrSelectors)
										for(sStyleKey in arrSelectors[sSelector])
											$(sSelector).css(sStyleKey, arrSelectors[sSelector][sStyleKey]);
									}
							}
			,	type:		"get"
			,	url:		sHREF
			});
		}
};