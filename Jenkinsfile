pipeline { 
   environment { 

        registryCredential = 'dockerHub' 

        dockerImage = ''

    }
     agent any
  
   stages{
        stage('GIT') { 
            steps { 
               git branch: 'amani', credentialsId: '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', url: 'https://github.com/amani-bh/SKA'
                
            }
         }
		stage('Email notification') {
            steps {
                mail bcc: '', body: 'Image is pushed to Dockerhub', cc: '', from: '', replyTo: '', subject: 'Jenkins-Dockerhub Alert', to: 'amani.benhassine@esprit.tn'
            }
        }
        
          
   }
}
