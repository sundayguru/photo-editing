from PIL import Image, ImageFilter, ImageOps, ImageStat, ImageEnhance, ImageDraw, ImageFont
import base64, cStringIO, os


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

    def __init__(self, path):
        self.path = path
        self.font = None
        try:
            self.image = Image.open(path)
            self.output = self.image
        except:
            raise ValueError('Unable to open specified image path')

    def black_and_white(self):
        """ Translates a color image to black and white. """
        self.output = self.output.convert('L')

    def filter(self, filter_type):
        """ Applies a pre-defined set of filters. """
        self.output = self.output.filter(self.filters[filter_type])

    def enhance(self, enhance_type, value):
        """ Used to enhance image brightness, color, contrast and sharpness. """
        method = getattr(ImageEnhance,enhance_type)
        if method:
            actual_value = (value/100) * self.max_enhance
            enhancement = method(self.output)
            self.output = enhancement.enhance(actual_value)

    def quantize(self, value=256):
        """ Convert the image to ‘P’ mode with the specified number of colors. """
        self.image_format = 'PNG'
        self.output = self.output.quantize(value)

    def gaussian_blur(self, radius):
        self.output = self.output.filter(ImageFilter.GaussianBlur(radius))

    def auto_contrast(self, cutoff=0):
        self.output = ImageOps.autocontrast(self.output, cutoff)

    def posterize(self, bit=1):
        self.output = ImageOps.posterize(self.output, bit)

    def solarize(self, threshold=128):
        self.output = ImageOps.solarize(self.output, threshold)

    def invert(self):
        self.output = ImageOps.invert(self.output)

    def colorize(self, black="#000", white="#fff"):
        self.black_and_white()
        self.output = ImageOps.colorize(self.output, black, white)

    def remove_border(self, border_size=0):
        self.output = ImageOps.crop(self.output, border_size)

    def rotate(self, value):
        self.output = self.output.rotate(value)

    def crop(self, box):
        self.output = self.output.crop(box)

    def expand(self, border=10, fill="#ff0"):
        self.output = ImageOps.expand(self.output, border=border, fill=fill)

    def vertical_flip(self):
        self.output = ImageOps.flip(self.output)

    def mirror(self):
        self.output = ImageOps.mirror(self.output)

    def grayscale(self):
        self.output = ImageOps.grayscale(self.output)

    def equalize(self, mask=None):
        self.output = ImageOps.equalize(self.output, mask)

    def unsharp_mask(self, radius):
        self.output = self.output.filter(ImageFilter.UnsharpMask(radius))

    def set_font(self, font='Honey-I-spilt-Verdana.ttf', font_size=100):
        fonts_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'static/fonts')
        self.font = ImageFont.truetype(fonts_path + '/' + font, font_size)

    def text(self, text, x, y, fill=(255,255,255)):
        draw = ImageDraw.Draw(self.output)
        if not self.font:
            self.set_font()
        draw.text((x,y), text, font=self.font, fill=fill)
        del draw

    def line(self, start_x=0, end_x=100, start_y=0, end_y=100, fill="#fff", width=50):
        draw = ImageDraw.Draw(self.output)
        draw.line((start_x, start_y, end_x, end_y), fill=fill, width=width)
        del draw

    def rectangle(self, start_x=0, end_x=100, start_y=0, end_y=100, fill="#fff"):
        draw = ImageDraw.Draw(self.output)
        draw.rectangle((start_x, start_y, end_x, end_y), fill=fill)
        del draw

    def preview(self):
        buffered = cStringIO.StringIO()
        self.output.save(buffered, format=self.image_format)
        return base64.b64encode(buffered.getvalue())

    def save(self):
        self.output.save(self.path.replace('main', 'edited'), format=self.image_format)
