import json, os
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase


def register(client):
    user_detail = {
        'username': 'sundayguru',
        'email': 'test@example.com',
        'password': 'tester123',
    }
    return client.post('/api/v1/auth/register/', user_detail)


def login(client, username="sundayguru", password="tester123"):
    register(client)
    user_detail = {
        'username': username,
        'password': password
    }
    return client.post('/api/v1/auth/login/', user_detail)

def create_folder(client, name):
    data = {
        'name': name
    }
    return client.post('/api/v1/folders/', data)

def create_photo(client, folder_id=0):
    path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'static/images/FolderEmpty.png')
    with open(path) as photo:
        data = {
            'image': photo,
            'folder_id':folder_id
        }
        return client.post('/api/v1/photos/', data)
    return None

def decode_json(response):
    return json.loads(response.content)

class AccountTest(APITestCase):
    """Test /api/v1/auth/ endpoint"""

    def test_register(self):
        response = register(self.client)
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        response = login(self.client)
        self.assertEqual(response.status_code, 200)
        result = decode_json(response)
        self.assertEqual(result.get('user') ,'sundayguru')
        response = login(self.client, 'wrong user')
        result = decode_json(response)
        self.assertEqual(result.get('login'), False)

    def test_logout(self):
        response = self.client.get('/logout/')
        self.assertEqual(response.status_code, 302)



class FolderTest(APITestCase):
    """Test /api/v1/folders/ endpoint"""

    def setUp(self):
        """Set up base user and details for test running."""
        login(self.client)

    def test_folder_create(self):
        response = create_folder(self.client, 'test')
        self.assertEqual(response.status_code, 201)

    def test_folder_update(self):
        response = create_folder(self.client, 'test')
        result = decode_json(response)
        folder_id = result.get('id', 0)
        response = self.client.put('/api/v1/folders/' + str(folder_id) + '/', {'name':"test edit"})
        result = decode_json(response)
        self.assertEqual(result.get('name'), 'test edit')

    def test_folder_delete(self):
        response = create_folder(self.client, 'test')
        result = decode_json(response)
        folder_id = result.get('id', 0)
        response = self.client.delete('/api/v1/folders/' + str(folder_id) + '/')
        self.assertEqual(response.status_code, 204)

    def test_folder_list(self):
        create_folder(self.client, 'test')
        create_folder(self.client, 'test 2')
        response = self.client.get('/api/v1/folders/')
        result = decode_json(response)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(result.get('count'), 2)



class PhotoTest(APITestCase):
    """Test /api/v1/photos/ endpoint"""

    def setUp(self):
        """Set up base user and details for test running."""
        login(self.client)


    def photo_effect(self, effects):
        response = create_photo(self.client)
        result = decode_json(response)
        photo_id = result.get('id', 0)
        data = {
            'photo_id':photo_id,
            'effects':effects
        }
        response = self.client.post('/api/v1/photos/' + str(photo_id) + '/preview/', data)
        return decode_json(response)

    def test_photo_create_without_folder(self):
        response = create_photo(self.client)
        self.assertEqual(response.status_code, 201)

    def test_photo_create_with_folder(self):
        response = create_folder(self.client, 'test')
        result = decode_json(response)
        folder_id = result.get('id', 0)
        response = create_photo(self.client, folder_id)
        result = decode_json(response)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(result.get('folder_name'), 'test')

    def test_photo_update(self):
        response = create_photo(self.client)
        result = decode_json(response)
        photo_id = result.get('id', 0)
        response = self.client.put('/api/v1/photos/' + str(photo_id) + '/', {'title':'test image'})
        result = decode_json(response)
        self.assertEqual(result.get('id'), photo_id)
        self.assertEqual(result.get('title'), 'test image')

    def test_photo_download(self):
        response = create_photo(self.client)
        result = decode_json(response)
        photo_id = result.get('id', 0)
        response = self.client.get('/download?image=' + str(photo_id))
        self.assertEqual(response.status_code, 301)

    def test_photo_delete(self):
        response = create_photo(self.client)
        result = decode_json(response)
        photo_id = result.get('id', 0)
        response = self.client.delete('/api/v1/photos/' + str(photo_id) + '/')
        self.assertEqual(response.status_code, 204)

    def test_photo_list(self):
        create_photo(self.client)
        create_photo(self.client)
        response = self.client.get('/api/v1/photos/')
        result = decode_json(response)
        self.assertEqual(result.get('count'), 2)

    def test_folder_list_photos(self):
        response = create_folder(self.client, 'test')
        result = decode_json(response)
        folder_id = result.get('id', 0)
        create_photo(self.client, folder_id)
        create_photo(self.client, folder_id)
        response = self.client.get('/api/v1/folders/' + str(folder_id) + '/photos/')
        result = decode_json(response)
        self.assertEqual(result.get('count'), 2)

    def test_folder_list_untitled_photos(self):
        create_photo(self.client)
        create_photo(self.client)
        response = self.client.get('/api/v1/folders/0/photos/')
        result = decode_json(response)
        self.assertEqual(result.get('count'), 2)

    def test_photo_effect_update(self):
        response = create_photo(self.client)
        result = decode_json(response)
        photo_id = result.get('id', 0)
        data = {
            'title':'effect update',
            'effects':'{"enhance":{"Brightness":"65"},"filter":{"blur":"true"},"transform":{"mirror":"true"},"effect":{"quantize":"50","gaussian_blur":"50","auto_contrast":"50","posterize":"50","unsharp_mask":"50","solarize":"50","remove_border":"50","rotate":"50"}}'
        }
        response = self.client.put('/api/v1/photos/' + str(photo_id) + '/', data)
        result = decode_json(response)
        self.assertEqual(result.get('title'), 'effect update')

    def test_photo_effect_preview(self):
        response = create_photo(self.client)
        result = self.photo_effect('{"transform":{"vertical_flip":"true","invert":"true","grayscale":"true","black_and_white":"true","equalize":"true"}}')
        effect_applied = 'invert' in result.get('applied_effects', [])
        self.assertNotEqual(result.get('image'), None)
        self.assertTrue(effect_applied)

    def test_photo_effect_text_overlay(self):
        response = create_photo(self.client)
        result = self.photo_effect('{"text_overlay":{"textValue":"love is key","fontSize":"26","x":"22","y":"24","color":"#ff3400","font_name":"dahot2.Filxgirl.ttf"}}')
        effect_applied = 'text' in result.get('applied_effects', [])
        self.assertTrue(effect_applied)
        self.assertNotEqual(result.get('image'), '')
        self.assertNotEqual(result.get('image'), None)

    def test_photo_effect_colorize(self):
        response = create_photo(self.client)
        result = self.photo_effect('{"colorize":{"black":"#5f1212","white":"#8b572a"}}')
        effect_applied = 'colorize' in result.get('applied_effects', [])
        self.assertTrue(effect_applied)
        self.assertNotEqual(result.get('image'), '')
        self.assertNotEqual(result.get('image'), None)

    def test_photo_effect_border(self):
        response = create_photo(self.client)
        result = self.photo_effect('{"border":{"size":"26","border_color":"#ff3737"}}')
        effect_applied = 'border' in result.get('applied_effects', [])
        self.assertTrue(effect_applied)
        self.assertNotEqual(result.get('image'), '')
        self.assertNotEqual(result.get('image'), None)

    def test_photo_share(self):
        response = create_photo(self.client)
        result = decode_json(response)
        share_id = result.get('share_code', '')
        response = self.client.get('/api/v1/photos/share/?share_id=' + share_id)
        result = decode_json(response)
        self.assertEqual(result.get('share_code'), share_id)

