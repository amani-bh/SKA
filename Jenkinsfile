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
                    def nexusApiUrl = "http://172.10.0.140:8081/repository/"

                    def uploadToNexus = { directory ->
                        sh "python3.8 -m pip install setuptools"
                        sh "python3.8 setup.py sdist"
                        sh "mkdir -p ${directory}/dist"
                        sh "cd ${directory} && tar -zcvf dist.tar.gz -C dist ."
                        sh "find ${directory}/dist -name '*.tar.gz' -exec curl -v -u ${nexusUsername}:${nexusPassword} --upload-file {} ${nexusApiUrl}${directory}/ \\;"
                    }

                    dir('auth-service') {
                        uploadToNexus('auth-service')
                    }

                    dir('forum-service') {
                        uploadToNexus('forum-service')
                    }

                    dir('task-service') {
                        uploadToNexus('task-service')
                    }

                    dir('api-gateway') {
                        uploadToNexus('api-gateway')
                    }
                }
            }
        }




  


    }
}
