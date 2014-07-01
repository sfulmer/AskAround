package net.draconia.askaround.util;

import java.io.IOException;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class DateSerializer extends JsonSerializer<Date> implements Serializable
{
	private static final long serialVersionUID = 2573594318318588874L;

	public void serialize(final Date dtValue, final JsonGenerator objGenerator, final SerializerProvider objProvider) throws IOException, JsonProcessingException
	{
		SimpleDateFormat objDateFormat = new SimpleDateFormat("MM/dd/yyyy G HH:mm:ss aa");
		
		objGenerator.writeString(objDateFormat.format(dtValue));
	}
}