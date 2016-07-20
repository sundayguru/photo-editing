from django.test import Client, TestCase
from django.contrib.auth.models import User


class ViewTest(TestCase):

    """Test cases for views"""

    def setUp(self):
        """Set up base user and details for test running."""
        self.client = Client()
        user = User.objects.create(
            username='sundayguru',
            email='sundayguru@example.com',
            password='tester',
        )
        user.set_password('tester')
        user.save()

    def test_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        self.client.login(username='sundayguru', password='tester')
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)