pipeline { 
   environment { 

        registryCredential = 'dockerHub' 

        dockerImage = ''

    }
     agent any
  
   stages{
        stage('GIT') { 
            steps { 
               git branch: 'main', credentialsId: '97e2b522-9f76-48b1-b4b6-f6b52e77d568', url: 'https://github.com/amani-bh/SKA.git'
                
            }
         }
		stage('Email notification') {
            steps {
                mail bcc: '', body: 'Image is pushed to Dockerhub', cc: '', from: '', replyTo: '', subject: 'Jenkins-Dockerhub Alert', to: 'amani.benhassine@esprit.tn'
            }
        }
        
          
   }
}
