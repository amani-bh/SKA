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
                    sh "python3.8 -m pip install --user --upgrade pip"
                    sh "python3.8 -m pip install cryptography"
                    sh "python3.8 -m pip install twine"

                    
                    dir('api-gateway') {
                        sh "python3.8 -m pip install setuptools"
                        sh "python3.8 setup.py sdist"
                        script {
                            def tarFile = sh(returnStdout: true, script: "find dist -name 'api-gateway-1.0.tar.gz'").trim()
                            if (tarFile) {
                                sh "echo 'Uploading api-gateway-1.0.tar.gz to Nexus repository...'"
                                sh "python3.8 -m twine upload --repository-url ${nexusUrl}api-gateway/ --username admin --password admin dist/api-gateway-1.0.tar.gz"
                            } else {
                                sh "echo 'The api-gateway-1.0.tar.gz file is not found.'"
                            }
                        }
                    }
                    dir('auth-django') {
                        sh "python3.8 -m pip install setuptools"
                        sh "python3.8 setup.py sdist"
                        script {
                            def tarFile = sh(returnStdout: true, script: "find dist -name 'auth-service-1.0.tar.gz'").trim()
                            if (tarFile) {
                                sh "echo 'Uploading auth-service-1.0.tar.gz to Nexus repository...'"
                                sh "python3.8 -m twine upload --repository-url ${nexusUrl}auth-service/ --username admin --password admin dist/auth-service-1.0.tar.gz"
                            } else {
                                sh "echo 'The auth-service-1.0.tar.gz file is not found.'"
                            }
                        }
                    }
                    dir('task-service') {
                        sh "python3.8 -m pip install setuptools"
                        sh "python3.8 setup.py sdist"
                        script {
                            def tarFile = sh(returnStdout: true, script: "find dist -name 'task-service-1.0.tar.gz'").trim()
                            if (tarFile) {
                                sh "echo 'Uploading task-service-1.0.tar.gz to Nexus repository...'"
                                sh "python3.8 -m twine upload --repository-url ${nexusUrl}task-service/ --username admin --password admin dist/task-service-1.0.tar.gz"
                            } else {
                                sh "echo 'The task-service-1.0.tar.gz file is not found.'"
                            }
                        }
                    }

                    dir('forum-service') {
                        sh "python3.8 -m pip install setuptools"
                        sh "python3.8 setup.py sdist"
                        script {
                            def tarFile = sh(returnStdout: true, script: "find dist -name 'forum-service-1.0.tar.gz'").trim()
                            if (tarFile) {
                                sh "echo 'Uploading forum-service-1.0.tar.gz to Nexus repository...'"
                                sh "python3.8 -m twine upload --repository-url ${nexusUrl}forum-service/ --username admin --password admin dist/forum-service-1.0.tar.gz"
                            } else {
                                sh "echo 'The forum-service-1.0.tar.gz file is not found.'"
                            }
                        }
                    }
                }
            }
        }



















  


    }
}
