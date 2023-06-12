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
		
		stage('Install Dependencies') {
			steps {
				dir('auth-django') {
					sh 'python3.8 -m pip install --user -r requirements.txt' 
				}
				dir('forum-service') {
					sh 'python3.8 -m pip install --user -r requirements.txt' 
				}
				dir('task-service') {
					sh 'python3.8 -m pip install --user -r requirements.txt' 
				}
				dir('api-gateway') {
					sh 'python3.8 -m pip install --user -r requirements.txt' 
				}
			}
		}

        stage('Migrations') {
            steps {
                dir('auth-django') {
                    sh 'python3.8 manage.py migrate' 
                }

                dir('forum-service') {
                    sh 'python3.8 manage.py migrate' 
                }
				dir('task-service') {
                    sh 'python3.8 manage.py migrate' 
                }
				
                
            }
        }

		 
		
		

        stage('Unit Tests') {
            steps {
				dir('auth-django') {
					sh 'python3.8 manage.py test'
				}
				dir('forum-service') {
					sh 'python3.8 manage.py test'
				}
				dir('task-service') {
					sh 'python3.8 manage.py test'
				}
				dir('api-gateway') {
					sh 'python3.8 manage.py test'
				}
            }
        }

        stage('SonarQube') {
            steps {
                sh 'sonar-scanner -Dsonar.login=admin -Dsonar.password=sonar'
            }
        }
		
		//stage('Email notification') {
            //steps {
                //mail bcc: '', body: 'Image is pushed to Dockerhub', cc: '', from: '', replyTo: '', subject: 'Jenkins-Dockerhub Alert', to: 'amani.benhassine@esprit.tn'
            //}
        //}
        
          
   }
}
