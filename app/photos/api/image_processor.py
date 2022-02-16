from image_edit import *


class ImageProcessor:

    def __init__(self, photo):
        self.image = photo.image
        self.image_editor = ImageEdit(photo.image.path)

    def process(self, effect_obj):
        for effect_type in effect_obj:
            effect_data = effect_obj[effect_type]
            if(effect_data):
                try:
                    editor_method = getattr(self, effect_type)
                    if editor_method:
                        editor_method(effect_data)
                except:
                    pass

    def preview(self):
        return self.image_editor.preview()

    def applied_effects(self):
        return self.image_editor.applied_effects

    def save(self):
        self.image_editor.save()
        return self.image.url.replace('main', 'edited')

    def enhance(self, effect_data):
        for effect_data_type in effect_data:
            self.image_editor.enhance(
                effect_data_type, float(effect_data[effect_data_type]))

    def filter(self, effect_data):
        for effect_data_type in effect_data:
            self.image_editor.filter(effect_data_type)

    def transform(self, effect_data):
        for effect_data_type in effect_data:
            method = getattr(self.image_editor, effect_data_type)
            if method:
                method()

    def text_overlay(self, effect_data):
        height = self.image._get_height()
        width = self.image._get_width()
        x = effect_data.get('x', 50)
        y = effect_data.get('y', 50)
        font_size = effect_data.get('fontSize', 50)
        text = effect_data.get('textValue', 'Hello')
        color = effect_data.get('color', '#000')
        font_name = effect_data.get('font_name', 'Honey-I-spilt-Verdana.ttf')
        actual_x = int(float(x)/100 * int(width))
        actual_y = int(float(y)/100 * int(height))
        actual_font_size = int(float(font_size)/100 * (int(width)/ 2))
        self.image_editor.text(text, actual_x, actual_y, color, actual_font_size, font_name)

    def colorize(self, effect_data):
        black = effect_data.get('black','#000')
        white = effect_data.get('white','#fff')
        self.image_editor.colorize(black, white)

    def border(self, effect_data):
        color = effect_data.get('border_color', '#000')
        size = effect_data.get('size', 10)
        self.image_editor.expand(int(size), color)

    def effect(self, effect_data):
        for effect_data_type in effect_data:
            method = getattr(self.image_editor, effect_data_type)
            if method:
                method(effect_data[effect_data_type])
