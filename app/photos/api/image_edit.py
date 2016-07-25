import base64
import cStringIO
import os

from django.http import HttpResponse
from PIL import (
    Image, ImageFilter,
    ImageOps, ImageStat,
    ImageEnhance, ImageDraw,
    ImageFont
)


class ImageEdit:
    filters = {
        'blur': ImageFilter.BLUR,
        'contour': ImageFilter.CONTOUR,
        'detail': ImageFilter.DETAIL,
        'edge_enhance': ImageFilter.EDGE_ENHANCE,
        'edge_enhance_more': ImageFilter.EDGE_ENHANCE_MORE,
        'emboss': ImageFilter.EMBOSS,
        'find_edges': ImageFilter.FIND_EDGES,
        'smooth': ImageFilter.SMOOTH,
        'smooth_more': ImageFilter.SMOOTH_MORE,
        'sharpen': ImageFilter.SHARPEN,
    }
    enhancements = ['Color', 'Contrast', 'Brightness', 'Sharpness']
    image_format = 'JPEG'
    max_enhance = 2.0
    applied_effects = []

    def __init__(self, path):
        self.path = path
        self.font = None
        try:
            self.output = Image.open(path)
        except:
            raise ValueError('Unable to open specified image path')

    def add_effect(self, title):
        self.applied_effects.append(title)

    def convert(self, mode="RGB"):
        self.output = self.output.convert(mode)

    def black_and_white(self):
        """ Translates a color image to black and white. """
        self.convert('L')
        self.add_effect('black_and_white')

    def grayscale(self):
        """ Convert the image to grayscale. """
        self.output = ImageOps.grayscale(self.output)
        self.add_effect('grayscale')

    def invert(self):
        """ Negates the image. """
        self.convert()
        self.output = ImageOps.invert(self.output)
        self.add_effect('invert')

    def equalize(self):
        """ Equalize the image histogram. """
        self.output = ImageOps.equalize(self.output)
        self.add_effect('equalize')

    def filter(self, filter_type):
        """ Applies a pre-defined set of filters. """
        self.output = self.output.filter(self.filters[filter_type])
        self.add_effect(self.filters[filter_type])

    def enhance(self, enhance_type, value):
        """
        Used to enhance image brightness,
        color, contrast and sharpness.
        """
        method = getattr(ImageEnhance, enhance_type)
        if method:
            actual_value = (value/100) * self.max_enhance
            enhancement = method(self.output)
            self.output = enhancement.enhance(actual_value)
            self.add_effect(enhance_type)

    def quantize(self, value=256):
        """
        Convert the image to 'P' mode with the
        specified number of colors.
        """
        actual_value = float(value)/100 * 256
        self.output = self.output.quantize(int(actual_value))
        self.output = self.output.convert('RGB')
        self.add_effect('quantize')

    def gaussian_blur(self, radius):
        """ Gaussian blur filter. """
        actual_value = float(radius)/100 * 20
        self.output = self.output.filter(
            ImageFilter.GaussianBlur(int(actual_value)))
        self.add_effect('gaussian_blur')

    def auto_contrast(self, cutoff=0):
        """ Normalize image contrast. """
        self.convert()
        actual_value = float(cutoff)/100 * 50
        self.output = ImageOps.autocontrast(self.output, int(actual_value))
        self.add_effect('equalize')

    def posterize(self, bit=1):
        """ Reduce the number of bits for each color channel. """
        self.convert()
        actual_value = float(bit)/100 * 8
        self.output = ImageOps.posterize(self.output, int(actual_value))
        self.add_effect('posterize')

    def unsharp_mask(self, radius):
        """ Unsharp mask filter. """
        self.output = self.output.filter(ImageFilter.UnsharpMask(int(radius)))
        self.add_effect('unsharp_mask')

    def solarize(self, threshold=128):
        """ Invert all pixel values above a threshold """
        self.convert()
        actual_value = float(threshold)/100 * 256
        self.output = ImageOps.solarize(self.output, int(actual_value))
        self.add_effect('solarize')

    def remove_border(self, border_size=0):
        """ Remove border from image. """
        actual_value = float(border_size)/100 * 200
        self.output = ImageOps.crop(self.output, int(actual_value))
        self.add_effect('zoom')

    def rotate(self, value):
        """ Rotates image in a given angle. """
        actual_value = float(value)/100 * 360
        self.output = self.output.rotate(int(actual_value))
        self.add_effect('rotate')

    def colorize(self, black="#000", white="#fff"):
        """ applies colors to black and white image """
        self.black_and_white()
        self.output = ImageOps.colorize(self.output, black, white)
        self.add_effect('colorize')

    def expand(self, border=10, fill="#ff0"):
        """ Add border to image """
        self.output = ImageOps.expand(self.output, border=border, fill=fill)
        self.add_effect('border')

    def vertical_flip(self):
        """ Flip the image vertically (top to bottom). """
        self.output = ImageOps.flip(self.output)
        self.add_effect('vertical_flip')

    def mirror(self):
        """ Flip image horizontally (left to right). """
        self.output = ImageOps.mirror(self.output)
        self.add_effect('mirror')

    def set_font(self, font_size=100, font_name="Honey-I-spilt-Verdana.ttf"):
        """ Sets the font to be used for text drawing """
        fonts_path = os.path.join(
            os.path.dirname(os.path.dirname(
                os.path.dirname(__file__))), 'static/fonts')
        font_file =  fonts_path + '/' + font_name
        self.font = ImageFont.truetype(font_file, font_size)

    def text(self, text, x, y, fill=(255, 255, 255), font_size=100, font_name="Honey-I-spilt-Verdana.ttf"):
        """ Write text on an image """
        draw = ImageDraw.Draw(self.output)
        if not self.font:
            self.set_font(font_size, font_name)
        draw.text((x, y), text, font=self.font, fill=fill)
        del draw
        self.add_effect('text')

    def preview(self):
        """ Returns a base64 converted image """
        buffered = cStringIO.StringIO()
        self.output.save(buffered, format=self.image_format)
        return base64.b64encode(buffered.getvalue())

    def save(self):
        """ Saves modified image """
        path = self.path.replace('main', 'edited')
        edit_path = os.path.join(
            os.path.dirname(os.path.dirname(
                os.path.dirname(__file__))), 'media/edited')
        if not os.path.exists(edit_path):
            os.makedirs(edit_path)
        self.output.save(path, format=self.image_format)

    def download(self, title):
        response = HttpResponse(content_type="image/jpg")
        self.output.save(response, 'JPEG')
        response['Content-Disposition'] = 'attachment; filename="{}.jpg"'.format(title)
        return response
