package net.draconia.askaround.util;

import java.io.IOException;
import java.io.Serializable;

import java.math.BigDecimal;

import java.text.DecimalFormat;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class CurrencySerializer extends JsonSerializer<BigDecimal> implements Serializable
{
	private static final long serialVersionUID = 2573594318318588874L;

	public void serialize(final BigDecimal dValue, final JsonGenerator objGenerator, final SerializerProvider objProvider) throws IOException, JsonProcessingException
	{
		DecimalFormat objFormat = new DecimalFormat("###,###,###,##0.00");
		
		objGenerator.writeString(objFormat.format(dValue));
	}
}