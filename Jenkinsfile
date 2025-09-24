pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wasimakram7/thought_app"   // your DockerHub repo
        DOCKER_CREDENTIALS = credentials('dockerhub') // Jenkins credentials ID for DockerHub
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Wasimakram7/thought_app.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {       // <-- must match the Name in Jenkins config
                    withSonarQubeScannerInstallation('SonarScanner') {  // <-- must match tool name in Global Tool Configuration
                        sh """
                        sonar-scanner \
                          -Dsonar.projectKey=thought_app \
                          -Dsonar.sources=. \
                          -Dsonar.host.url=http://13.53.64.103:9000
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    sh "echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push $DOCKER_IMAGE:$BUILD_NUMBER'
                    sh 'docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest'
                    sh 'docker push $DOCKER_IMAGE:latest'
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker logout || true'
            }
        }
    }
}
