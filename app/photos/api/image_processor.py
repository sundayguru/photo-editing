from image_edit import *

class ImageProcessor:
    def __init__(self, photo):
        self.image = photo.image
        self.image_editor = ImageEdit(photo.image.path)

    def process(self, effect_obj):
        for effect_type in effect_obj:
            effect_data = effect_obj[effect_type]
            if(effect_data):
                editor_method = getattr(self, effect_type)
                if editor_method:
                    editor_method(effect_data)

    def preview(self):
        return self.image_editor.preview()

    def save(self):
        self.image_editor.save()
        return self.image.url.replace('main', 'edited')

    def enhance(self, effect_data):
        for effect_data_type in effect_data:
            self.image_editor.enhance(effect_data_type, float(effect_data[effect_data_type]))

    def filter(self, effect_data):
        for effect_data_type in effect_data:
            self.image_editor.filter(effect_data_type)

    def transform(self, effect_data):
        for effect_data_type in effect_data:
            method = getattr(self.image_editor, effect_data_type)
            if method:
                method()

    def effect(self, effect_data):
        for effect_data_type in effect_data:
            method = getattr(self.image_editor, effect_data_type)
            if method:
                method(effect_data[effect_data_type])

