pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "wasimakram7/thought_app"
        DOCKER_CREDENTIALS = credentials('dockerhub')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Push Docker Image') {
            agent { label 'master' }   // ensure node context
            steps {
                script {
                    sh "docker build -t $DOCKER_IMAGE:$BUILD_NUMBER ."
                    sh "echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin"
                    sh "docker push $DOCKER_IMAGE:$BUILD_NUMBER"
                    sh "docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest"
                    sh "docker push $DOCKER_IMAGE:latest"
                }
            }
        }
    }

    post {
        always {
            script {
                sh "docker logout || true"
            }
        }
    }
}

