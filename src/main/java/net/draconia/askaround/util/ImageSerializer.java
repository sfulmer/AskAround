package net.draconia.askaround.util;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.Serializable;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class ImageSerializer extends JsonSerializer<Image> implements Serializable
{
	private static final long serialVersionUID = 2573594318318588874L;

	public void serialize(final Image objValue, final JsonGenerator objGenerator, final SerializerProvider objProvider) throws IOException, JsonProcessingException
	{
		ByteArrayOutputStream objStream = new ByteArrayOutputStream();
		
		ImageIO.write(((BufferedImage)(objValue)), "jpg", objStream);
		objStream.flush();
		
		objGenerator.writeString(Base64.encodeBase64String(objStream.toByteArray()));
	}
}