pipeline { 
   environment { 

        registryCredential = 'dockerHub' 

        dockerImage = ''

    }
     agent any
  
   stages{
        stage('Checkout') { 
            steps { 
               git branch: 'main', credentialsId: '97e2b522-9f76-48b1-b4b6-f6b52e77d568', url: 'https://github.com/amani-bh/SKA.git'
                
            }
         }
		 
		stage('Clean') { 
            steps { 
				dir('auth-django') {
					sh 'python manage.py clean'
				}
				dir('forum-service') {
					sh 'python manage.py clean'
				}
				dir('chat-service') {
					sh 'python manage.py clean'
				}
				dir('task-service') {
					sh 'python manage.py clean'
				}
				dir('api-gateway') {
					sh 'python manage.py clean'
				}
				dir('Eureka-Server') {
					sh 'mvn clean install'
				}
                
            }
        }
		
		stage('Install Dependencies') {
            steps {
				dir('auth-django') {
					sh 'pip install -r requirements.txt'
				}
				dir('forum-service') {
					sh 'pip install -r requirements.txt'
				}
				dir('chat-service') {
					sh 'pip install -r requirements.txt'
				}
				dir('task-service') {
					sh 'pip install -r requirements.txt'
				}
				dir('api-gateway') {
					sh 'pip install -r requirements.txt'
				}
				dir('Eureka-Server') {
					sh 'mvn compile'
				}
            }
        }
		

        stage('Unit Tests') {
            steps {
				dir('auth-django') {
					sh 'python manage.py test'
				}
				dir('forum-service') {
					sh 'python manage.py test'
				}
				dir('chat-service') {
					sh 'python manage.py test'
				}
				dir('task-service') {
					sh 'python manage.py test'
				}
				dir('api-gateway') {
					sh 'python manage.py test'
				}
				dir('Eureka-Server') {
					sh 'mvn test'
				}
            }
        }
		
		//stage('Email notification') {
            //steps {
                mail bcc: '', body: 'Image is pushed to Dockerhub', cc: '', from: '', replyTo: '', subject: 'Jenkins-Dockerhub Alert', to: 'amani.benhassine@esprit.tn'
            //}
        //}
        
          
   }
}
