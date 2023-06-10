import requests
from rest_framework import status
from rest_framework.authentication import get_authorization_header
from rest_framework.response import Response
from rest_framework.views import APIView
import jwt


class Gateway(APIView):
    def forward_request(self, request, microservice_url, headers):
        try:
            if request.method == 'GET':
                # Apply filtering based on query parameters
                filtered_params = request.query_params.dict()
                response = requests.get(microservice_url, headers=headers, params=filtered_params)
            elif request.method == 'POST':
                response = requests.post(microservice_url, headers=headers, data=request.data)
            elif request.method == 'PUT':
                response = requests.put(microservice_url, headers=headers, data=request.data)
            elif request.method == 'PATCH':
                response = requests.patch(microservice_url, headers=headers, data=request.data)
            elif request.method == 'DELETE':
                response = requests.delete(microservice_url, headers=headers)
            else:
                return Response('Invalid method', status=status.HTTP_405_METHOD_NOT_ALLOWED)

            return Response(response.json(), status=response.status_code)

        except requests.exceptions.RequestException as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def operation(self, request):
        path = request.path_info.split('/')
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')

            try:
                decoded_token = jwt.decode(token, 'access_secret', algorithms='HS256')
            except jwt.ExpiredSignatureError:
                return Response('Token has expired', status=status.HTTP_401_UNAUTHORIZED)
            except jwt.InvalidTokenError:
                return Response('Invalid token', status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if decoded_token:
            if path[2] == "api":
                microservice_url = f'http://localhost:8002/api/{path[3]}'
            elif path[2] == "forum-api":
                microservice_url = f'http://localhost:8001/forum-api/{path[3]}'
            elif path[2] == "task-api":
                microservice_url = f'http://localhost:8004/task-api/{path[3]}'
            elif path[2] == "chat-api":
                microservice_url = f'http://localhost:8000/api/{path[3]}'
            else:
                return Response('Invalid microservice', status=status.HTTP_404_NOT_FOUND)

            headers = {'Authorization': f'Bearer {token}'}
            return self.forward_request(request, microservice_url, headers)

        return Response('Error', status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return self.operation(request)

    def post(self, request):
        return self.operation(request)

    def put(self, request):
        return self.operation(request)

    def patch(self, request):
        return self.operation(request)

    def delete(self, request):
        return self.operation(request)
