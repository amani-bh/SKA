pipeline {
    environment {
        registryCredential = 'dockerHub'
        dockerImage = ''
    }
    agent any

    stages {
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

        // stage('Unit Tests') {
        //     steps {
        //         dir('auth-django') {
        //             sh 'python3.8 manage.py test'
        //         }
        //         dir('forum-service') {
        //             sh 'python3.8 manage.py test'
        //         }
        //         dir('task-service') {
        //             sh 'python3.8 manage.py test'
        //         }
        //         dir('api-gateway') {
        //             sh 'python3.8 manage.py test'
        //         }
        //     }
        // }

        // stage('SonarQube') {
        //     steps {
        //         dir('auth-django') {
        //             sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.login=admin -Dsonar.password=sonar -Dsonar.projectKey=auth-django'
        //         }
        //         dir('forum-service') {
        //             sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.login=admin -Dsonar.password=sonar -Dsonar.projectKey=forum-service'
        //         }
        //         dir('task-service') {
        //             sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.login=admin -Dsonar.password=sonar -Dsonar.projectKey=task-service'
        //         }
        //         dir('api-gateway') {
        //             sh '/opt/sonar-scanner/bin/sonar-scanner -Dsonar.login=admin -Dsonar.password=sonar -Dsonar.projectKey=api-gateway'
        //         }
        //     }
        // }

        stage('Publish to Nexus') {
            steps {
                script {
                    def nexusUsername = 'admin'
                    def nexusPassword = 'admin'
                    def nexusUrl = "http://172.10.0.140:8081/repository/"
                    
                    withEnv(["PATH+VENVPATH=venv/bin"]) {
                        sh "python3.8 -m venv venv"
                        sh """
                            source venv/bin/activate
                            pip install --upgrade pip
                            pip install cryptography twine
                        """
                        
                        dir('api-gateway') {
                            sh "python3.8 -m pip install setuptools"
                            sh "python3.8 setup.py sdist"
                            
                            // Vérification de l'existence du fichier tar.gz
                            script {
                                def tarFile = sh(returnStdout: true, script: "find dist -name 'api-gateway-1.0.tar.gz'").trim()
                                if (tarFile) {
                                    // Le fichier tar.gz existe
                                    sh "echo 'Uploading api-gateway-1.0.tar.gz to Nexus repository...'"
                                    sh """
                                        source venv/bin/activate
                                        twine upload --repository-url ${nexusUrl}api-gateway/ --username admin --password admin dist/api-gateway-1.0.tar.gz
                                    """
                                } else {
                                    // Le fichier tar.gz n'existe pas
                                    sh "echo 'Le fichier api-gateway-1.0.tar.gz est introuvable.'"
                                }
                            }
                        }
                    }
                }
            }
        }











  


    }
}
