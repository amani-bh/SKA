import jwt
from django.http import HttpResponseForbidden
from django.conf import settings


def authentication_middleware(get_response):
    def middleware(request):
        # Get the token from the request headers
        token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[-1]
        print(token)

        # Validate the token
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return HttpResponseForbidden('Token has expired')
        except jwt.InvalidTokenError:
            return HttpResponseForbidden('Invalid token')

        # Pass the decoded token or its contents to the view or further middleware
        request.token = decoded_token

        # Process the request or apply additional filtering logic
        response = get_response(request)

        return response

    return middleware
