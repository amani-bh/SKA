pipeline { 
   environment { 

        registryCredential = 'dockerHub' 

        dockerImage = ''

    }
     agent any
  
   stages{
        stage('GIT') { 
            steps { 
               git branch: 'main', credentialsId: '3d6128a5-9878-4701-998a-994c82e266a1', url: 'https://github.com/amani-bh/SKA.git'
                
            }
         }
		stage('Email notification') {
            steps {
                mail bcc: '', body: 'Image is pushed to Dockerhub', cc: '', from: '', replyTo: '', subject: 'Jenkins-Dockerhub Alert', to: 'amani.benhassine@esprit.tn'
            }
        }
        
          
   }
}
